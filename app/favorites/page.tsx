"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { useFavorites } from "@/context/favorites-context"
import { Heart, Calendar, User, Search, ExternalLink } from "lucide-react"

// サンプルデータ削除済み。今後はAPIや本番データ取得に対応。

export default function Favorites() {
  const { favorites = [] } = useFavorites() || {};
  const [searchTerm, setSearchTerm] = useState("")
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]) // サンプルデータを削除したため、型をany[]に変更

  useEffect(() => {
    // お気に入りIDに対応するアイテムを取得
    const fetchFavoriteItems = async () => {
      if (favorites.length === 0) {
        setFavoriteItems([])
        return
      }

      try {
        // 実際のAPIからデータを取得
        const items = await Promise.all(
          favorites.map(async (favoriteId) => {
            const response = await fetch(`/api/news/${favoriteId}`)
            if (response.ok) {
              const data = await response.json()
              return {
                id: data.id,
                title: data.title,
                excerpt: data.excerpt,
                category: data.category,
                type: 'article',
                date: new Date(data.publishedAt).toLocaleDateString(),
                author: 'UNION編集部'
              }
            }
            return null
          })
        )

        const validItems = items.filter(item => item !== null)
        setFavoriteItems(validItems)
      } catch (error) {
        console.error('Error fetching favorite items:', error)
        setFavoriteItems([])
      }
    }

    fetchFavoriteItems()
  }, [favorites])

  const filteredFavorites = useMemo(() => {
    return favoriteItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [favoriteItems, searchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero subtitle="My Favorites" title="お気に入り" description="保存した記事やイベントを管理・閲覧できます" />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* 検索バー */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="お気に入りの中から検索..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* 統計情報 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800">
            <Heart className="h-5 w-5 mr-2 fill-current" />
            <span className="font-medium">
              {filteredFavorites.length}件のお気に入り
              {searchTerm && ` (検索結果)`}
            </span>
          </div>
        </div>

        {/* お気に入り一覧 */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                      {item.type === "article" ? "記事" : "イベント"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    {item.author}
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${item.type === "article" ? "board" : "news"}/${item.id}`}
                      className="flex items-center text-[#066ff2] dark:text-blue-400 font-medium text-sm hover:text-[#ec4faf] dark:hover:text-pink-400 transition-colors duration-200"
                    >
                      詳細を見る
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              {searchTerm ? "検索結果が見つかりませんでした" : "お気に入りがありません"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm
                ? "検索条件を変更してもう一度お試しください。"
                : "掲示板やニュースで気になる記事を見つけて、ハートボタンでお気に入りに追加しましょう。"}
            </p>
            <Link
              href="/board"
              className="bg-[#066ff2] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 inline-block"
            >
              掲示板を見る
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
