"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { MapPin, Users, Globe, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"

interface Org {
  id: string
  name: string
  description?: string
  category?: string
  region?: string
  member_count?: number
  logo_url?: string
  website_url?: string
  website?: string
  contact_email?: string
  status?: string
}

export default function OrganizationDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [org, setOrg] = useState<Org | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchOrg = useCallback(async () => {
    if (!id) return
    try {
      const res = await fetch(`/api/organizations/${id}`)
      if (!res.ok) throw new Error("Not found")
      const data = await res.json()
      setOrg(data)
    } catch {
      setOrg(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchOrg()
  }, [fetchOrg])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#066ff2]" />
      </div>
    )
  }

  if (!org) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">団体が見つかりません</h1>
          <Link href="/community/organizations" className="text-[#066ff2] hover:underline">加盟団体一覧に戻る</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const website = org.website_url || org.website

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ModernHero
        subtitle="Member Organization"
        title={org.name}
        description={org.description || "UNION加盟団体です。"}
      />
      <AnimatedSection className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {org.logo_url && (
              <div className="shrink-0">
                <NextImage
                  src={org.logo_url}
                  alt={org.name}
                  width={160}
                  height={160}
                  className="rounded-xl object-cover"
                />
              </div>
            )}
            <div className="space-y-4">
              {org.category && (
                <p className="text-sm text-gray-500 dark:text-gray-400">カテゴリ: {org.category}</p>
              )}
              {org.region && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4" />
                  {org.region}
                </p>
              )}
              {org.member_count != null && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="h-4 w-4" />
                  {org.member_count}人
                </p>
              )}
              {website && (
                <a
                  href={website.startsWith("http") ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#066ff2] hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  公式サイト
                </a>
              )}
              {org.contact_email && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4" />
                  {org.contact_email}
                </p>
              )}
            </div>
          </div>
          {org.description && (
            <div className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
              <h2 className="font-bold text-gray-900 dark:text-white mb-2">紹介</h2>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{org.description}</p>
            </div>
          )}
          <p className="mt-8 text-center">
            <Link href="/community/organizations" className="text-[#066ff2] hover:underline">加盟団体一覧に戻る</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
