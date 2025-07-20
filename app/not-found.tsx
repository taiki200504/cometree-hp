"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">ページが見つかりません</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。URLをご確認いただくか、以下のリンクからお探しください。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#066ff2] hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="mr-2 h-5 w-5" />
            ホームに戻る
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            前のページに戻る
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            お探しのコンテンツはこちらかもしれません
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <Link href="/news" className="text-[#066ff2] dark:text-blue-400 hover:underline">
              ニュース・お知らせ
            </Link>
            <Link href="/community" className="text-[#066ff2] dark:text-blue-400 hover:underline">
              コミュニティ
            </Link>
            <Link href="/board" className="text-[#066ff2] dark:text-blue-400 hover:underline">
              掲示板
            </Link>
            <Link href="/media" className="text-[#066ff2] dark:text-blue-400 hover:underline">
              メディア
            </Link>
            <Link href="/about" className="text-[#066ff2] dark:text-blue-400 hover:underline">
              UNIONについて
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
