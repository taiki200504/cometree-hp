import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limiter"

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const { allowed, resetAfter } = checkRateLimit(ip, false)
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
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("[api/partners]", error)
      return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
    }

    const partners = (data || []).map((p: Record<string, unknown>) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      logo_url: p.logo_url,
      website: p.website,
      partnership_level: p.partnership_level,
    }))

    return NextResponse.json({ partners })
  } catch (e) {
    console.error("[api/partners]", e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
