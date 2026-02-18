// Hybrid Notion-Supabase Database Client
import { Client } from '@notionhq/client'
import { createClient } from '@/lib/supabase/server'

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Check if we should use Notion for content
const useNotionForContent = process.env.NEXT_PUBLIC_USE_NOTION_FOR_CONTENT === 'true'
const cmsMode = process.env.NEXT_PUBLIC_CMS_MODE || 'supabase'

// Database IDs (to be configured)
export const DATABASES = {
  NEWS: process.env.NOTION_NEWS_DB_ID || '',
  EVENTS: process.env.NOTION_EVENTS_DB_ID || '',
  BOARD_POSTS: process.env.NOTION_BOARD_DB_ID || '',
  ORGANIZATIONS: process.env.NOTION_ORGANIZATIONS_DB_ID || '',
  PARTNERS: process.env.NOTION_PARTNERS_DB_ID || '',
  MEMBERS: process.env.NOTION_MEMBERS_DB_ID || '',
  SUPPORTERS: process.env.NOTION_SUPPORTERS_DB_ID || '',
  USERS: process.env.NOTION_USERS_DB_ID || '',
}

// Helper functions to transform Notion data
export const notionToStandard = (page: any) => {
  const properties = page.properties
  const result: any = {
    id: page.id,
    created_at: page.created_time,
    updated_at: page.last_edited_time,
  }

  // Transform properties based on type
  Object.entries(properties).forEach(([key, value]: [string, any]) => {
    switch (value.type) {
      case 'title':
        result[key] = value.title?.[0]?.plain_text || ''
        break
      case 'rich_text':
        result[key] = value.rich_text?.[0]?.plain_text || ''
        break
      case 'select':
        result[key] = value.select?.name || null
        break
      case 'multi_select':
        result[key] = value.multi_select?.map((s: any) => s.name) || []
        break
      case 'number':
        result[key] = value.number || 0
        break
      case 'checkbox':
        result[key] = value.checkbox || false
        break
      case 'date':
        result[key] = value.date?.start || null
        break
      case 'email':
        result[key] = value.email || null
        break
      case 'url':
        result[key] = value.url || null
        break
      case 'files':
        result[key] = value.files?.[0]?.file?.url || value.files?.[0]?.external?.url || null
        break
    }
  })

  return result
}

export const standardToNotion = (data: any) => {
  // Transform standard data format to Notion properties
  const properties: any = {}

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'id' || key === 'created_at' || key === 'updated_at') return

    if (typeof value === 'string') {
      if (key === 'title' || key === 'name') {
        properties[key] = { title: [{ text: { content: value } }] }
      } else {
        properties[key] = { rich_text: [{ text: { content: value } }] }
      }
    } else if (typeof value === 'number') {
      properties[key] = { number: value }
    } else if (typeof value === 'boolean') {
      properties[key] = { checkbox: value }
    } else if (Array.isArray(value)) {
      properties[key] = { multi_select: value.map(v => ({ name: v })) }
    }
  })

  return properties
}

// CRUD operations
export class NotionDatabase {
  constructor(private databaseId: string) {}

  async query(filter?: any, sort?: any, limit?: number) {
    const response = await notion.databases.query({
      database_id: this.databaseId,
      filter,
      sorts: sort,
      page_size: limit || 100,
    })

    return {
      data: response.results.map(notionToStandard),
      count: response.results.length,
      has_more: response.has_more,
      next_cursor: response.next_cursor,
    }
  }

  async create(data: any) {
    const response = await notion.pages.create({
      parent: { database_id: this.databaseId },
      properties: standardToNotion(data),
    })

    return notionToStandard(response)
  }

  async update(pageId: string, data: any) {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: standardToNotion(data),
    })

    return notionToStandard(response)
  }

  async delete(pageId: string) {
    await notion.pages.update({
      page_id: pageId,
      archived: true,
    })

    return { success: true }
  }

  async get(pageId: string) {
    const response = await notion.pages.retrieve({ page_id: pageId })
    return notionToStandard(response)
  }
}

// Hybrid Database Manager
export class HybridDatabase {
  private notionDb: NotionDatabase
  private useNotion: boolean

  constructor(notionDatabaseId: string, private tableName: string) {
    this.notionDb = new NotionDatabase(notionDatabaseId)
    this.useNotion = useNotionForContent && !!notionDatabaseId
  }

  async query(filter?: any, sort?: any, limit?: number) {
    if (this.useNotion) {
      return await this.notionDb.query(filter, sort, limit)
    } else {
      // Fallback to Supabase
      const supabase = createClient()
      const { data, error, count } = await supabase
        .from(this.tableName)
        .select('*', { count: 'exact' })
        .limit(limit || 100)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      return {
        data: data || [],
        count: count || 0,
        has_more: false,
        next_cursor: null
      }
    }
  }

  async create(data: any) {
    if (this.useNotion) {
      return await this.notionDb.create(data)
    } else {
      const supabase = createClient()
      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert([data])
        .select()
        .single()
      
      if (error) throw error
      return result
    }
  }

  async update(id: string, data: any) {
    if (this.useNotion) {
      return await this.notionDb.update(id, data)
    } else {
      const supabase = createClient()
      const { data: result, error } = await supabase
        .from(this.tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return result
    }
  }

  async delete(id: string) {
    if (this.useNotion) {
      return await this.notionDb.delete(id)
    } else {
      const supabase = createClient()
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true }
    }
  }

  async get(id: string) {
    if (this.useNotion) {
      return await this.notionDb.get(id)
    } else {
      const supabase = createClient()
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    }
  }
}

// Hybrid database instances
export const hybridDatabases = {
  news: new HybridDatabase(DATABASES.NEWS, 'news'),
  events: new HybridDatabase(DATABASES.EVENTS, 'events'),
  board_posts: new HybridDatabase(DATABASES.BOARD_POSTS, 'board_posts'),
  organizations: new HybridDatabase(DATABASES.ORGANIZATIONS, 'organizations'),
  partners: new HybridDatabase(DATABASES.PARTNERS, 'partners'),
  members: new HybridDatabase(DATABASES.MEMBERS, 'members'),
  supporters: new HybridDatabase(DATABASES.SUPPORTERS, 'supporters'),
}

const NotionDbKeyMap = {
  news: 'NEWS',
  events: 'EVENTS',
  board_posts: 'BOARD_POSTS',
  organizations: 'ORGANIZATIONS',
  partners: 'PARTNERS',
  members: 'MEMBERS',
  supporters: 'SUPPORTERS',
} as const

type HybridDbKey = keyof typeof hybridDatabases

export function shouldUseNotionContent(key: HybridDbKey): boolean {
  const mode = process.env.NEXT_PUBLIC_CMS_MODE || 'supabase'
  const useNotion = process.env.NEXT_PUBLIC_USE_NOTION_FOR_CONTENT === 'true'
  const token = process.env.NOTION_TOKEN
  const dbKey = NotionDbKeyMap[key]
  const dbId = DATABASES[dbKey]

  return Boolean(token && dbId && useNotion && (mode === 'notion' || mode === 'hybrid'))
}

export { notion }
