import { NextRequest, NextResponse } from "next/server"
import { listNews } from "@/lib/news"
import { checkRateLimit } from "@/lib/rate-limiter"

const DEFAULT_LIMIT = 10

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
    const pageRaw = Number.parseInt(searchParams.get("page") || "1", 10)
    const limitRaw = Number.parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10)
    const safePage = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1
    const safeLimit = Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : DEFAULT_LIMIT
    const status = searchParams.get("status") || "published"
    const category = searchParams.get("category") || "all"
    const search = searchParams.get("search")?.trim() ?? ""

    const { items, total, source } = await listNews({
      page: safePage,
      limit: safeLimit,
      status,
      category,
      search,
    })

    const news = items.map((item) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt ?? "",
      content: item.content,
      category: item.category ?? "general",
      status: item.status,
      tags: item.tags ?? [],
      featured_image: item.featured_image,
      image_url: item.featured_image,
      published_at: item.published_at ?? item.created_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
      view_count: item.view_count ?? 0,
    }))

    const totalPages = Math.max(Math.ceil(total / safeLimit), 1)
    const offset = (safePage - 1) * safeLimit

    return NextResponse.json({
      news,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages,
        hasNext: offset + safeLimit < total,
        hasPrev: safePage > 1,
      },
      source,
    })
  } catch (error) {
    console.error("[api/news] Unexpected error:", error)
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
