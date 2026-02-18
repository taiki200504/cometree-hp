"use client"

import { useState, useEffect } from "react"

type Item = { id: string; name: string; logo_url: string | null }

export function PartnerLogoCarousel() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    let cancelled = false
    async function fetchAll() {
      try {
        const [orgRes, partnerRes] = await Promise.all([
          fetch("/api/organizations?limit=30"),
          fetch("/api/partners?limit=30"),
        ])
        if (cancelled) return
        const orgData = await orgRes.json().catch(() => ({}))
        const partnerData = await partnerRes.json().catch(() => ({}))
        const orgs: Item[] = (orgData.organizations || []).map(
          (o: { id: string; name: string; logo_url?: string | null }) => ({
            id: o.id,
            name: o.name,
            logo_url: o.logo_url ?? null,
          })
        )
        const partners: Item[] = (partnerData.partners || []).map(
          (p: { id: string; name: string; logo_url?: string | null }) => ({
            id: String(p.id),
            name: p.name,
            logo_url: p.logo_url ?? null,
          })
        )
        setItems([...orgs, ...partners].filter((i) => i.name))
      } catch {
        if (!cancelled) setItems([])
      }
    }
    fetchAll()
    return () => {
      cancelled = true
    }
  }, [])

  if (items.length === 0) return null

  const duplicated = [...items, ...items]

  return (
    <section
      className="union-section bg-[var(--union-section-bg)] border-y border-[var(--union-border)]"
      aria-label="ご支援・提携企業・団体"
    >
      <div className="union-container">
        <p className="union-label text-center">ご支援・提携企業・団体</p>
        <h2 className="union-heading-section text-center mb-8">
          導入・提携実績
        </h2>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex gap-16 w-max animate-marquee"
          style={{ willChange: "transform" }}
        >
          {duplicated.map((item) => (
            <div
              key={`${item.id}-${item.name}`}
              className="flex-shrink-0 w-28 h-16 flex items-center justify-center rounded-lg bg-[var(--union-section-alt)] border border-[var(--union-border)] px-5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {item.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logo_url}
                  alt={item.name}
                  className="max-h-9 max-w-full object-contain pointer-events-none"
                />
              ) : (
                <span className="union-body text-xs truncate max-w-full">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
