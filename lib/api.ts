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

export async function getBoardPosts(): Promise<BoardPost[]> {
  const { data, error } = await supabase
    .from('board_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching board posts:', error);
    return [];
  }

  return data || [];
}
