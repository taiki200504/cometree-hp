import { createClient } from '@/lib/supabase/server'
import { hybridDatabases, shouldUseNotionContent } from '@/lib/notion-client'
import { getCmsConfig } from '@/lib/settings'
import { getWordPressClient, extractFeaturedImageUrl, type WpPostResponseItem } from '@/lib/wordpress'

export type NewsStatus = 'draft' | 'published' | 'archived'

export interface NewsRecord {
  id: string
  title: string
  content: string
  excerpt: string
  category: string | null
  status: NewsStatus
  tags: string[]
  featured_image: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  view_count: number
}

export interface ListNewsOptions {
  page?: number
  limit?: number
  status?: string
  category?: string
  search?: string
}

export interface ListNewsResult {
  items: NewsRecord[]
  total: number
  source: 'notion' | 'supabase' | 'wordpress'
}

const DEFAULT_LIMIT = 10

const STATUS_FALLBACK: NewsStatus = 'draft'

function normalizeStatus(value?: string | null): NewsStatus {
  if (!value) return STATUS_FALLBACK
  const lowered = value.toLowerCase()
  if (lowered === 'published' || lowered === 'draft' || lowered === 'archived') {
    return lowered
  }
  return STATUS_FALLBACK
}

function normalizeNotionNews(entry: Record<string, any>): NewsRecord {
  const title = entry.Title || entry.title || ''
  const content = entry.Content || entry.content || ''
  const excerpt = entry.Excerpt || entry.excerpt || ''
  const category = entry.Category || entry.category || null
  const status = normalizeStatus(entry.Status || entry.status)
  const tags = Array.isArray(entry.Tags)
    ? entry.Tags.filter((tag: unknown): tag is string => typeof tag === 'string')
    : Array.isArray(entry.tags)
      ? entry.tags.filter((tag: unknown): tag is string => typeof tag === 'string')
      : []

  const featuredImage = entry['Featured Image'] || entry.featured_image || entry.image_url || null
  const publishedAt = entry['Published At'] || entry.published_at || entry.created_at || null

  return {
    id: entry.id,
    title,
    content,
    excerpt,
    category,
    status,
    tags,
    featured_image: featuredImage,
    published_at: publishedAt,
    created_at: entry.created_at,
    updated_at: entry.updated_at,
    view_count: Number.isFinite(entry.view_count) ? entry.view_count : 0,
  }
}

function normalizeSupabaseNews(entry: Record<string, any>): NewsRecord {
  return {
    id: entry.id,
    title: entry.title,
    content: entry.content,
    excerpt: entry.excerpt ?? '',
    category: entry.category ?? null,
    status: normalizeStatus(entry.status),
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    featured_image: entry.featured_image ?? null,
    published_at: entry.published_at ?? entry.created_at,
    created_at: entry.created_at,
    updated_at: entry.updated_at,
    view_count: Number.isFinite(entry.views)
      ? entry.views
      : Number.isFinite(entry.view_count)
        ? entry.view_count
        : 0,
  }
}

function applyFilters(items: NewsRecord[], options: ListNewsOptions): NewsRecord[] {
  const { status = 'published', category = 'all', search } = options

  let filtered = items

  if (status !== 'all') {
    const lowered = status.toLowerCase()
    filtered = filtered.filter((item) => item.status === lowered)
  }

  if (category !== 'all') {
    filtered = filtered.filter((item) => (item.category ?? '').toLowerCase() === category.toLowerCase())
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((item) => {
      const haystacks = [item.title, item.excerpt, item.content, item.category ?? '', item.tags.join(' ')]
      return haystacks.some((hay) => hay.toLowerCase().includes(q))
    })
  }

  return filtered
}

function paginate(items: NewsRecord[], page: number, limit: number): NewsRecord[] {
  const offset = (page - 1) * limit
  return items.slice(offset, offset + limit)
}

export async function listNews(options: ListNewsOptions = {}): Promise<ListNewsResult> {
  const page = Number.isFinite(options.page as number) && (options.page as number) > 0 ? (options.page as number) : 1
  const limit = Number.isFinite(options.limit as number) && (options.limit as number) > 0 ? (options.limit as number) : DEFAULT_LIMIT
  const { mode } = await getCmsConfig()

  if (mode === 'wordpress') {
    try {
      const wp = getWordPressClient()
      const { items: posts } = await wp.listPosts({
        page,
        per_page: limit,
        status: options.status === 'all' ? undefined : options.status,
        search: options.search,
        _embed: true,
      })

      const normalized: NewsRecord[] = posts.map((p) => normalizeWordPressPost(p))
      // WordPress list already paginated; we return as-is
      return { items: normalized, total: normalized.length, source: 'wordpress' }
    } catch (error) {
      console.error('[news:list] WordPress query failed, falling back:', error)
    }
  }

  if (shouldUseNotionContent('news')) {
    try {
      const response = await hybridDatabases.news.query(undefined, undefined, 200)
      const normalized = (response?.data || []).map(normalizeNotionNews)

      const sorted = normalized.sort((a, b) => {
        const left = new Date(a.published_at ?? a.created_at).getTime()
        const right = new Date(b.published_at ?? b.created_at).getTime()
        return right - left
      })

      const filtered = applyFilters(sorted, options)
      const items = paginate(filtered, page, limit)

      return {
        items,
        total: filtered.length,
        source: 'notion',
      }
    } catch (error) {
      console.error('[news:list] Notion query failed, falling back to Supabase:', error)
      // continue to Supabase fallback below
    }
  }

  try {
    const supabase = createClient()
    let query = supabase
      .from('news')
      .select('*')

    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status)
    }

    if (options.category && options.category !== 'all') {
      query = query.eq('category', options.category)
    }

    if (options.search) {
      const searchTerm = options.search
      query = query.or(
        [
          `title.ilike.%${searchTerm}%`,
          `excerpt.ilike.%${searchTerm}%`,
          `content.ilike.%${searchTerm}%`,
        ].join(','),
      )
    }

    const offset = (page - 1) * limit
    const { data, error, count } = await query
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    const normalized = (data || []).map(normalizeSupabaseNews)

    return {
      items: normalized,
      total: count ?? normalized.length,
      source: 'supabase',
    }
  } catch (error) {
    console.error('[news:list] Supabase path failed, returning sample data:', error)
    // Final fallback to sample data when both Notion and Supabase fail or env missing
    const sampleNews: NewsRecord[] = [
      {
        id: "sample-1",
        title: "学生組合連合の活動について",
        excerpt: "学生組合連合UNIONの最新の活動状況をお知らせします。",
        content: "学生組合連合UNIONでは、学生の権利向上と大学生活の充実を目指して様々な活動を行っています。最近では、学費問題への取り組みや、キャンパス環境の改善に関する要望書を大学側に提出しました。",
        category: "お知らせ",
        status: "published" as NewsStatus,
        tags: ["活動報告", "学生組合"],
        featured_image: null,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        view_count: 0
      },
      {
        id: "sample-2",
        title: "新入生歓迎イベントのお知らせ",
        excerpt: "新入生を対象とした歓迎イベントを開催します。",
        content: "4月に新入生を対象とした歓迎イベントを開催予定です。学生組合の活動紹介や、先輩学生との交流会を予定しています。詳細は後日お知らせします。",
        category: "イベント",
        status: "published" as NewsStatus,
        tags: ["新入生", "歓迎", "イベント"],
        featured_image: null,
        published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        view_count: 15
      },
      {
        id: "sample-3",
        title: "データベース接続のメンテナンス",
        excerpt: "現在データベースのメンテナンス中です。",
        content: "システムメンテナンスのため、一時的にサンプルデータを表示しています。ご不便をおかけして申し訳ございません。",
        category: "システム",
        status: "published" as NewsStatus,
        tags: ["メンテナンス", "システム"],
        featured_image: null,
        published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        view_count: 8
      }
    ]
    
    const filtered = applyFilters(sampleNews, options)
    const items = paginate(filtered, page, limit)
    
    return {
      items,
      total: filtered.length,
      source: 'supabase',
    }
  }
}

export async function getNewsById(id: string): Promise<{ item: NewsRecord | null; source: 'notion' | 'supabase' | 'wordpress'; raw?: any }> {
  const { mode } = await getCmsConfig()

  if (mode === 'wordpress') {
    try {
      const wp = getWordPressClient()
      const post = await wp.getPost(id, true)
      if (post) {
        const item = normalizeWordPressPost(post)
        return { item, source: 'wordpress', raw: post }
      }
    } catch (error) {
      console.error('[news:get] WordPress fetch failed, falling back:', error)
    }
  }

  if (shouldUseNotionContent('news')) {
    try {
      const record = await hybridDatabases.news.get(id)
      if (record) {
        const item = normalizeNotionNews(record)
        return { item, source: 'notion', raw: record }
      }
    } catch (error) {
      console.error('[news:get] Notion fetch failed, falling back to Supabase:', error)
    }
  }

  const supabase = createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      console.error('[news:get] Supabase fetch failed:', error)
    }
    return { item: null, source: 'supabase' }
  }

  const item = normalizeSupabaseNews(data)
  return { item, source: 'supabase', raw: data }
}

function normalizeWordPressPost(post: WpPostResponseItem): NewsRecord {
  const featured = extractFeaturedImageUrl(post)
  // Derive category names not included by default; keep null for now or parse _embedded terms if needed
  return {
    id: String(post.id),
    title: post.title?.rendered || '',
    content: post.content?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    category: null,
    status: normalizeStatus(post.status || 'published'),
    tags: [],
    featured_image: featured,
    published_at: post.date,
    created_at: post.date,
    updated_at: post.modified,
    view_count: 0,
  }
}
