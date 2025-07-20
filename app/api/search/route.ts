import { type NextRequest, NextResponse } from "next/server"

// モックデータ（実際の実装では各データソースから取得）
const mockNews = [
  {
    id: 1,
    type: "news",
    title: "東京大学起業サークル、新たなスタートアップを設立",
    excerpt:
      "東京大学起業サークルTNKのメンバーが、AI技術を活用した学習支援アプリを開発し、正式にスタートアップ企業を設立しました。",
    url: "/studentnews/1",
    category: "起業・ビジネス",
    date: "2025年1月18日",
    tags: ["起業", "AI", "学習支援", "投資"],
  },
  {
    id: 2,
    type: "news",
    title: "早稲田大学国際交流サークル、グローバル学生会議を開催",
    excerpt:
      "早稲田大学国際交流サークルが主催するグローバル学生会議が開催され、世界15カ国から100名以上の学生が参加しました。",
    url: "/studentnews/2",
    category: "国際交流",
    date: "2025年1月15日",
    tags: ["国際交流", "会議", "気候変動", "教育"],
  },
]

const mockEvents = [
  {
    id: 1,
    type: "event",
    title: "UNION年次総会2025",
    excerpt: "UNION学生団体連合の年次総会を開催します。今年度の活動報告と来年度の計画について議論します。",
    url: "/events/1",
    category: "総会・会議",
    date: "2025年3月15日",
    tags: ["総会", "年次", "活動報告"],
  },
  {
    id: 2,
    type: "event",
    title: "学生起業家ピッチコンテスト",
    excerpt:
      "学生起業家による事業プランのピッチコンテストを開催します。優秀者には賞金と投資家との面談機会を提供します。",
    url: "/events/2",
    category: "コンテスト",
    date: "2025年2月28日",
    tags: ["起業", "ピッチ", "コンテスト", "投資"],
  },
]

const mockPodcasts = [
  {
    id: 1,
    type: "podcast",
    title: "新年特別企画：2025年の学生団体トレンド予測",
    excerpt: "2025年最初の配信では、今年注目される学生団体の活動トレンドについて深掘りします。",
    url: "/podcast#episode-1",
    category: "ユニラジ",
    date: "2025年1月15日",
    tags: ["トレンド", "予測", "2025年", "学生団体"],
  },
  {
    id: 2,
    type: "podcast",
    title: "心の健康とコミュニティ：学生が語るメンタルヘルス",
    excerpt: "現代の学生が抱えるメンタルヘルスの課題について、当事者の視点から語り合います。",
    url: "/podcast#episode-2",
    category: "ここみゆ",
    date: "2025年1月12日",
    tags: ["メンタルヘルス", "コミュニティ", "支援", "心理学"],
  },
]

const mockPages = [
  {
    id: 1,
    type: "page",
    title: "About - UNIONについて",
    excerpt: "UNION学生団体連合の理念、ミッション、ビジョン、バリューについて詳しく説明しています。",
    url: "/about",
    category: "組織情報",
    date: "2024年4月1日",
    tags: ["UNION", "理念", "ミッション", "組織"],
  },
  {
    id: 2,
    type: "page",
    title: "Services - サービス一覧",
    excerpt: "UNIONが提供する学生向け・企業向けサービスの詳細をご紹介します。",
    url: "/services",
    category: "サービス",
    date: "2024年4月1日",
    tags: ["サービス", "学生向け", "企業向け", "支援"],
  },
  {
    id: 3,
    type: "page",
    title: "Community - コミュニティ",
    excerpt: "UNIONのコミュニティ活動、加盟団体、提携企業について紹介しています。",
    url: "/community",
    category: "コミュニティ",
    date: "2024年4月1日",
    tags: ["コミュニティ", "加盟団体", "提携企業", "ネットワーク"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const type = searchParams.get("type") // news, event, podcast, page, all
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!query) {
      return NextResponse.json({ error: "検索クエリが必要です" }, { status: 400 })
    }

    const queryLower = query.toLowerCase()
    let allResults: any[] = []

    // 検索対象のデータソースを決定
    const searchSources = []
    if (!type || type === "all" || type === "news") {
      searchSources.push(...mockNews)
    }
    if (!type || type === "all" || type === "event") {
      searchSources.push(...mockEvents)
    }
    if (!type || type === "all" || type === "podcast") {
      searchSources.push(...mockPodcasts)
    }
    if (!type || type === "all" || type === "page") {
      searchSources.push(...mockPages)
    }

    // 検索実行
    allResults = searchSources.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(queryLower) ||
        item.excerpt.toLowerCase().includes(queryLower) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(queryLower))

      const matchesCategory = !category || category === "all" || item.category === category

      return matchesQuery && matchesCategory
    })

    // 関連度でソート（タイトルマッチを優先）
    allResults.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(queryLower) ? 1 : 0
      const bTitle = b.title.toLowerCase().includes(queryLower) ? 1 : 0
      return bTitle - aTitle
    })

    // ページネーション
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = allResults.slice(startIndex, endIndex)

    // 結果の統計
    const stats = {
      total: allResults.length,
      byType: {
        news: allResults.filter((item) => item.type === "news").length,
        event: allResults.filter((item) => item.type === "event").length,
        podcast: allResults.filter((item) => item.type === "podcast").length,
        page: allResults.filter((item) => item.type === "page").length,
      },
    }

    const response = {
      query,
      data: paginatedResults,
      stats,
      pagination: {
        page,
        limit,
        total: allResults.length,
        totalPages: Math.ceil(allResults.length / limit),
        hasNext: endIndex < allResults.length,
        hasPrev: page > 1,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error performing search:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
