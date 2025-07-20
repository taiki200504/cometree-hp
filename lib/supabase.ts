import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'editor' | 'viewer'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          excerpt: string | null
          content: string
          category: string
          status: 'draft' | 'published' | 'archived'
          tags: string[]
          featured_image: string | null
          seo_title: string | null
          seo_description: string | null
          published_at: string | null
          created_by: string | null
          created_at: string
          updated_at: string
          view_count: number
        }
        Insert: {
          id?: string
          title: string
          excerpt?: string | null
          content: string
          category?: string
          status?: 'draft' | 'published' | 'archived'
          tags?: string[]
          featured_image?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string | null
          content?: string
          category?: string
          status?: 'draft' | 'published' | 'archived'
          tags?: string[]
          featured_image?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          time: string
          end_time: string | null
          location: string | null
          max_participants: number | null
          current_participants: number
          registration_required: boolean
          registration_deadline: string | null
          contact_email: string | null
          contact_phone: string | null
          category: string
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          tags: string[]
          featured_image: string | null
          gallery: string[]
          created_by: string | null
          created_at: string
          updated_at: string
          view_count: number
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          time: string
          end_time?: string | null
          location?: string | null
          max_participants?: number | null
          current_participants?: number
          registration_required?: boolean
          registration_deadline?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          category?: string
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          tags?: string[]
          featured_image?: string | null
          gallery?: string[]
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          time?: string
          end_time?: string | null
          location?: string | null
          max_participants?: number | null
          current_participants?: number
          registration_required?: boolean
          registration_deadline?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          category?: string
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          tags?: string[]
          featured_image?: string | null
          gallery?: string[]
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
        }
      }
      board_posts: {
        Row: {
          id: string
          title: string
          content: string
          author: string
          category: string
          status: 'draft' | 'published' | 'archived'
          tags: string[]
          is_pinned: boolean
          allow_comments: boolean
          featured_image: string | null
          created_by: string | null
          created_at: string
          updated_at: string
          view_count: number
          comment_count: number
        }
        Insert: {
          id?: string
          title: string
          content: string
          author: string
          category?: string
          status?: 'draft' | 'published' | 'archived'
          tags?: string[]
          is_pinned?: boolean
          allow_comments?: boolean
          featured_image?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
          comment_count?: number
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author?: string
          category?: string
          status?: 'draft' | 'published' | 'archived'
          tags?: string[]
          is_pinned?: boolean
          allow_comments?: boolean
          featured_image?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
          comment_count?: number
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string
          status: string
          member_count: number
          location: string | null
          website: string | null
          contact_email: string | null
          contact_phone: string | null
          logo_url: string | null
          joined_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type?: string
          status?: string
          member_count?: number
          location?: string | null
          website?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          logo_url?: string | null
          joined_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: string
          status?: string
          member_count?: number
          location?: string | null
          website?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          logo_url?: string | null
          joined_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          description: string | null
          partnership_level: string
          benefits: string[]
          website: string | null
          contact_email: string | null
          contact_phone: string | null
          logo_url: string | null
          partnership_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          partnership_level?: string
          benefits?: string[]
          website?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          logo_url?: string | null
          partnership_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          partnership_level?: string
          benefits?: string[]
          website?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          logo_url?: string | null
          partnership_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          name: string
          role: string
          responsibilities: string | null
          achievements: string[]
          contact_email: string | null
          contact_phone: string | null
          avatar_url: string | null
          join_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          responsibilities?: string | null
          achievements?: string[]
          contact_email?: string | null
          contact_phone?: string | null
          avatar_url?: string | null
          join_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          responsibilities?: string | null
          achievements?: string[]
          contact_email?: string | null
          contact_phone?: string | null
          avatar_url?: string | null
          join_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_name: string
          author_email: string | null
          content: string
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_name: string
          author_email?: string | null
          content: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_name?: string
          author_email?: string | null
          content?: string
          is_approved?: boolean
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
          created_at: string
        }
        Insert: {
          id?: string
          page_path: string
          page_title?: string | null
          user_agent?: string | null
          ip_address?: string | null
          referrer?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          page_title?: string | null
          user_agent?: string | null
          ip_address?: string | null
          referrer?: string | null
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
