import { type NextRequest, NextResponse } from "next/server"

// モックニュースデータ（実際の実装ではデータベースから取得）
const mockNews = [
  {
    id: 1,
    title: "東京大学起業サークル、新たなスタートアップを設立",
    excerpt:
      "東京大学起業サークルTNKのメンバーが、AI技術を活用した学習支援アプリを開発し、正式にスタートアップ企業を設立しました。",
    content:
      "東京大学起業サークルTNKのメンバーが、AI技術を活用した学習支援アプリを開発し、正式にスタートアップ企業を設立しました。既に複数の投資家から関心を集めており、今後の展開が注目されています。\n\n同サークルは2年前から学習支援アプリの開発に取り組んでおり、学生のニーズに合わせた機能を実装してきました。特に、個人の学習パターンを分析し、最適な学習プランを提案するAI機能が高く評価されています。\n\n今回の起業により、より多くの学生に質の高い学習支援を提供することが可能になります。",
    author: "UNION編集部",
    publishDate: "2025年1月18日",
    category: "起業・ビジネス",
    tags: ["起業", "AI", "学習支援", "投資"],
    status: "published",
    views: 1250,
    comments: 23,
    image: "/placeholder.svg?height=400&width=600&text=スタートアップ設立",
    createdAt: "2025-01-18T10:00:00Z",
    updatedAt: "2025-01-18T10:00:00Z",
  },
  {
    id: 2,
    title: "早稲田大学国際交流サークル、グローバル学生会議を開催",
    excerpt:
      "早稲田大学国際交流サークルが主催するグローバル学生会議が開催され、世界15カ国から100名以上の学生が参加しました。",
    content:
      "早稲田大学国際交流サークルが主催するグローバル学生会議が開催され、世界15カ国から100名以上の学生が参加しました。気候変動や教育格差などの社会課題について活発な議論が交わされました。\n\n今回の会議では、「持続可能な未来への学生の役割」をテーマに、各国の学生が自国の取り組みを発表し、国際的な協力の可能性について議論しました。\n\n参加者からは「異なる文化背景を持つ学生との議論を通じて、新たな視点を得ることができた」との声が多く聞かれました。",
    author: "UNION編集部",
    publishDate: "2025年1月15日",
    category: "国際交流",
    tags: ["国際交流", "会議", "気候変動", "教育"],
    status: "published",
    views: 890,
    comments: 15,
    image: "/placeholder.svg?height=400&width=600&text=グローバル学生会議",
    createdAt: "2025-01-15T14:00:00Z",
    updatedAt: "2025-01-15T14:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const article = mockNews.find((news) => news.id === id)

    if (!article) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 })
    }

    // 閲覧数を増加（実際の実装ではデータベースを更新）
    article.views += 1

    return NextResponse.json({ data: article })
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
