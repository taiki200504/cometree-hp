"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FavoriteButton from "@/components/favorite-button"
import { Calendar, User, Tag, ArrowLeft, Share2, ExternalLink } from "lucide-react"
import { getBoardPostById } from "@/lib/api"
import { BoardPost } from "@/types/board"

interface BoardItemDetailProps {
  params: {
    id: string
  }
}

export default function BoardItemDetail({ params }: BoardItemDetailProps) {
  const [item, setItem] = useState<BoardPost | null>(null)

  useEffect(() => {
    const fetchBoardPost = async () => {
      const post = await getBoardPostById(params.id)
      setItem(post)
    }
    fetchBoardPost()
  }, [params.id])

  if (!item) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Link
            href="/board"
            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            掲示板に戻る
          </Link>
        </div>

        {/* 記事ヘッダー */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {item.category}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(item.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-1" />
              {item.author}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  <Tag className="h-3 w-3 mr-1 inline" />#{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <FavoriteButton
                item={{
                  id: item.id,
                  title: item.title,
                  category: item.category,
                  date: item.created_at,
                  author: item.author,
                }}
              />
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: item.title,
                      text: item.title,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert("URLをコピーしました")
                  }
                }}
                className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
                title="シェア"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* メイン画像 */}
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl mb-8 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-500">記事画像</div>
        </div>

        {/* 記事本文 */}
        <article className="prose prose-lg max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="text-gray-700 leading-relaxed"
            style={{
              lineHeight: "1.8",
            }}
          />
        </article>

        {/* 記事フッター */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">お問い合わせ</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{item.author || '不明'}</span>
              </div>
              <a
                href={`mailto:${item.author || ''}`}
                className="inline-flex items-center bg-[#066ff2] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                メールで問い合わせ
              </a>
            </div>
          </div>
        </footer>

        {/* 関連記事 */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 関連記事のモックデータ */}
            {[1, 2].map((relatedId) => (
              <Link key={relatedId} href={`/board/${relatedId + 10}`}>
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4"></div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    {relatedId === 1 ? "スキルアップ" : "コラボ募集"}
                  </span>
                  <h4 className="font-semibold text-gray-900 mt-2 mb-2">
                    {relatedId === 1 ? "デザイン思考ワークショップ開催" : "国際交流イベントでのコラボ団体募集"}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {relatedId === 1
                      ? "デザイン思考の基礎を学べるワークショップを開催します。"
                      : "3月に開催予定の国際交流イベントで、一緒に企画・運営を行ってくれる学生団体を募集しています。"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
