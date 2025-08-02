"use client"

import { useState, useEffect, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import { Calendar, Tag, Loader2 } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
  image_url?: string
}

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [selectedYear, setSelectedYear] = useState("すべて")
  const [searchTerm, setSearchTerm] = useState("")

  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // APIからニュースデータを取得
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('ニュースの取得に失敗しました')
        }
        const data = await response.json()
        setNewsItems(data.news || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const categories = ["すべて", "お知らせ", "メディア", "パートナーシップ", "イベント", "コミュニティ"]
  
  // 年号を動的に生成
  const years = useMemo(() => {
    const yearSet = new Set<string>()
    yearSet.add("すべて")
    newsItems.forEach(item => {
      const year = new Date(item.published_at).getFullYear().toString() + "年"
      yearSet.add(year)
    })
    return Array.from(yearSet).sort((a, b) => {
      if (a === "すべて") return -1
      if (b === "すべて") return 1
      return b.localeCompare(a)
    })
  }, [newsItems])

  // フィルタリング処理
  const filteredItems = newsItems.filter((item) => {
    const matchesCategory = selectedCategory === "すべて" || item.category === selectedCategory
    const matchesYear = selectedYear === "すべて" || new Date(item.published_at).getFullYear().toString() + "年" === selectedYear
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesYear && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Latest News"
        title="ニュース"
        description="UNIONの最新ニュース・お知らせ・プレスリリースをお届けします"
      />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* ローディング状態 */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#066ff2]" />
            <p className="text-gray-600 dark:text-gray-300">ニュースデータを読み込み中...</p>
          </div>
        )}

        {/* エラー状態 */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 dark:text-red-400">エラー: {error}</p>
          </div>
        )}

        {/* コンテンツ */}
        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-8">
          {/* サイドバー */}
          <aside className="md:w-64 w-full md:sticky md:top-24 mb-8 md:mb-0">
            {/* 検索バー */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6 shadow-sm">
              <input
                type="text"
                placeholder="キーワードで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* 種別フィルター */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <Tag className="h-5 w-5 mr-2 text-[#066ff2]" />
                種別
              </h2>
              <form className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="accent-[#066ff2]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                  </label>
                ))}
              </form>
            </div>

            {/* 年号フィルター */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <Calendar className="h-5 w-5 mr-2 text-[#ec4faf]" />
                年号
              </h2>
              <ul className="space-y-2">
                {years.map((year) => (
                  <li key={year}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="year"
                        checked={selectedYear === year}
                        onChange={() => setSelectedYear(year)}
                        className="accent-[#ec4faf]"
                      />
                      <span
                        className={`text-sm ${selectedYear === year ? "text-[#066ff2] dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {year}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>


          </aside>

          {/* メインカラム */}
          <section className="flex-1">
            {/* フィルター情報表示 */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {selectedCategory !== "すべて" && (
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>カテゴリ: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("すべて")}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                  >
                    ×
                  </button>
                </div>
              )}

              {selectedYear !== "すべて" && (
                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>年号: {selectedYear}</span>
                  <button
                    onClick={() => setSelectedYear("すべて")}
                    className="ml-2 hover:text-pink-900 dark:hover:text-pink-200"
                  >
                    ×
                  </button>
                </div>
              )}

              {searchTerm && (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>検索: {searchTerm}</span>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-green-900 dark:hover:text-green-200"
                  >
                    ×
                  </button>
                </div>
              )}

              {(selectedCategory !== "すべて" || selectedYear !== "すべて" || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory("すべて")
                    setSelectedYear("すべて")
                    setSearchTerm("")
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#066ff2] dark:hover:text-[#066ff2] ml-2"
                >
                  すべてクリア
                </button>
              )}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30"></div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(item.published_at).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/news/${item.id}`}
                        className="inline-flex items-center text-[#066ff2] dark:text-blue-400 hover:text-[#ec4faf] dark:hover:text-pink-400 text-sm font-medium mt-auto"
                      >
                        詳細を読む
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">記事が見つかりませんでした</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">検索条件を変更してもう一度お試しください。</p>
                <button
                  onClick={() => {
                    setSelectedCategory("すべて")
                    setSelectedYear("すべて")
                    setSearchTerm("")
                  }}
                  className="bg-[#066ff2] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  すべての記事を表示
                </button>
              </div>
            )}

            {/* ページネーション */}
            {filteredItems.length > 0 && (
              <div className="flex justify-center mt-10">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  <a
                    href="#"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-md"
                  >
                    &lt;
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-[#066ff2] text-white font-bold"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-md"
                  >
                    &gt;
                  </a>
                </nav>
              </div>
            )}
          </section>
        </div>
        )}

      <Footer />
    </div>
  )
}
