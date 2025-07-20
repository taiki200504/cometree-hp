"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Mic, Play, Clock, Users, ExternalLink, ArrowLeft, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CocomiyuPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "episodes" | "team">("overview")

  // ここみゆの夢ぐらしの詳細情報
  const showInfo = {
    name: "ここみゆの夢ぐらし",
    description: "心と未来をつなぐ対話番組",
    fullDescription: "私たちのペースで社会を歩くことをテーマに、心と未来をつなぐ対話番組。学生の心の健康やメンタルヘルス、そして未来への希望について深く語り合います。",
    cover: "/images/podcast/cocomiyu.jpg",
    color: "from-pink-400 to-pink-600",
    totalEpisodes: 32,
    startDate: "2023年6月",
    hosts: ["ここみゆ"],
    externalLinks: {
      youtube: "https://youtube.com/playlist?list=PLTtd12wBPw0S2FfzzPpQa9chH-P_O3j7q&si=AwpqWALvFiW206nV",
      spotify: "https://open.spotify.com/show/3Hhp09NBFgXh3fR5e3sLCn?si=11d7d1cbb6344d50",
      apple: "https://podcasts.apple.com/jp/podcast/ここみゆの夢ぐらし/id1806841907",
    },
    recentEpisodes: [
      {
        id: 1,
        title: "心の健康とコミュニティ：学生が語るメンタルヘルス",
        description: "現代の学生が抱えるメンタルヘルスの課題について、当事者の視点から語り合います。コミュニティの力で支え合う方法や、専門家からのアドバイスもお届けします。",
        date: "2025年1月12日",
        duration: "38分",
        guests: ["山田美咲（慶應義塾大学心理学研究会）", "鈴木健太（臨床心理士）"],
        tags: ["メンタルヘルス", "コミュニティ", "支援", "心理学"],
      },
      {
        id: 2,
        title: "環境問題と学生アクション：持続可能な未来への取り組み",
        description: "気候変動や環境問題に取り組む学生団体の活動を紹介し、個人レベルでできるアクションから大規模なプロジェクトまで、様々な取り組みを探ります。",
        date: "2025年1月3日",
        duration: "39分",
        guests: ["森田環（立教大学環境保護団体）", "青木みどり（環境活動家）"],
        tags: ["環境", "持続可能", "気候変動", "アクション"],
      },
      {
        id: 3,
        title: "夢を諦めない：学生起業家の挑戦と挫折",
        description: "夢を追い続ける学生起業家たちの挑戦と挫折、そして再起の物語を紹介します。失敗から学ぶことの大切さについても語り合います。",
        date: "2024年12月25日",
        duration: "42分",
        guests: ["佐藤夢（学生起業家）", "田中希望（ベンチャーキャピタリスト）"],
        tags: ["起業", "夢", "挑戦", "挫折"],
      },
    ],
    team: [
      {
        name: "ここみゆ",
        role: "MC・プロデューサー",
        description: "番組のMCを務める。心の健康やメンタルヘルスに詳しく、ゲストとの対話を通じてリスナーに寄り添う。",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    stats: [
      { label: "総エピソード数", value: "32" },
      { label: "月間リスナー数", value: "3,500+" },
      { label: "ゲスト数", value: "25+" },
      { label: "配信開始", value: "2023年6月" },
    ],
  }

  const tabs = [
    { id: "overview", label: "概要", icon: <Mic className="h-4 w-4" /> },
    { id: "episodes", label: "エピソード", icon: <Play className="h-4 w-4" /> },
    { id: "team", label: "チーム", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="UNION Podcast"
        title={showInfo.name}
        description={showInfo.description}
        primaryAction={{
          text: "出演申請する",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link",
        }}
        secondaryAction={{
          text: "ポッドキャスト一覧に戻る",
          href: "/media/podcast",
        }}
      />

      {/* 番組情報 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 番組カバー */}
            <AnimatedSection animation="fadeInUp">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                  <div className="aspect-square bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl mb-6 overflow-hidden">
                    <Image
                      src={showInfo.cover}
                      alt={showInfo.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 統計情報 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {showInfo.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* 外部リンク */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">配信プラットフォーム</h3>
                    {showInfo.externalLinks.youtube && (
                      <a
                        href={showInfo.externalLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                      >
                        YouTubeで聴く
                      </a>
                    )}
                    {showInfo.externalLinks.spotify && (
                      <a
                        href={showInfo.externalLinks.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                      >
                        Spotifyで聴く
                      </a>
                    )}
                    {showInfo.externalLinks.apple && (
                      <a
                        href={showInfo.externalLinks.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                      >
                        Apple Podcastで聴く
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* 番組詳細 */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="fadeInUp" delay={200}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">番組について</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {showInfo.fullDescription}
                  </p>

                  {/* 番組情報 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-pink-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">配信開始</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.startDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-pink-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">MC</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.hosts.join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Play className="h-5 w-5 text-pink-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">エピソード数</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.totalEpisodes}回</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-pink-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">平均配信時間</div>
                        <div className="font-medium text-gray-900 dark:text-white">35-45分</div>
                      </div>
                    </div>
                  </div>

                  {/* 特徴 */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">番組の特徴</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">心の健康とメンタルヘルスに焦点</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">専門家と当事者の対話</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">未来への希望を育む内容</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">リスナーに寄り添う温かいトーク</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* タブナビゲーション */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* タブコンテンツ */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 概要タブ */}
          {activeTab === "overview" && (
            <AnimatedSection animation="fadeInUp">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">番組概要</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    ここみゆの夢ぐらしは、「私たちのペースで社会を歩く」ことをテーマにした対話番組です。
                    現代社会のスピードに追いつけないと感じる学生たちに向けて、
                    自分のペースで生きることの大切さを伝えています。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    メンタルヘルスや心の健康に焦点を当て、専門家や当事者の声を通じて、
                    学生が抱える不安や悩みに寄り添います。
                    また、環境問題や社会課題に取り組む学生団体の活動も紹介し、
                    未来への希望を育む内容となっています。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    リスナーの皆さんが自分のペースで夢を追い続けられるよう、
                    温かく見守るような番組を目指しています。
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* エピソードタブ */}
          {activeTab === "episodes" && (
            <AnimatedSection animation="fadeInUp">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">最新エピソード</h2>
                {showInfo.recentEpisodes.map((episode, index) => (
                  <div key={episode.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-white">
                        <Play className="h-6 w-6 ml-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{episode.date}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{episode.duration}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{episode.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{episode.description}</p>
                        
                        {/* ゲスト */}
                        {episode.guests.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ゲスト</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {episode.guests.map((guest, guestIndex) => (
                                <span
                                  key={guestIndex}
                                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                                >
                                  {guest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* タグ */}
                        <div className="flex flex-wrap gap-2">
                          {episode.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* チームタブ */}
          {activeTab === "team" && (
            <AnimatedSection animation="fadeInUp">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">制作チーム</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {showInfo.team.map((member, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                          <div className="text-pink-600 dark:text-pink-400 font-medium mb-2">{member.role}</div>
                          <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
} 