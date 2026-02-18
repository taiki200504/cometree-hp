import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = createClient()

    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (e) {
    console.error("[api/organizations/[id]]", e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
