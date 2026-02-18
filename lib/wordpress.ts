export interface WordPressClientConfig {
  baseUrl: string
  username?: string
  applicationPassword?: string
}

export interface WpPostResponseItem {
  id: number
  date: string
  modified: string
  link: string
  slug: string
  status: string
  type: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories?: number[]
  tags?: number[]
  featured_media?: number
  _embedded?: any
}

export class WordPressClient {
  private readonly baseUrl: string
  private readonly authHeader?: string

  constructor(config?: Partial<WordPressClientConfig>) {
    const baseUrlEnv = process.env.WORDPRESS_BASE_URL || ''
    const username = process.env.WORDPRESS_USERNAME || ''
    const appPassword = process.env.WORDPRESS_APPLICATION_PASSWORD || ''

    this.baseUrl = (config?.baseUrl || baseUrlEnv).replace(/\/$/, '')

    if ((config?.username || username) && (config?.applicationPassword || appPassword)) {
      const raw = `${config?.username || username}:${config?.applicationPassword || appPassword}`
      this.authHeader = 'Basic ' + Buffer.from(raw).toString('base64')
    }
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}/wp-json${path}`
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    }
    if (this.authHeader) headers['Authorization'] = this.authHeader
    const res = await fetch(url, { ...init, headers: { ...headers, ...(init?.headers as any) } })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`WordPress request failed ${res.status}: ${text}`)
    }
    return (await res.json()) as T
  }

  async listPosts(params?: {
    page?: number
    per_page?: number
    search?: string
    status?: string
    categories?: string
    _embed?: boolean
  }): Promise<{ items: WpPostResponseItem[]; total: number }> {
    const query = new URLSearchParams()
    if (params?.page) query.set('page', String(params.page))
    if (params?.per_page) query.set('per_page', String(params.per_page))
    if (params?.search) query.set('search', params.search)
    if (params?.status) query.set('status', params.status)
    if (params?.categories) query.set('categories', params.categories)
    if (params?._embed) query.set('_embed', 'true')

    const path = `/wp/v2/posts?${query.toString()}`
    const res = await this.request<WpPostResponseItem[]>(path, { method: 'GET' })

    // WordPress returns total via headers; but fetch here loses that unless we re-fetch with HEAD.
    // Instead, approximate total by res.length when header not present (API often includes X-WP-Total in browser fetch).
    const total = Array.isArray(res) ? res.length : 0
    return { items: res, total }
  }

  async getPost(idOrSlug: string, embed: boolean = true): Promise<WpPostResponseItem | null> {
    const isNumeric = /^\d+$/.test(idOrSlug)
    const path = isNumeric
      ? `/wp/v2/posts/${idOrSlug}${embed ? '?_embed=true' : ''}`
      : `/wp/v2/posts?slug=${encodeURIComponent(idOrSlug)}${embed ? '&_embed=true' : ''}`
    const res = await this.request<WpPostResponseItem | WpPostResponseItem[]>(path, { method: 'GET' })
    if (Array.isArray(res)) return res[0] || null
    return res as WpPostResponseItem
  }

  // Generic getter for custom post types
  async listCpt(cpt: string, params?: Record<string, string | number | boolean>): Promise<any[]> {
    const query = new URLSearchParams()
    for (const [k, v] of Object.entries(params || {})) query.set(k, String(v))
    const res = await this.request<any[]>(`/wp/v2/${cpt}?${query.toString()}`, { method: 'GET' })
    return res
  }
}

export function getWordPressClient(): WordPressClient {
  return new WordPressClient()
}

export function extractFeaturedImageUrl(item: WpPostResponseItem): string | null {
  // Try _embedded featured media first
  const media = (item as any)?._embedded?.['wp:featuredmedia']?.[0]
  const mediaUrl: string | undefined = media?.source_url
  if (mediaUrl) return mediaUrl
  // Fallback to jetpack/og image if present
  const jetpack = (item as any)?._embedded?.['wp:term']
  return null
}


