import { createAdminClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limiter"

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const { allowed, resetAfter } = checkRateLimit(ip, false)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests", retryAfter: Math.ceil(resetAfter / 1000) },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetAfter / 1000)) } }
    )
  }

  try {
    const body = await request.json()
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const subject = typeof body.subject === "string" ? body.subject.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || name.length < 1) {
      return NextResponse.json({ error: "名前を入力してください" }, { status: 400 })
    }
    if (!email) {
      return NextResponse.json({ error: "メールアドレスを入力してください" }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 })
    }
    if (!message || message.length < 5) {
      return NextResponse.json({ error: "お問い合わせ内容を5文字以上で入力してください" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from("contact_inquiries").insert({
      name,
      email,
      subject: subject || null,
      message,
    })

    if (error) {
      console.error("[api/contact]", error)
      return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "送信しました" })
  } catch (e) {
    console.error("[api/contact]", e)
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 })
  }
}
