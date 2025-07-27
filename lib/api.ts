import { supabase } from './supabaseClient';
import { BoardPost } from '../types/board';

// APIとの連携用関数

export interface CounterData {
  organizationCount: number
  studentCount: number
  partnerCount: number
}

export interface CommunityCounterData {
  affiliatedOrganizations: number
  participatingStudents: number
  partnerCompanies: number
}

// 実際のAPIエンドポイントに置き換える
const API_URL = "/api/counter"
const COMMUNITY_API_URL = "/api/community-counter"

export async function fetchCounterData(): Promise<CounterData> {
  try {
    // 実際のAPIが実装されるまでのモックデータ
    // 本番環境では実際のAPIエンドポイントからデータを取得
    const mockData: CounterData = {
      organizationCount: 150,
      studentCount: 5000,
      partnerCount: 50,
    }

    // 実際のAPIが実装されたらこのコメントを解除
    // const response = await fetch(API_URL);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch counter data');
    // }
    // return await response.json();

    return mockData
  } catch (error) {
    console.error("Error fetching counter data:", error)
    // エラー時のフォールバックデータ
    return {
      organizationCount: 100,
      studentCount: 3000,
      partnerCount: 30,
    }
  }
}

export async function fetchCommunityCounterData(): Promise<CommunityCounterData> {
  try {
    // 実際のAPIが実装されるまでのモックデータ
    // 本番環境では実際のAPIエンドポイントからデータを取得
    const mockData: CommunityCounterData = {
      affiliatedOrganizations: 85,
      participatingStudents: 1200,
      partnerCompanies: 12,
    }

    // 実際のAPIが実装されたらこのコメントを解除
    // const response = await fetch(COMMUNITY_API_URL);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch community counter data');
    // }
    // return await response.json();

    return mockData
  } catch (error) {
    console.error("Error fetching community counter data:", error)
    // エラー時のフォールバックデータ
    return {
      affiliatedOrganizations: 80,
      participatingStudents: 1000,
      partnerCompanies: 10,
    }
  }
}

// Board posts API functions
export async function getBoardPosts(options: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<{ posts: BoardPost[]; pagination: any }> {
  try {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.category) params.append('category', options.category);
    if (options.search) params.append('search', options.search);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);

    const response = await fetch(`/api/board?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch board posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching board posts:', error);
    return { posts: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } };
  }
}

export async function getBoardPostById(id: string): Promise<BoardPost | null> {
  try {
    const response = await fetch(`/api/board/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch board post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching board post by id:', error);
    return null;
  }
}

export async function createBoardPost(data: {
  title: string;
  content: string;
  category?: string;
}): Promise<BoardPost | null> {
  try {
    const response = await fetch('/api/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create board post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating board post:', error);
    return null;
  }
}

export async function updateBoardPost(id: string, data: Partial<BoardPost>): Promise<BoardPost | null> {
  try {
    const response = await fetch(`/api/board/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update board post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating board post:', error);
    return null;
  }
}

export async function deleteBoardPost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/board/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete board post');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting board post:', error);
    return false;
  }
}
