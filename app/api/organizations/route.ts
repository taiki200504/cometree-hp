import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limiter"

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
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 200)
    const status = searchParams.get("status") || "active"

    let query = supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("[api/organizations]", error)
      return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 })
    }

    const list = (data || []).map((o: Record<string, unknown>) => ({
      ...o,
      activities: Array.isArray(o.activities) ? o.activities : [],
    }))

    return NextResponse.json({ organizations: list })
  } catch (e) {
    console.error("[api/organizations]", e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
