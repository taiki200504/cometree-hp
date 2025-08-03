"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import FavoriteButton from "@/components/favorite-button"
import {
  Search,
  Users,
  Calendar,
  Handshake,
  GraduationCap,
  Briefcase,
  MessageSquare,
  ChevronRight,
  Filter,
  SortAsc,
  Heart,
} from "lucide-react"
import { getBoardPosts } from "@/lib/api"
import { BoardPost } from "@/types/board"

export default function Board() {
  const [activeCategory, setActiveCategory] = useState("すべて")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "title" | "author">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [boardItems, setBoardItems] = useState<BoardPost[]>([])

  useEffect(() => {
    const fetchBoardPosts = async () => {
      try {
        const result = await getBoardPosts()
        setBoardItems(result.posts || [])
      } catch (error) {
        console.error('Error fetching board posts:', error)
        setBoardItems([])
      }
    }
    fetchBoardPosts()
  }, [])

  const categories = [
    {
      id: "event",
      name: "イベント告知",
      icon: <Calendar className="h-8 w-8" />,
      description: "学生団体主催のイベントや勉強会の告知",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "recruit",
      name: "メンバー募集",
      icon: <Users className="h-8 w-8" />,
      description: "新メンバーやボランティアの募集情報",
      color: "from-green-400 to-green-600",
    },
    {
      id: "collab",
      name: "コラボ募集",
      icon: <Handshake className="h-8 w-8" />,
      description: "他団体との協力プロジェクトの募集",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "skill",
      name: "スキルアップ",
      icon: <GraduationCap className="h-8 w-8" />,
      description: "勉強会やワークショップの開催情報",
      color: "from-orange-400 to-orange-600",
    },
    {
      id: "career",
      name: "就活・キャリア",
      icon: <Briefcase className="h-8 w-8" />,
      description: "就職活動やキャリア支援に関する情報",
      color: "from-pink-400 to-pink-600",
    },
    {
      id: "other",
      name: "その他",
      icon: <MessageSquare className="h-8 w-8" />,
      description: "上記以外の様々な情報や相談",
      color: "from-gray-400 to-gray-600",
    },
  ]

  const filteredItems = boardItems
    .filter((item) => {
      const matchesCategory = activeCategory === "すべて" || item.category === activeCategory
      const matchesSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags && Array.isArray(item.tags) && item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "date":
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "author":
          comparison = a.author.localeCompare(b.author)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Student Community Board"
        title="UNION掲示板"
        description="学生団体をつなぐ情報の場にする。UNION掲示板は学生団体の情報交換・交流のプラットフォームです。"
        primaryCTA={{
          text: "投稿を依頼する",
          href: "https://forms.gle/9czvypxEcyi7BxS1A",
        }}
        secondaryCTA={{
          text: "コミュニティに参加",
          href: "/join",
        }}
      />

      {/* 検索セクション */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-[#066ff2] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">さあ、探しに行こう</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">あなたの興味に合った情報を見つけてください</p>

            {/* 検索バー */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="キーワード、タグ、投稿者で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#066ff2] focus:border-transparent shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* ソート機能 */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">並び替え:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "title" | "author")}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="date">投稿日</option>
                  <option value="title">タイトル</option>
                  <option value="author">投稿者</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title={sortOrder === "asc" ? "昇順" : "降順"}
                >
                  <SortAsc className={`h-4 w-4 text-gray-500 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* カテゴリーカード */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  activeCategory === category.name ? "ring-4 ring-[#066ff2]" : ""
                }`}
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 sm:p-8 text-white`}>
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl mr-3 sm:mr-4">{category.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold">{category.name}</h3>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 記事一覧セクション */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-[#066ff2] mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">記事一覧</h2>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/board/favorites"
                className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-200"
              >
                <Heart className="h-5 w-5 mr-2" />
                お気に入りを見る
              </Link>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {filteredItems.length}件の投稿
                {activeCategory !== "すべて" && <span className="ml-2 text-[#066ff2]">（{activeCategory}）</span>}
              </div>
            </div>
          </div>

          {/* 記事カード */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <Link key={item.id} href={`/board/${item.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <FavoriteButton
                        item={{
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          date: item.created_at,
                          author: item.author,
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.created_at).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <span>{item.author}</span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags && Array.isArray(item.tags) && item.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-[#066ff2] dark:text-blue-400 font-medium text-sm">
                      詳細を見る
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 記事がない場合 */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">投稿が見つかりませんでした</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">検索条件を変更してもう一度お試しください。</p>
              <button
                onClick={() => {
                  setActiveCategory("すべて")
                  setSearchTerm("")
                }}
                className="bg-[#066ff2] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                すべての投稿を表示
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 投稿募集CTA */}
      <section className="py-20 bg-gradient-to-br from-[#066ff2] to-[#ec4faf] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">あなたも投稿してみませんか？</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            イベント告知、メンバー募集、コラボ募集など、
            <br />
            学生団体の活動を広く発信しましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.gle/9czvypxEcyi7BxS1A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#066ff2] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <MessageSquare className="mr-3 h-6 w-6" />
              投稿を依頼する
            </a>
            <a
              href="/join"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#066ff2] transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <Users className="mr-3 h-6 w-6" />
              コミュニティに参加
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
