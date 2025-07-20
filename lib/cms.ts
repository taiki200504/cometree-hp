import { createServerSupabaseClient, createAdminSupabaseClient } from './supabase'
import { sendNewsUpdateEmail, sendEventUpdateEmail, sendBoardUpdateEmail } from './email'

export type ContentStatus = 'draft' | 'published' | 'archived' | 'cancelled' | 'completed'

// ニュース記事管理
export class NewsCMS {
  // 記事一覧取得
  static async getArticles(options: {
    status?: ContentStatus
    category?: string
    limit?: number
    offset?: number
    search?: string
  } = {}) {
    const supabase = createServerSupabaseClient()
    let query = supabase.from('news_articles').select('*')
    
    if (options.status) {
      query = query.eq('status', options.status)
    }
    
    if (options.category) {
      query = query.eq('category', options.category)
    }
    
    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,content.ilike.%${options.search}%`)
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }
    
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) {
      throw new Error(`Failed to fetch articles: ${error.message}`)
    }
    
    return data
  }
  
  // 記事作成
  static async createArticle(data: {
    title: string
    slug: string
    content: string
    excerpt?: string
    featured_image_url?: string
    category?: string
    tags?: string[]
    author_id: string
    organization_id?: string
  }) {
    const supabase = createServerSupabaseClient()
    
    const { data: article, error } = await supabase
      .from('news_articles')
      .insert({
        ...data,
        status: 'draft',
        view_count: 0,
        like_count: 0
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create article: ${error.message}`)
    }
    
    return article
  }
  
  // 記事更新
  static async updateArticle(id: string, updates: Partial<{
    title: string
    slug: string
    content: string
    excerpt: string
    featured_image_url: string
    category: string
    tags: string[]
    status: ContentStatus
  }>) {
    const supabase = createServerSupabaseClient()
    
    const { data: article, error } = await supabase
      .from('news_articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update article: ${error.message}`)
    }
    
    // 公開時にメール配信
    if (updates.status === 'published' && article) {
      await sendNewsUpdateEmail({
        title: article.title,
        excerpt: article.excerpt || article.content.substring(0, 200),
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${article.slug}`
      })
    }
    
    return article
  }
  
  // 記事削除
  static async deleteArticle(id: string) {
    const supabase = createServerSupabaseClient()
    
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw new Error(`Failed to delete article: ${error.message}`)
    }
  }
}

// イベント管理
export class EventCMS {
  // イベント一覧取得
  static async getEvents(options: {
    status?: ContentStatus
    category?: string
    limit?: number
    offset?: number
    search?: string
    upcoming?: boolean
  } = {}) {
    const supabase = createServerSupabaseClient()
    let query = supabase.from('events').select('*')
    
    if (options.status) {
      query = query.eq('status', options.status)
    }
    
    if (options.category) {
      query = query.eq('category', options.category)
    }
    
    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }
    
    if (options.upcoming) {
      const now = new Date().toISOString()
      query = query.gte('start_date', now)
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }
    
    query = query.order('start_date', { ascending: true })
    
    const { data, error } = await query
    
    if (error) {
      throw new Error(`Failed to fetch events: ${error.message}`)
    }
    
    return data
  }
  
  // イベント作成
  static async createEvent(data: {
    title: string
    slug: string
    description?: string
    content?: string
    featured_image_url?: string
    start_date: string
    end_date?: string
    location?: string
    location_url?: string
    category?: string
    tags?: string[]
    registration_required: boolean
    registration_url?: string
    max_participants?: number
    organizer_id: string
  }) {
    const supabase = createServerSupabaseClient()
    
    const { data: event, error } = await supabase
      .from('events')
      .insert({
        ...data,
        status: 'draft',
        current_participants: 0
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create event: ${error.message}`)
    }
    
    return event
  }
  
  // イベント更新
  static async updateEvent(id: string, updates: Partial<{
    title: string
    slug: string
    description: string
    content: string
    featured_image_url: string
    start_date: string
    end_date: string
    location: string
    location_url: string
    category: string
    tags: string[]
    status: ContentStatus
    registration_required: boolean
    registration_url: string
    max_participants: number
  }>) {
    const supabase = createServerSupabaseClient()
    
    const { data: event, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update event: ${error.message}`)
    }
    
    // 公開時にメール配信
    if (updates.status === 'published' && event) {
      await sendEventUpdateEmail({
        title: event.title,
        description: event.description || '',
        startDate: event.start_date,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.slug}`
      })
    }
    
    return event
  }
  
  // イベント削除
  static async deleteEvent(id: string) {
    const supabase = createServerSupabaseClient()
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw new Error(`Failed to delete event: ${error.message}`)
    }
  }
}

// 掲示板管理
export class BoardCMS {
  // 投稿一覧取得
  static async getPosts(options: {
    status?: 'published' | 'hidden' | 'deleted'
    category?: string
    limit?: number
    offset?: number
    search?: string
  } = {}) {
    const supabase = createServerSupabaseClient()
    let query = supabase.from('board_posts').select('*')
    
    if (options.status) {
      query = query.eq('status', options.status)
    }
    
    if (options.category) {
      query = query.eq('category', options.category)
    }
    
    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,content.ilike.%${options.search}%`)
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }
    
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`)
    }
    
    return data
  }
  
  // 投稿作成
  static async createPost(data: {
    title: string
    content: string
    category?: string
    tags?: string[]
    is_anonymous: boolean
    author_id: string
  }) {
    const supabase = createServerSupabaseClient()
    
    const { data: post, error } = await supabase
      .from('board_posts')
      .insert({
        ...data,
        status: 'published',
        view_count: 0,
        like_count: 0,
        comment_count: 0
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create post: ${error.message}`)
    }
    
    // 投稿時にメール配信
    await sendBoardUpdateEmail({
      title: post.title,
      content: post.content,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/board/${post.id}`
    })
    
    return post
  }
  
  // 投稿更新
  static async updatePost(id: string, updates: Partial<{
    title: string
    content: string
    category: string
    tags: string[]
    status: 'published' | 'hidden' | 'deleted'
  }>) {
    const supabase = createServerSupabaseClient()
    
    const { data: post, error } = await supabase
      .from('board_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update post: ${error.message}`)
    }
    
    return post
  }
  
  // 投稿削除
  static async deletePost(id: string) {
    const supabase = createServerSupabaseClient()
    
    const { error } = await supabase
      .from('board_posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`)
    }
  }
}

// 組織管理
export class OrganizationCMS {
  // 組織一覧取得
  static async getOrganizations(options: {
    status?: 'active' | 'inactive' | 'pending'
    category?: string
    limit?: number
    offset?: number
    search?: string
  } = {}) {
    const supabase = createServerSupabaseClient()
    let query = supabase.from('organizations').select('*')
    
    if (options.status) {
      query = query.eq('status', options.status)
    }
    
    if (options.category) {
      query = query.eq('category', options.category)
    }
    
    if (options.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }
    
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) {
      throw new Error(`Failed to fetch organizations: ${error.message}`)
    }
    
    return data
  }
  
  // 組織作成
  static async createOrganization(data: {
    name: string
    slug: string
    description?: string
    logo_url?: string
    website_url?: string
    contact_email?: string
    contact_phone?: string
    address?: string
    member_count?: number
    category?: string
  }) {
    const supabase = createServerSupabaseClient()
    
    const { data: organization, error } = await supabase
      .from('organizations')
      .insert({
        ...data,
        status: 'pending'
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create organization: ${error.message}`)
    }
    
    return organization
  }
  
  // 組織更新
  static async updateOrganization(id: string, updates: Partial<{
    name: string
    slug: string
    description: string
    logo_url: string
    website_url: string
    contact_email: string
    contact_phone: string
    address: string
    member_count: number
    category: string
    status: 'active' | 'inactive' | 'pending'
  }>) {
    const supabase = createServerSupabaseClient()
    
    const { data: organization, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update organization: ${error.message}`)
    }
    
    return organization
  }
  
  // 組織削除
  static async deleteOrganization(id: string) {
    const supabase = createServerSupabaseClient()
    
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw new Error(`Failed to delete organization: ${error.message}`)
    }
  }
} 