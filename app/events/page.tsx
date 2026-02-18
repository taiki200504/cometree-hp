"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface EventItem {
  id: string | number
  title: string
  description?: string
  date?: string
  start_date?: string
  time?: string
  location?: string
  status?: string
  image_url?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        const list = Array.isArray(data) ? data : data?.data ?? data?.events ?? []
        setEvents(list)
      } catch {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const toDate = (e: EventItem) => {
    const s = e.date || e.start_date || ""
    if (!s) return 0
    const d = new Date(s)
    return isNaN(d.getTime()) ? 0 : d.getTime()
  }
  const sorted = [...events].filter((e) => toDate(e) >= 0).sort((a, b) => toDate(a) - toDate(b))

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Events"
        title="UNION主催イベント"
        description="UNIONが主催・共催するイベントの一覧です。学生向けイベントや交流会を開催しています。"
        variant="minimal"
      />
      <AnimatedSection className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#066ff2]" />
            </div>
          ) : sorted.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">現在公開中のイベントはありません。</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {sorted.map((e) => (
                <Card key={e.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{e.title}</h2>
                    {(e.date || e.start_date) && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {toDate(e) > 0
                          ? format(new Date(e.date || e.start_date!), "yyyy年M月d日(E)", { locale: ja })
                          : String(e.date || e.start_date)}
                        {e.time && ` ${e.time}`}
                      </p>
                    )}
                    {e.location && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {e.location}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {e.description && <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{e.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <p className="text-center mt-8">
            <Link href="/for-students" className="text-[#066ff2] hover:underline">学生向けトップに戻る</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
