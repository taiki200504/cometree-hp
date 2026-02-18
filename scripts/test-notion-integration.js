#!/usr/bin/env node

/**
 * Notion統合テストスクリプト
 * 使用方法: node scripts/test-notion-integration.js
 */

const { Client } = require('@notionhq/client')
require('dotenv').config({ path: '.env.local' })

async function testNotionIntegration() {
  console.log('🔧 Notion統合テストを開始...')

  // 環境変数の確認
  const notionToken = process.env.NOTION_TOKEN
  const newsDbId = process.env.NOTION_NEWS_DB_ID
  const eventsDbId = process.env.NOTION_EVENTS_DB_ID
  const boardDbId = process.env.NOTION_BOARD_DB_ID
  const organizationsDbId = process.env.NOTION_ORGANIZATIONS_DB_ID
  const partnersDbId = process.env.NOTION_PARTNERS_DB_ID
  const membersDbId = process.env.NOTION_MEMBERS_DB_ID
  const supportersDbId = process.env.NOTION_SUPPORTERS_DB_ID

  if (!notionToken) {
    console.error('❌ NOTION_TOKEN が設定されていません')
    process.exit(1)
  }

  const databases = [
    { name: 'ニュース', id: newsDbId },
    { name: 'イベント', id: eventsDbId },
    { name: '掲示板', id: boardDbId },
    { name: '加盟団体', id: organizationsDbId },
    { name: '提携団体', id: partnersDbId },
    { name: '運営メンバー', id: membersDbId },
    { name: 'サポーター', id: supportersDbId }
  ]

  const notion = new Client({ auth: notionToken })

  try {
    console.log('📊 データベース接続テスト...')

    for (const db of databases) {
      if (!db.id) {
        console.log(`⚠️  ${db.name}: データベースIDが設定されていません`)
        continue
      }

      try {
        // データベースの詳細を取得
        const database = await notion.databases.retrieve({
          database_id: db.id
        })

        console.log(`✅ ${db.name}: 接続成功 (${database.title[0]?.plain_text || 'タイトルなし'})`)

        // データベースのページ数を取得
        const response = await notion.databases.query({
          database_id: db.id,
          page_size: 1
        })

        console.log(`   📄 ページ数: ${response.results.length > 0 ? '1+' : '0'}`)

      } catch (error) {
        console.error(`❌ ${db.name}: 接続失敗 - ${error.message}`)
      }
    }

    console.log('\n🎉 Notion統合テスト完了！')
    console.log('\n📋 次のステップ:')
    console.log('1. 管理画面 (http://localhost:3001/admin) にアクセス')
    console.log('2. 設定ページでCMSモードを確認')
    console.log('3. 各管理機能でNotionデータを確認')

  } catch (error) {
    console.error('❌ 予期しないエラーが発生しました:', error.message)
    process.exit(1)
  }
}

// スクリプト実行
if (require.main === module) {
  testNotionIntegration()
}

module.exports = { testNotionIntegration }