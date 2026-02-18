"use client"

import { useState, useEffect } from "react"

type PartnerItem = { id: string; name: string; logo_url: string | null }

export function PartnerCommunitiesSection() {
  const [items, setItems] = useState<PartnerItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function fetchAll() {
      try {
        const [orgRes, partnerRes] = await Promise.all([
          fetch("/api/organizations?limit=50"),
          fetch("/api/partners?limit=50"),
        ])
        if (cancelled) return
        const orgData = await orgRes.json().catch(() => ({}))
        const partnerData = await partnerRes.json().catch(() => ({}))
        const orgs: PartnerItem[] = (orgData.organizations || []).map((o: { id: string; name: string; logo_url?: string | null }) => ({
          id: o.id,
          name: o.name,
          logo_url: o.logo_url ?? null,
        }))
        const partners: PartnerItem[] = (partnerData.partners || []).map((p: { id: string; name: string; logo_url?: string | null }) => ({
          id: String(p.id),
          name: p.name,
          logo_url: p.logo_url ?? null,
        }))
        const combined = [...orgs, ...partners].slice(0, 24)
        setItems(combined)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
              Partner Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">UNION連携コミュニティ</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">UNIONと連携している学生団体・企業の一部をご紹介</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
              Partner Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">UNION連携コミュニティ</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">UNIONと連携している学生団体・企業の一部をご紹介</p>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400">現在表示する連携団体・企業はありません。</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
            Partner Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">UNION連携コミュニティ</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">UNIONと連携している学生団体・企業の一部をご紹介</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {items.map((community) => (
            <div key={community.id} className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                {community.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={community.logo_url}
                    alt={community.name}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{community.name.slice(0, 2)}</span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 text-center line-clamp-2">{community.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
