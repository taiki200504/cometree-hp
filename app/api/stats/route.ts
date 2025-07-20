import { NextResponse } from 'next/server'

export interface StatsData {
  organizationCount: number
  memberCount: number
  partnerCount: number
  prefectureCount: number
  mediaCount: number
}

export async function GET() {
  try {
    // TODO: 実際のCMS APIからデータを取得
    // 現在はモックデータを使用
    const statsData: StatsData = {
      organizationCount: 150, // CMSから自動集計
      memberCount: 5000, // CMSから自動集計
      partnerCount: 50, // CMSから自動集計
      prefectureCount: 10, // 活動拠点の都道府県数
      mediaCount: 4, // ポッドキャスト番組数
    }

    return NextResponse.json(statsData)
  } catch (error) {
    console.error('Error fetching stats data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats data' },
      { status: 500 }
    )
  }
} 