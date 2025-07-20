import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// サーバーサイド用のクライアント
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// 管理用のクライアント（サービスロールキー使用）
export const createAdminSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !key) {
    throw new Error("Supabase environment variables not configured")
  }
  
  return createClient(url, key)
}

// 型定義
export type Database = {
  public: {
    Tables: {
      // 既存のテーブル
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          role: "user" | "admin" | "moderator"
          university: string | null
          faculty: string | null
          year: number | null
          bio: string | null
          website_url: string | null
          twitter_handle: string | null
          linkedin_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          role?: "user" | "admin" | "moderator"
          university?: string | null
          faculty?: string | null
          year?: number | null
          bio?: string | null
          website_url?: string | null
          twitter_handle?: string | null
          linkedin_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          role?: "user" | "admin" | "moderator"
          university?: string | null
          faculty?: string | null
          year?: number | null
          bio?: string | null
          website_url?: string | null
          twitter_handle?: string | null
          linkedin_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      news_articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image_url: string | null
          category: string | null
          tags: string[] | null
          status: "draft" | "published" | "archived"
          published_at: string | null
          view_count: number
          like_count: number
          author_id: string | null
          organization_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image_url?: string | null
          category?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "archived"
          published_at?: string | null
          view_count?: number
          like_count?: number
          author_id?: string | null
          organization_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image_url?: string | null
          category?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "archived"
          published_at?: string | null
          view_count?: number
          like_count?: number
          author_id?: string | null
          organization_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      board_posts: {
        Row: {
          id: string
          title: string
          content: string
          category: string | null
          tags: string[] | null
          is_anonymous: boolean
          view_count: number
          like_count: number
          comment_count: number
          status: "published" | "hidden" | "deleted"
          author_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: string | null
          tags?: string[] | null
          is_anonymous?: boolean
          view_count?: number
          like_count?: number
          comment_count?: number
          status?: "published" | "hidden" | "deleted"
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string | null
          tags?: string[] | null
          is_anonymous?: boolean
          view_count?: number
          like_count?: number
          comment_count?: number
          status?: "published" | "hidden" | "deleted"
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // 新規追加テーブル
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          member_count: number | null
          category: string | null
          status: "active" | "inactive" | "pending"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          member_count?: number | null
          category?: string | null
          status?: "active" | "inactive" | "pending"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          member_count?: number | null
          category?: string | null
          status?: "active" | "inactive" | "pending"
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string | null
          featured_image_url: string | null
          start_date: string
          end_date: string | null
          location: string | null
          location_url: string | null
          category: string | null
          tags: string[] | null
          status: "draft" | "published" | "cancelled" | "completed"
          registration_required: boolean
          registration_url: string | null
          max_participants: number | null
          current_participants: number
          organizer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content?: string | null
          featured_image_url?: string | null
          start_date: string
          end_date?: string | null
          location?: string | null
          location_url?: string | null
          category?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "cancelled" | "completed"
          registration_required?: boolean
          registration_url?: string | null
          max_participants?: number | null
          current_participants?: number
          organizer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string | null
          featured_image_url?: string | null
          start_date?: string
          end_date?: string | null
          location?: string | null
          location_url?: string | null
          category?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "cancelled" | "completed"
          registration_required?: boolean
          registration_url?: string | null
          max_participants?: number | null
          current_participants?: number
          organizer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          description: string | null
          file_url: string
          file_size: number | null
          file_type: string | null
          category: string | null
          tags: string[] | null
          is_public: boolean
          download_count: number
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          file_url: string
          file_size?: number | null
          file_type?: string | null
          category?: string | null
          tags?: string[] | null
          is_public?: boolean
          download_count?: number
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          file_url?: string
          file_size?: number | null
          file_type?: string | null
          category?: string | null
          tags?: string[] | null
          is_public?: boolean
          download_count?: number
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      email_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          organization: string | null
          preferences: {
            news: boolean
            events: boolean
            board_updates: boolean
          } | null
          status: "active" | "unsubscribed" | "pending"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          organization?: string | null
          preferences?: {
            news: boolean
            events: boolean
            board_updates: boolean
          } | null
          status?: "active" | "unsubscribed" | "pending"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          organization?: string | null
          preferences?: {
            news: boolean
            events: boolean
            board_updates: boolean
          } | null
          status?: "active" | "unsubscribed" | "pending"
          created_at?: string
          updated_at?: string
        }
      }
      access_logs: {
        Row: {
          id: string
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
          endpoint: string
          method: string
          status_code: number
          response_time: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          endpoint: string
          method: string
          status_code: number
          response_time: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          endpoint?: string
          method?: string
          status_code?: number
          response_time?: number
          created_at?: string
        }
      }
    }
  }
}
