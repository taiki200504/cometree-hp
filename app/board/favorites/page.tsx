"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import FavoriteButton from "@/components/favorite-button"
import { getFavorites } from "@/lib/favorites"
import { Calendar, User, Tag, ArrowLeft, Heart, Search, Filter } from "lucide-react"

interface FavoriteItem {
  id: number
  title: string
  category: string
  date: string
  author: string
  excerpt?: string
  tags?: string[]
}

export default function BoardFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [isLoading, setIsLoading] = useState(true)

  // お気に入りデータを取得
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const favoriteItems = getFavorites()

        // 詳細情報を追加（実際のアプリではAPIから取得）
        const enrichedFavorites = favoriteItems.map((item) => ({
          ...item,
          excerpt: getExcerptForItem(item.id),
          tags: getTagsForItem(item.id),
        }))

        setFavorites(enrichedFavorites)
        setFilteredFavorites(enrichedFavorites)
      } catch (error) {
        console.error("お気に入りの読み込みに失敗しました:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  // 検索とフィルタリング
  useEffect(() => {
    let filtered = favorites

    // カテゴリーフィルター
    if (selectedCategory !== "すべて") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
      )
    }

    setFilteredFavorites(filtered)
  }, [favorites, searchTerm, selectedCategory])

  // モックデータ用のヘルパー関数
  const getExcerptForItem = (id: number): string => {
    const excerpts: { [key: number]: string } = {
      1: "来月開催予定の学生団体合同イベントについてお知らせいたします。今回は「SDGs×学生の挑戦」をテーマに、環境問題に取り組む学生団体が集結します。",
      2: "初心者歓迎のプログラミング勉強会を開催します。Web開発の基礎から学べる内容となっており、経験豊富な先輩がサポートします。",
      3: "3月に開催予定の国際交流イベントで、一緒に企画・運営を行ってくれる学生団体を募集しています。多文化理解を深める素晴らしい機会です。",
    }
    return excerpts[id] || "詳細情報はこちらをご確認ください。"
  }

  const getTagsForItem = (id: number): string[] => {
    const tags: { [key: number]: string[] } = {
      1: ["イベント", "SDGs", "環境", "合同開催"],
      2: ["プログラミング", "勉強会", "初心者歓迎", "Web開発"],
      3: ["国際交流", "コラボ", "多文化", "留学生"],
    }
    return tags[id] || ["その他"]
  }

  // カテゴリー一覧
  const categories = [
    "すべて",
    "イベント告知",
    "メンバー募集",
    "コラボ募集",
    "スキルアップ",
    "就活・キャリア",
    "その他",
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#066ff2] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">お気に入りを読み込み中...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Your Favorite Posts"
        title="お気に入り投稿"
        description="あなたがお気に入りに追加した投稿をまとめて確認できます。"
        primaryAction={{
          text: "掲示板を見る",
          href: "/board",
        }}
        secondaryAction={{
          text: "新しい投稿を探す",
          href: "/board#search",
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 戻るボタン */}
        <div className="mb-8">
          <Link
            href="/board"
            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            掲示板に戻る
          </Link>
        </div>

        {favorites.length === 0 ? (
          // お気に入りが空の場合
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">まだお気に入りがありません</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              気になる投稿を見つけたら、ハートボタンをクリックしてお気に入りに追加しましょう。
            </p>
            <Link
              href="/board"
              className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 inline-flex items-center"
            >
              <Search className="mr-2 h-5 w-5" />
              投稿を探す
            </Link>
          </div>
        ) : (
          <>
            {/* 検索・フィルター */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* 検索バー */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="お気に入りから検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* カテゴリーフィルター */}
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 結果数表示 */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {filteredFavorites.length}件のお気に入り投稿
                  {selectedCategory !== "すべて" && <span className="ml-2 text-[#066ff2]">（{selectedCategory}）</span>}
                </p>
              </div>
            </div>

            {/* お気に入り一覧 */}
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  検索結果が見つかりませんでした
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">検索条件を変更してもう一度お試しください。</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("すべて")
                  }}
                  className="text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-200"
                >
                  フィルターをリセット
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFavorites.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <FavoriteButton item={item} />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.date}
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">{item.author}</span>
                      </div>

                      <Link href={`/board/${item.id}`}>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight hover:text-[#066ff2] transition-colors duration-200">
                          {item.title}
                        </h3>
                      </Link>

                      {item.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      )}

                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg text-xs font-medium"
                            >
                              <Tag className="h-3 w-3 mr-1 inline" />#{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/board/${item.id}`}
                        className="inline-flex items-center text-[#066ff2] dark:text-blue-400 font-medium text-sm hover:text-[#ec4faf] transition-colors duration-200"
                      >
                        詳細を見る
                        <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
