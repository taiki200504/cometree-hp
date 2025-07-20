import { NextRequest, NextResponse } from 'next/server'
import { NewsCMS } from '@/lib/cms'
import { requireAdmin, logAccess } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const search = searchParams.get('search')
    
    const articles = await NewsCMS.getArticles({
      status,
      category,
      limit,
      offset,
      search
    })
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(null, '/api/cms/news', 'GET', 200, responseTime)
    
    return NextResponse.json(articles)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/cms/news', 'GET', 500, responseTime)
    
    console.error('News fetch error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // 管理者権限チェック
    const user = await requireAdmin()
    
    const data = await request.json()
    
    const article = await NewsCMS.createArticle({
      ...data,
      author_id: user.id
    })
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(user.id, '/api/cms/news', 'POST', 201, responseTime)
    
    return NextResponse.json(article, { status: 201 })
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/cms/news', 'POST', 500, responseTime)
    
    console.error('News creation error:', error)
    
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    )
  }
} 