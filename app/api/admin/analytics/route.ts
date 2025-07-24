import { NextRequest, NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }
  try {
    // 環境変数からサービスアカウントの認証情報を取得
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON

    if (!credentialsJson) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set.')
    }

    const credentials = JSON.parse(credentialsJson)

    // GA4 プロパティIDを取得
    const propertyId = process.env.NEXT_PUBLIC_GA4_PROPERTY_ID

    if (!propertyId) {
      throw new Error('NEXT_PUBLIC_GA4_PROPERTY_ID environment variable is not set.')
    }

    // Google Analytics Data API クライアントを初期化
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    })

    // レポートリクエストの構築
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        { startDate: '7daysAgo', endDate: 'today' },
      ],
      dimensions: [
        { name: 'date' },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
    })

    const rows = response.rows?.map(row => ({
      date: row.dimensionValues?.[0]?.value,
      activeUsers: row.metricValues?.[0]?.value,
      pageViews: row.metricValues?.[1]?.value,
    })) || []

    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error)
    return NextResponse.json(
      { success: false, error: `Failed to fetch Google Analytics data: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
