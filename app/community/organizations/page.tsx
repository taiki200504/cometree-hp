"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import { Search, Filter, Users, MapPin, Calendar, ExternalLink, Loader2 } from "lucide-react"

interface Organization {
  id: string
  name: string
  description: string
  category: string
  region: string
  member_count: number
  established_year?: number
  activities: string[]
  website_url?: string
  contact_email?: string
  logo_url?: string
  status: string
  created_at: string
  updated_at: string
}

export default function Organizations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [selectedRegion, setSelectedRegion] = useState("すべて")

  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // APIから加盟団体データを取得
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/organizations')
        if (!response.ok) {
          throw new Error('加盟団体の取得に失敗しました')
        }
        const data = await response.json()
        setOrganizations(data.organizations || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])


  const categories = [
    "すべて",
    "起業・ビジネス",
    "国際交流",
    "ボランティア・社会貢献",
    "メディア・クリエイティブ",
    "環境・エコロジー",
    "イベント・企画",
    "国際協力",
    "技術・IT",
  ]

  const regions = ["すべて", "東京都", "神奈川県", "埼玉県", "千葉県", "大阪府", "京都府", "愛知県"]

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      searchTerm === "" ||
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org.activities || []).some((activity) => activity.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "すべて" || org.category === selectedCategory
    const matchesRegion = selectedRegion === "すべて" || org.region === selectedRegion
    return matchesSearch && matchesCategory && matchesRegion
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Member Organizations"
        title="加盟団体一覧"
        description="UNIONに加盟している学生団体をご紹介します。多様な分野で活動する団体が集まり、共に成長しています。"
        primaryCTA={{
          text: "加盟申請する",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link",
        }}
        secondaryCTA={{
          text: "コミュニティに戻る",
          href: "/community",
        }}
      />

      {/* ローディング状態 */}
      {loading && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#066ff2]" />
              <p className="text-gray-600 dark:text-gray-300">加盟団体データを読み込み中...</p>
            </div>
          </div>
        </section>
      )}

      {/* エラー状態 */}
      {error && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-red-600 dark:text-red-400">エラー: {error}</p>
            </div>
          </div>
        </section>
      )}

      {/* 検索・フィルター */}
      {!loading && !error && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 検索バー */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="団体名・活動内容で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* カテゴリーフィルター */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* 地域フィルター */}
              <div>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                {filteredOrganizations.length}件の団体が見つかりました
              </div>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("すべて")
                  setSelectedRegion("すべて")
                }}
                className="text-sm text-[#066ff2] hover:text-[#ec4faf] font-medium"
              >
                フィルターをリセット
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 団体一覧 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {org.name.slice(0, 2)}
                      </span>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                      {org.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{org.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{org.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {org.region}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {org.member_count}名
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {org.established_year}年設立
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">主な活動</h4>
                    <div className="flex flex-wrap gap-1">
                      {(org.activities || []).slice(0, 3).map((activity, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                      {(org.activities || []).length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">+{(org.activities || []).length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${org.contact_email}`}
                      className="text-[#066ff2] hover:text-[#ec4faf] text-sm font-medium"
                    >
                      お問い合わせ
                    </a>
                    <a
                      href={org.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrganizations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                該当する団体が見つかりませんでした
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">検索条件を変更してもう一度お試しください。</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("すべて")
                  setSelectedRegion("すべて")
                }}
                className="bg-[#066ff2] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                すべての団体を表示
              </button>
            </div>
          )}
        </div>
      </section>
      )}

      <Footer />
    </div>
  )
}
