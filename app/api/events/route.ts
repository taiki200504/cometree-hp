import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { checkRateLimit } from "@/lib/rate-limiter"

// モックイベントデータ（DB未使用時のフォールバック）
const mockEvents = [
  {
    id: 1,
    title: "UNION年次総会2025",
    description: "UNION学生団体連合の年次総会を開催します。今年度の活動報告と来年度の計画について議論します。",
    date: "2025年3月15日",
    time: "14:00-17:00",
    location: "東京国際フォーラム",
    address: "東京都千代田区丸の内3-5-1",
    organizer: "UNION学生団体連合",
    category: "総会・会議",
    status: "upcoming",
    participants: 245,
    maxParticipants: 300,
    registrationDeadline: "2025年3月10日",
    fee: 0,
    tags: ["総会", "年次", "活動報告"],
    image: "/placeholder.svg?height=400&width=600&text=UNION年次総会",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-18T15:30:00Z",
  },
  {
    id: 2,
    title: "学生起業家ピッチコンテスト",
    description:
      "学生起業家による事業プランのピッチコンテストを開催します。優秀者には賞金と投資家との面談機会を提供します。",
    date: "2025年2月28日",
    time: "13:00-18:00",
    location: "渋谷スカイ",
    address: "東京都渋谷区渋谷2-24-12",
    organizer: "UNION起業支援部",
    category: "コンテスト",
    status: "upcoming",
    participants: 89,
    maxParticipants: 150,
    registrationDeadline: "2025年2月20日",
    fee: 1000,
    tags: ["起業", "ピッチ", "コンテスト", "投資"],
    image: "/placeholder.svg?height=400&width=600&text=ピッチコンテスト",
    createdAt: "2025-01-05T09:00:00Z",
    updatedAt: "2025-01-18T12:00:00Z",
  },
  {
    id: 3,
    title: "新春交流会",
    description: "新年を祝う学生団体間の交流会です。ネットワーキングとコラボレーションの機会を提供します。",
    date: "2025年1月20日",
    time: "18:00-21:00",
    location: "品川プリンスホテル",
    address: "東京都港区高輪4-10-30",
    organizer: "UNION交流委員会",
    category: "交流会",
    status: "completed",
    participants: 156,
    maxParticipants: 200,
    registrationDeadline: "2025年1月15日",
    fee: 3000,
    tags: ["交流", "ネットワーキング", "新年"],
    image: "/placeholder.svg?height=400&width=600&text=新春交流会",
    createdAt: "2024-12-15T10:00:00Z",
    updatedAt: "2025-01-21T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const { allowed, remaining, resetAfter } = checkRateLimit(ip, false)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests", retryAfter: Math.ceil(resetAfter / 1000) },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetAfter / 1000)) } }
    )
  }
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let source: "supabase" | "mock" = "mock"
    let rawEvents: Array<Record<string, unknown>> = []

    try {
      const supabase = createAdminClient()
      let query = supabase
        .from("events")
        .select("id, title, description, date, time, end_time, location, status, category, image_url, created_at")
        .in("status", ["upcoming", "ongoing", "completed"])
        .order("date", { ascending: true })

      if (category && category !== "all") {
        query = query.eq("category", category)
      }
      if (status && status !== "all") {
        query = query.eq("status", status)
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`)
      }

      const { data, error } = await query.range(0, 200)
      if (!error && data && data.length >= 0) {
        source = "supabase"
        rawEvents = (data as Array<Record<string, unknown>>).map((e) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          date: e.date,
          start_date: e.date,
          time: e.time,
          location: e.location,
          status: e.status,
          category: e.category,
          image_url: e.image_url,
        }))
      }
    } catch (_) {
      // fallback to mock
    }

    let filteredEvents: Array<Record<string, unknown>> =
      source === "supabase" ? rawEvents : [...mockEvents]

    if (source === "mock") {
      if (category && category !== "all") {
        filteredEvents = filteredEvents.filter((e) => e.category === category)
      }
      if (status && status !== "all") {
        filteredEvents = filteredEvents.filter((e) => e.status === status)
      }
      if (search) {
        const searchLower = search.toLowerCase()
        filteredEvents = filteredEvents.filter(
          (e) =>
            String(e.title).toLowerCase().includes(searchLower) ||
            String(e.description || "").toLowerCase().includes(searchLower) ||
            (Array.isArray(e.tags) && (e.tags as string[]).some((tag) => tag.toLowerCase().includes(searchLower))),
        )
      }
      filteredEvents.sort(
        (a, b) =>
          new Date(String(b.date)).getTime() - new Date(String(a.date)).getTime(),
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

    const response = {
      data: paginatedEvents,
      pagination: {
        page,
        limit,
        total: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / limit),
        hasNext: endIndex < filteredEvents.length,
        hasPrev: page > 1,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      date,
      time,
      location,
      address,
      organizer,
      category,
      maxParticipants,
      registrationDeadline,
      fee = 0,
      tags = [],
    } = body

    // バリデーション
    if (!title || !description || !date || !time || !location || !category) {
      return NextResponse.json({ error: "必須フィールドが不足しています" }, { status: 400 })
    }

    // 新しいイベントを作成
    const newEvent = {
      id: mockEvents.length + 1,
      title,
      description,
      date,
      time,
      location,
      address: address || "",
      organizer: organizer || "UNION学生団体連合",
      category,
      status: "upcoming",
      participants: 0,
      maxParticipants: maxParticipants || 100,
      registrationDeadline: registrationDeadline || date,
      fee,
      tags,
      image: "/placeholder.svg?height=400&width=600&text=新しいイベント",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // モックデータに追加
    mockEvents.push(newEvent)

    return NextResponse.json({ data: newEvent, message: "イベントが作成されました" }, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
