export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  is_pinned: boolean;
  allow_comments: boolean;
  featured_image: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  comment_count: number;
}
