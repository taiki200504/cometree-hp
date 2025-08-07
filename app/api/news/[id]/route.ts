import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Supabaseからニュースデータを取得
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error || !news) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 })
    }

    // 閲覧数を増加
    await supabase
      .from('news')
      .update({ views: news.views + 1 })
      .eq('id', id)

    // フロントエンド用のデータ形式に変換
    const formattedNews = {
      id: news.id,
      title: news.title,
      excerpt: news.excerpt || '',
      content: news.content,
      category: news.category,
      status: news.status,
      tags: news.tags || [],
      featuredImage: news.featured_image || '/images/news-sample.jpg',
      seoTitle: news.title,
      seoDescription: news.excerpt || '',
      publishedAt: news.published_at || news.created_at,
      createdAt: news.created_at,
      updatedAt: news.updated_at,
      viewCount: news.views + 1
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
