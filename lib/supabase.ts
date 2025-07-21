import { createClient } from '@supabase/supabase-js'

// 環境変数の確認
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// サービスロールキーを使用したクライアント（サーバーサイドのみ）
export const createServiceClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable.'
    )
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// データベースの型定義
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'user' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'user' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'user' | null
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          author: string
          status: 'draft' | 'published' | 'archived'
          category: string
          featured_image: string | null
          tags: string[]
          views: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          author: string
          status?: 'draft' | 'published' | 'archived'
          category?: string
          featured_image?: string | null
          tags?: string[]
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          author?: string
          status?: 'draft' | 'published' | 'archived'
          category?: string
          featured_image?: string | null
          tags?: string[]
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      events: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          author: string
          status: 'draft' | 'published' | 'archived'
          category: string
          featured_image: string | null
          tags: string[]
          event_date: string
          event_time: string | null
          end_time: string | null
          location: string | null
          max_participants: number | null
          current_participants: number
          registration_required: boolean
          views: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          author: string
          status?: 'draft' | 'published' | 'archived'
          category?: string
          featured_image?: string | null
          tags?: string[]
          event_date: string
          event_time?: string | null
          end_time?: string | null
          location?: string | null
          max_participants?: number | null
          current_participants?: number
          registration_required?: boolean
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          author?: string
          status?: 'draft' | 'published' | 'archived'
          category?: string
          featured_image?: string | null
          tags?: string[]
          event_date?: string
          event_time?: string | null
          end_time?: string | null
          location?: string | null
          max_participants?: number | null
          current_participants?: number
          registration_required?: boolean
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      board_posts: {
        Row: {
          id: string
          title: string
          content: string
          author: string
          status: 'draft' | 'published' | 'archived'
          category: string
          featured_image: string | null
          tags: string[]
          views: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          author: string
          status?: 'draft' | 'published' | 'archived'
          category?: string
          featured_image?: string | null
          tags?: string[]
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author?: string
          status?: 'draft' | 'published' | 'archived'
          category?: string
          featured_image?: string | null
          tags?: string[]
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          partnership_type: string
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          partnership_type?: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          partnership_type?: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          name: string
          position: string | null
          bio: string | null
          avatar_url: string | null
          email: string | null
          phone: string | null
          social_links: Record<string, string> | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          position?: string | null
          bio?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          social_links?: Record<string, string> | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: string | null
          bio?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          social_links?: Record<string, string> | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          author: string
          post_type: 'news' | 'event' | 'board'
          post_id: string
          parent_id: string | null
          status: 'approved' | 'pending' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          author: string
          post_type: 'news' | 'event' | 'board'
          post_id: string
          parent_id?: string | null
          status?: 'approved' | 'pending' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          author?: string
          post_type?: 'news' | 'event' | 'board'
          post_id?: string
          parent_id?: string | null
          status?: 'approved' | 'pending' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      page_views: {
        Row: {
          id: string
          page_path: string
          page_title: string | null
          user_agent: string | null
          ip_address: string | null
          referrer: string | null
          session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          page_path: string
          page_title?: string | null
          user_agent?: string | null
          ip_address?: string | null
          referrer?: string | null
          session_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          page_title?: string | null
          user_agent?: string | null
          ip_address?: string | null
          referrer?: string | null
          session_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// 型エクスポート
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
