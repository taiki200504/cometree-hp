"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { Video, BookOpen, Users, Zap, Target, Calendar, Clock, ExternalLink, CheckCircle } from "lucide-react"

export default function MediaGuild() {
  const [activeTab, setActiveTab] = useState("overview")

  // モックギルド活動データ
  const activities = [
    {
      id: 1,
      type: "勉強会",
      title: "映像編集マスタークラス",
      date: "2025年2月15日",
      time: "19:00-21:00",
      description: "Adobe Premiere Proを使った本格的な映像編集テクニックを学びます。",
      instructor: "田中プロデューサー（テレビ局勤務）",
      participants: 45,
      maxParticipants: 50,
      status: "募集中",
      tags: ["映像編集", "Adobe", "実践"],
    },
    {
      id: 2,
      type: "勉強会",
      title: "SNSアルゴリズム解説セミナー",
      date: "2025年2月22日",
      time: "20:00-21:30",
      description: "TikTok・Instagram・YouTubeの最新アルゴリズムを徹底解説します。",
      instructor: "佐藤マーケター（SNS運用会社）",
      participants: 38,
      maxParticipants: 40,
      status: "募集中",
      tags: ["SNS", "アルゴリズム", "マーケティング"],
    },
    {
      id: 3,
      type: "プロジェクト",
      title: "学生ドキュメンタリー制作",
      date: "進行中",
      time: "随時",
      description: "学生の挑戦を追ったドキュメンタリー映像を制作するプロジェクトです。",
      instructor: "ギルドメンバー",
      participants: 12,
      maxParticipants: 15,
      status: "参加可能",
      tags: ["ドキュメンタリー", "制作", "チーム"],
    },
    {
      id: 4,
      type: "ワークショップ",
      title: "ライティング実践講座",
      date: "2025年3月1日",
      time: "18:30-20:30",
      description: "読まれる記事の書き方とSEO対策の基本を実践的に学びます。",
      instructor: "山田ライター（フリーランス）",
      participants: 22,
      maxParticipants: 30,
      status: "募集中",
      tags: ["ライティング", "SEO", "記事"],
    },
  ]

  const resources = [
    {
      id: 1,
      title: "映像制作の基礎知識",
      type: "記事",
      url: "#",
      description: "映像制作に必要な基本的な知識をまとめた記事です。",
      tags: ["映像", "基礎", "初心者"],
      addedBy: "田中さん",
      date: "2025年1月15日",
    },
    {
      id: 2,
      title: "無料で使える動画編集ソフト10選",
      type: "記事",
      url: "#",
      description: "予算がない学生でも使える無料の動画編集ソフトを紹介。",
      tags: ["動画編集", "無料", "ソフト"],
      addedBy: "佐藤さん",
      date: "2025年1月12日",
    },
    {
      id: 3,
      title: "TikTokバズる動画の作り方",
      type: "動画",
      url: "#",
      description: "実際にバズった動画を分析して、成功の秘訣を解説。",
      tags: ["TikTok", "バズ", "分析"],
      addedBy: "鈴木さん",
      date: "2025年1月10日",
    },
    {
      id: 4,
      title: "ポッドキャスト収録のコツ",
      type: "記事",
      url: "#",
      description: "音質向上から話し方まで、ポッドキャスト収録のノウハウ。",
      tags: ["ポッドキャスト", "収録", "音質"],
      addedBy: "高橋さん",
      date: "2025年1月8日",
    },
  ]

  const benefits = [
    {
      icon: <Video className="h-8 w-8" />,
      title: "実践的なスキル習得",
      description: "現役プロから直接学べる実践的な講座とワークショップ",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "同志との出会い",
      description: "メディア・クリエイティブに興味を持つ仲間とのネットワーキング",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "実際のプロジェクト参加",
      description: "学んだスキルを実際のプロジェクトで活かす機会",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "豊富な学習リソース",
      description: "厳選された記事・動画・ツール情報の共有",
      color: "from-orange-400 to-orange-600",
    },
  ]

  const requirements = [
    "メディア・マスコミ業界に興味がある学生",
    "Podcast・動画制作に関心がある方",
    "同じ志を持つ仲間と繋がりたい方",
    "継続的に学習・成長したい意欲がある方",
  ]

  const stats = [
    { label: "アクティブメンバー", value: "180+", icon: <Users className="h-6 w-6" /> },
    { label: "月間勉強会", value: "4-6回", icon: <Calendar className="h-6 w-6" /> },
    { label: "進行中プロジェクト", value: "8個", icon: <Target className="h-6 w-6" /> },
    { label: "共有リソース", value: "200+", icon: <BookOpen className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="UNION Media Guild"
        title="Media Guild"
        description="学生クリエイターが集い「学び×実践」を加速させるオンライン・ギルドです。メディア・クリエイティブ分野での成長をサポートします。"
        primaryAction={{
          text: "ギルドに参加する",
          href: "https://join.slack.com/t/unionmediaguild/shared_invite/zt-3913ji51d-pWNxHniWT6KEZYOOGBKPXg",
        }}
        secondaryAction={{
          text: "活動内容を見る",
          href: "#activities",
        }}
      />

      {/* 統計情報 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#066ff2]">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ギルドの特徴 */}
      <section className="py-16" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-[#066ff2] dark:text-purple-400 text-sm font-medium mb-6 border border-purple-100 dark:border-purple-800">
              Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">ギルド参加のメリット</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Media Guildで得られる4つの主要なメリット</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className={`bg-gradient-to-br ${benefit.color} p-4 rounded-xl w-fit mx-auto mb-6`}>
                  <div className="text-white">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* タブナビゲーション */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800" id="activities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "overview"
                    ? "bg-[#066ff2] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                活動・イベント
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "resources"
                    ? "bg-[#066ff2] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                学習リソース
              </button>
            </div>
          </div>

          {/* 活動・イベントタブ */}
          {activeTab === "overview" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">今後の活動・イベント</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  定期的な勉強会とプロジェクトで実践的なスキルを身につけましょう
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activity.type === "勉強会"
                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                            : activity.type === "プロジェクト"
                              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400"
                              : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        {activity.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.status === "募集中"
                            ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400"
                            : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{activity.title}</h4>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {activity.date}
                      {activity.time !== "随時" && (
                        <>
                          <Clock className="h-4 w-4 ml-4 mr-2" />
                          {activity.time}
                        </>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {activity.description}
                    </p>

                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <strong>講師:</strong> {activity.instructor}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-1" />
                        {activity.participants}/{activity.maxParticipants}名
                      </div>
                      <button className="bg-[#066ff2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                        詳細を見る
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 学習リソースタブ */}
          {activeTab === "resources" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">学習リソース</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  メンバーが厳選した有益な記事・動画・ツール情報を共有しています
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          resource.type === "記事"
                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                            : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{resource.date}</span>
                    </div>

                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{resource.title}</h4>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">共有者: {resource.addedBy}</span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#066ff2] dark:text-blue-400 hover:text-[#ec4faf] dark:hover:text-pink-400 text-sm font-medium"
                      >
                        リンクを開く
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 参加要件 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">参加要件</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">以下のいずれかに当てはまる学生の方を歓迎します</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 参加CTA */}
      <section className="py-16 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Zap className="h-16 w-16 text-white mx-auto mb-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">今すぐMedia Guildに参加しよう</h2>
          <p className="text-xl text-white/90 mb-8">
            学び×実践で、あなたのクリエイティブスキルを
            <br />
            次のレベルへ押し上げませんか？
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://join.slack.com/t/unionmediaguild/shared_invite/zt-3913ji51d-pWNxHniWT6KEZYOOGBKPXg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#066ff2] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <ExternalLink className="mr-3 h-6 w-6" />
              ギルドに参加する
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#066ff2] transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              質問・相談する
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">※ 参加は無料です。学生であることの確認が必要な場合があります。</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
