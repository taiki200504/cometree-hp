import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getNewsById } from "@/lib/news"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const { item, source, raw } = await getNewsById(id)

    if (!item || item.status !== 'published') {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 })
    }

    let viewCount = item.view_count ?? 0

    if (source === 'supabase') {
      try {
        const currentViews = Number.isFinite(raw?.views) ? raw.views : viewCount
        const updatedViews = (currentViews ?? 0) + 1
        await supabase
          .from('news')
          .update({ views: updatedViews })
          .eq('id', id)
        viewCount = updatedViews
      } catch (incrementError) {
        console.error(`[api/news/${id}] Failed to increment views:`, incrementError)
      }
    }

    const formattedNews = {
      id: item.id,
      title: item.title,
      excerpt: item.excerpt || '',
      content: item.content,
      category: item.category ?? 'general',
      status: item.status,
      tags: item.tags || [],
      featuredImage: item.featured_image || '/images/news-sample.jpg',
      seoTitle: item.title,
      seoDescription: item.excerpt || '',
      publishedAt: item.published_at || item.created_at,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      viewCount,
      source,
    }

    return NextResponse.json(formattedNews)
  } catch (error) {
    console.error("Error fetching news article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { title, excerpt, content, category, tags, status } = body

    const articleIndex = mockNews.findIndex((news) => news.id === id)

    if (articleIndex === -1) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 })
    }

    // 記事を更新
    const updatedArticle = {
      ...mockNews[articleIndex],
      title: title || mockNews[articleIndex].title,
      excerpt: excerpt || mockNews[articleIndex].excerpt,
      content: content || mockNews[articleIndex].content,
      category: category || mockNews[articleIndex].category,
      tags: tags || mockNews[articleIndex].tags,
      status: status || mockNews[articleIndex].status,
      publishDate:
        status === "published" && mockNews[articleIndex].status === "draft"
          ? new Date().toLocaleDateString("ja-JP")
          : mockNews[articleIndex].publishDate,
      updatedAt: new Date().toISOString(),
    }

    mockNews[articleIndex] = updatedArticle

    return NextResponse.json({ data: updatedArticle, message: "記事が更新されました" })
  } catch (error) {
    console.error("Error updating news article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const articleIndex = mockNews.findIndex((news) => news.id === id)

    if (articleIndex === -1) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 })
    }

    // 記事を削除
    const deletedArticle = mockNews.splice(articleIndex, 1)[0]

    return NextResponse.json({ data: deletedArticle, message: "記事が削除されました" })
  } catch (error) {
    console.error("Error deleting news article:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
