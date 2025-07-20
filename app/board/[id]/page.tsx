"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FavoriteButton from "@/components/favorite-button"
import { Calendar, User, Tag, ArrowLeft, Share2, ExternalLink } from "lucide-react"

interface BoardItemDetailProps {
  params: {
    id: string
  }
}

// モック記事データ（実際はAPIから取得）
const getBoardItem = (id: string) => {
  const boardItems = [
    {
      id: 1,
      title: "第3回学生団体合同イベント開催のお知らせ",
      content: `
        <h2>イベント概要</h2>
        <p>来月開催予定の学生団体合同イベントについてお知らせいたします。今回は「SDGs×学生の挑戦」をテーマに、環境問題に取り組む学生団体が集結します。</p>
        
        <h3>開催詳細</h3>
        <ul>
          <li><strong>日時：</strong>2025年2月15日（土）13:00-17:00</li>
          <li><strong>場所：</strong>東京国際フォーラム ホールE</li>
          <li><strong>参加費：</strong>無料</li>
          <li><strong>定員：</strong>300名</li>
        </ul>
        
        <h3>プログラム内容</h3>
        <p>持続可能な社会の実現に向けて、学生ができることを一緒に考えませんか？以下のようなプログラムを予定しています：</p>
        <ul>
          <li>基調講演：「Z世代が描く持続可能な未来」</li>
          <li>パネルディスカッション：学生団体の環境への取り組み</li>
          <li>ワークショップ：アクションプラン作成</li>
          <li>ネットワーキングタイム</li>
        </ul>
        
        <h3>参加申込</h3>
        <p>参加をご希望の方は、以下のフォームからお申し込みください。</p>
        <p><a href="https://forms.gle/example" target="_blank" rel="noopener noreferrer">申込フォームはこちら</a></p>
        
        <h3>お問い合わせ</h3>
        <p>ご質問等ございましたら、gakusei.union226@gmail.com までお気軽にお問い合わせください。</p>
      `,
      date: "2025年1月20日",
      category: "イベント告知",
      author: "UNION運営事務局",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["イベント", "SDGs", "環境", "合同開催"],
      views: 245,
      contact: "gakusei.union226@gmail.com",
    },
    {
      id: 2,
      title: "プログラミング勉強会メンバー募集中！",
      content: `
        <h2>勉強会について</h2>
        <p>初心者歓迎のプログラミング勉強会を開催します。Web開発の基礎から学べる内容となっており、経験豊富な先輩がサポートします。</p>
        
        <h3>学習内容</h3>
        <p>HTML、CSS、JavaScriptから始めて、最終的にはWebアプリケーションの作成を目指します。</p>
        <ul>
          <li>HTML/CSS基礎</li>
          <li>JavaScript基礎</li>
          <li>React入門</li>
          <li>バックエンド開発（Node.js）</li>
          <li>データベース（MongoDB）</li>
        </ul>
        
        <h3>開催スケジュール</h3>
        <ul>
          <li><strong>頻度：</strong>毎週土曜日 14:00-17:00</li>
          <li><strong>期間：</strong>3ヶ月間（全12回）</li>
          <li><strong>場所：</strong>東京大学本郷キャンパス</li>
        </ul>
        
        <h3>参加条件</h3>
        <ul>
          <li>プログラミング初心者歓迎</li>
          <li>ノートPCを持参できる方</li>
          <li>継続的に参加できる方</li>
        </ul>
        
        <h3>申込方法</h3>
        <p>参加をご希望の方は、以下の情報を記載してメールでお申し込みください：</p>
        <ul>
          <li>お名前</li>
          <li>所属大学・学年</li>
          <li>プログラミング経験</li>
          <li>参加動機</li>
        </ul>
      `,
      date: "2025年1月18日",
      category: "メンバー募集",
      author: "東京大学プログラミング研究会",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["プログラミング", "勉強会", "初心者歓迎", "Web開発"],
      views: 189,
      contact: "programming@example.com",
    },
  ]

  return boardItems.find((item) => item.id === Number.parseInt(id))
}

export default function BoardItemDetail({ params }: BoardItemDetailProps) {
  const item = getBoardItem(params.id)

  if (!item) {
    notFound()
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
              {item.date}
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
                  date: item.date,
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
                <span className="font-medium">{item.author}</span>
              </div>
              <a
                href={`mailto:${item.contact}`}
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
