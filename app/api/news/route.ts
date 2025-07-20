import { type NextRequest, NextResponse } from "next/server"

// モックニュースデータ
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
  {
    id: 3,
    title: "慶應義塾大学ボランティア団体、地域清掃活動で表彰",
    excerpt:
      "慶應義塾大学のボランティア団体が継続的に行ってきた地域清掃活動が評価され、渋谷区から感謝状を授与されました。",
    content:
      "慶應義塾大学のボランティア団体が継続的に行ってきた地域清掃活動が評価され、渋谷区から感謝状を授与されました。3年間で延べ500名以上の学生が参加し、地域環境の改善に貢献しています。\n\n同団体は毎月第2・第4土曜日に渋谷駅周辺の清掃活動を実施しており、地域住民からも高い評価を得ています。\n\n今回の表彰を受けて、団体代表は「地域の皆様と一緒に活動できることに感謝している。今後も継続して地域貢献に取り組んでいきたい」とコメントしています。",
    author: "UNION編集部",
    publishDate: "2025年1月12日",
    category: "ボランティア・社会貢献",
    tags: ["ボランティア", "清掃", "表彰", "地域貢献"],
    status: "published",
    views: 654,
    comments: 8,
    image: "/placeholder.svg?height=400&width=600&text=地域清掃活動",
    createdAt: "2025-01-12T09:00:00Z",
    updatedAt: "2025-01-12T09:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filteredNews = [...mockNews]

    // カテゴリフィルター
    if (category && category !== "all") {
      filteredNews = filteredNews.filter((news) => news.category === category)
    }

    // ステータスフィルター
    if (status && status !== "all") {
      filteredNews = filteredNews.filter((news) => news.status === status)
    }

    // 検索フィルター
    if (search) {
      const searchLower = search.toLowerCase()
      filteredNews = filteredNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchLower) ||
          news.excerpt.toLowerCase().includes(searchLower) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // ページネーション
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNews = filteredNews.slice(startIndex, endIndex)

    const response = {
      data: paginatedNews,
      pagination: {
        page,
        limit,
        total: filteredNews.length,
        totalPages: Math.ceil(filteredNews.length / limit),
        hasNext: endIndex < filteredNews.length,
        hasPrev: page > 1,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, tags, status = "draft" } = body

    // バリデーション
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json({ error: "必須フィールドが不足しています" }, { status: 400 })
    }

    // 新しい記事を作成（実際の実装ではデータベースに保存）
    const newArticle = {
      id: mockNews.length + 1,
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      status,
      author: "管理者",
      publishDate: status === "published" ? new Date().toLocaleDateString("ja-JP") : "下書き",
      views: 0,
      comments: 0,
      image: "/placeholder.svg?height=400&width=600&text=新しい記事",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // モックデータに追加
    mockNews.push(newArticle)

    return NextResponse.json({ data: newArticle, message: "記事が作成されました" }, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
