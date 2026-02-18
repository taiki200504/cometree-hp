"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Newspaper, Calendar, Mic } from "lucide-react"
import { SectionHeading } from "./SectionHeading"

interface NewsItem {
  id: string
  title: string
  published_at: string
}

export function HomeNewsEventsMedia() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch("/api/news?limit=3")
      .then((r) => (r.ok ? r.json() : { news: [] }))
      .then((data) => setNews(data.news || []))
      .catch(() => setNews([]))
  }, [])

  const cards = [
    {
      href: "/news",
      label: "お知らせ",
      icon: Newspaper,
      items: news,
      itemLink: (item: NewsItem) => `/news/${item.id}`,
      itemTitle: (item: NewsItem) => item.title,
      itemDate: (item: NewsItem) =>
        item.published_at ? new Date(item.published_at).toLocaleDateString("ja-JP") : "",
    },
    {
      href: "/events",
      label: "イベント",
      icon: Calendar,
      items: [], // 仮: APIがあれば差し替え
      itemLink: () => "/events",
      itemTitle: () => "",
      itemDate: () => "",
      emptyText: "イベント情報は順次お知らせします。",
    },
    {
      href: "/media",
      label: "メディア",
      icon: Mic,
      items: [],
      itemLink: () => "/media",
      itemTitle: () => "",
      itemDate: () => "",
      emptyText: "ポッドキャスト・学生ニュースを配信中。",
    },
  ]

  return (
    <section className="union-section bg-[var(--union-section-alt)]">
      <div className="union-container">
        <SectionHeading
          label="Information"
          title="お知らせ・イベント・メディア"
          description="最新の活動情報とメディアコンテンツをご覧いただけます。"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.href} className="union-card flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 union-heading-card">
                  <card.icon className="h-5 w-5 text-[var(--union-primary)]" />
                  {card.label}
                </span>
                <Link href={card.href} className="union-link text-sm inline-flex items-center gap-1">
                  一覧
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {card.items.length > 0 ? (
                <ul className="space-y-3 flex-1">
                  {card.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={card.itemLink(item)}
                        className="block py-2 border-b border-[var(--union-border)] last:border-0 hover:opacity-80 transition-opacity"
                      >
                        <span className="text-xs union-body block mb-0.5">{card.itemDate(item)}</span>
                        <span className="font-medium text-[var(--union-text)] line-clamp-2 text-sm">
                          {card.itemTitle(item)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="union-body text-sm flex-1">{card.emptyText}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
