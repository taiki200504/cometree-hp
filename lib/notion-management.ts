/**
 * Advanced Notion Database Management Utilities
 * サイトデータベースをNotion APIで高度に管理するためのユーティリティ
 */

import { Client } from '@notionhq/client'
import { hybridDatabases, DATABASES } from './notion-client'

export interface NotionManagementConfig {
  autoSync: boolean
  syncInterval: number // minutes
  backupEnabled: boolean
  contentValidation: boolean
}

export class NotionSiteManager {
  private notion: Client
  private config: NotionManagementConfig

  constructor(config: NotionManagementConfig = {
    autoSync: true,
    syncInterval: 15,
    backupEnabled: true,
    contentValidation: true
  }) {
    this.notion = new Client({ auth: process.env.NOTION_TOKEN })
    this.config = config
  }

  /**
   * 1. コンテンツ一括同期機能
   * Notion → サイトの一括データ同期
   */
  async syncAllContent() {
    const results = {
      news: await this.syncContentType('news'),
      events: await this.syncContentType('events'),
      board: await this.syncContentType('board_posts'),
      organizations: await this.syncContentType('organizations'),
      partners: await this.syncContentType('partners'),
      members: await this.syncContentType('members'),
      supporters: await this.syncContentType('supporters')
    }

    return {
      success: true,
      syncedAt: new Date().toISOString(),
      results
    }
  }

  /**
   * 2. 特定コンテンツタイプの同期
   */
  private async syncContentType(type: keyof typeof hybridDatabases) {
    try {
      const { data } = await hybridDatabases[type].query()
      
      // コンテンツ検証
      if (this.config.contentValidation) {
        await this.validateContent(data, type)
      }

      return {
        type,
        count: data.length,
        status: 'success',
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      return {
        type,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 3. コンテンツ検証機能
   */
  private async validateContent(data: any[], type: string) {
    const validationRules = {
      news: (item: any) => item.title && item.content,
      events: (item: any) => item.title && item.event_date,
      board_posts: (item: any) => item.title && item.content,
      organizations: (item: any) => item.name && item.status,
      partners: (item: any) => item.name && item.partnership_level,
      members: (item: any) => item.name && item.role,
      supporters: (item: any) => item.name && item.support_type
    }

    const rule = validationRules[type as keyof typeof validationRules]
    if (!rule) return

    const invalidItems = data.filter(item => !rule(item))
    if (invalidItems.length > 0) {
      throw new Error(`${invalidItems.length} invalid items found in ${type}`)
    }
  }

  /**
   * 4. 高度検索・フィルタリング機能
   */
  async searchContent(query: string, contentTypes?: string[]) {
    const searchPromises = Object.entries(hybridDatabases)
      .filter(([type]) => !contentTypes || contentTypes.includes(type))
      .map(async ([type, db]) => {
        try {
          const { data } = await db.query()
          const filtered = data.filter((item: any) => 
            JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
          )
          return { type, results: filtered, count: filtered.length }
        } catch {
          return { type, results: [], count: 0 }
        }
      })

    return await Promise.all(searchPromises)
  }

  /**
   * 5. コンテンツ統計・分析機能
   */
  async getContentAnalytics() {
    const analytics = await Promise.all(
      Object.entries(hybridDatabases).map(async ([type, db]) => {
        try {
          const { data } = await db.query()
          
          // 基本統計
          const total = data.length
          const published = data.filter((item: any) => item.status === 'published').length
          const drafts = data.filter((item: any) => item.status === 'draft').length
          
          // 最新更新日
          const lastUpdated = data.reduce((latest: string, item: any) => {
            return item.updated_at > latest ? item.updated_at : latest
          }, '')

          return {
            type,
            total,
            published,
            drafts,
            lastUpdated,
            publishRate: total > 0 ? (published / total * 100).toFixed(1) : '0'
          }
        } catch {
          return { type, total: 0, published: 0, drafts: 0, lastUpdated: null, publishRate: '0' }
        }
      })
    )

    return {
      summary: {
        totalContent: analytics.reduce((sum, item) => sum + item.total, 0),
        totalPublished: analytics.reduce((sum, item) => sum + item.published, 0),
        totalDrafts: analytics.reduce((sum, item) => sum + item.drafts, 0)
      },
      byType: analytics,
      generatedAt: new Date().toISOString()
    }
  }

  /**
   * 6. 自動バックアップ機能
   */
  async createBackup() {
    if (!this.config.backupEnabled) return null

    const backup = {
      timestamp: new Date().toISOString(),
      data: {} as any
    }

    for (const [type, db] of Object.entries(hybridDatabases)) {
      try {
        const { data } = await db.query()
        backup.data[type] = data
      } catch (error) {
        backup.data[type] = { error: error instanceof Error ? error.message : 'Backup failed' }
      }
    }

    // バックアップデータをファイルまたはストレージに保存
    // (実装はストレージ戦略に依存)
    
    return backup
  }

  /**
   * 7. コンテンツ一括操作機能
   */
  async bulkUpdate(type: keyof typeof hybridDatabases, updates: any[]) {
    const results = []
    
    for (const update of updates) {
      try {
        const result = await hybridDatabases[type].update(update.id, update.data)
        results.push({ id: update.id, status: 'success', result })
      } catch (error) {
        results.push({ 
          id: update.id, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Update failed' 
        })
      }
    }

    return {
      total: updates.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      results
    }
  }

  /**
   * 8. リアルタイム同期状態監視
   */
  async getSyncStatus() {
    const status = await Promise.all(
      Object.keys(DATABASES).map(async (dbType) => {
        const dbId = DATABASES[dbType as keyof typeof DATABASES]
        if (!dbId) return { type: dbType, status: 'not_configured' }

        try {
          await this.notion.databases.retrieve({ database_id: dbId })
          return { type: dbType, status: 'connected', lastCheck: new Date().toISOString() }
        } catch {
          return { type: dbType, status: 'error', lastCheck: new Date().toISOString() }
        }
      })
    )

    return {
      overall: status.every(s => s.status === 'connected') ? 'healthy' : 'degraded',
      databases: status,
      checkedAt: new Date().toISOString()
    }
  }
}

/**
 * 9. コンテンツワークフロー管理
 */
export class ContentWorkflow {
  constructor(private manager: NotionSiteManager) {}

  /**
   * コンテンツ承認ワークフロー
   */
  async submitForReview(contentType: keyof typeof hybridDatabases, contentId: string) {
    return await hybridDatabases[contentType].update(contentId, {
      status: 'pending_review',
      submitted_at: new Date().toISOString()
    })
  }

  async approveContent(contentType: keyof typeof hybridDatabases, contentId: string) {
    return await hybridDatabases[contentType].update(contentId, {
      status: 'published',
      published_at: new Date().toISOString()
    })
  }

  async rejectContent(contentType: keyof typeof hybridDatabases, contentId: string, reason: string) {
    return await hybridDatabases[contentType].update(contentId, {
      status: 'rejected',
      rejection_reason: reason,
      rejected_at: new Date().toISOString()
    })
  }

  /**
   * 予約公開機能
   */
  async schedulePublication(contentType: keyof typeof hybridDatabases, contentId: string, publishAt: Date) {
    return await hybridDatabases[contentType].update(contentId, {
      status: 'scheduled',
      scheduled_publish_at: publishAt.toISOString()
    })
  }
}

// シングルトンインスタンス
export const notionSiteManager = new NotionSiteManager()
export const contentWorkflow = new ContentWorkflow(notionSiteManager)