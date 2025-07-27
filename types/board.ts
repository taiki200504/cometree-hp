export interface BoardPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  author_id?: string;
  category: string;
  status: 'draft' | 'published' | 'archived' | 'hidden' | 'deleted';
  tags: string[];
  is_anonymous: boolean;
  is_pinned: boolean;
  allow_comments: boolean;
  featured_image?: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface BoardPostCreate {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  is_anonymous?: boolean;
  allow_comments?: boolean;
  featured_image?: string;
}

export interface BoardPostUpdate extends Partial<BoardPostCreate> {
  status?: BoardPost['status'];
  is_pinned?: boolean;
}

export interface BoardPostsResponse {
  posts: BoardPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
