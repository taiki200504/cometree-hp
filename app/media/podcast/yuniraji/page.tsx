"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Mic, Play, Clock, Users, ExternalLink, ArrowLeft, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"

export default function YunirajiPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "episodes" | "team">("overview")

  // ユニラジの詳細情報
  const showInfo = {
    name: "ユニラジ",
    description: "学生の声を届けるトークバラエティ番組",
    fullDescription: "双子MCが学生団体の活動を深掘り取材する人気ポッドキャスト。学生のリアルな声を社会に届け、学生団体の活動をより多くの人に知ってもらうことを目指しています。",
    cover: "/images/podcast/yuniraji.JPG",
    color: "from-blue-400 to-blue-600",
    totalEpisodes: 29,
    startDate: "2024年7月",
    hosts: ["小池杏奈", "小池凜奈"],
    externalLinks: {
      youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0TF7cUSGN_QSK56pnV4Ryld",
      spotify: "https://open.spotify.com/episode/06ZEBrT8NzRk02jSkcx2pl?si=04931c607b524a2f",
      apple: "https://podcasts.apple.com/jp/podcast/学生団体unionのユニラジ/id1773603325",
    },
    recentEpisodes: [
      {
        id: 1,
        title: "新年特別企画：2025年の学生団体トレンド予測",
        description: "2025年最初の配信では、今年注目される学生団体の活動トレンドについて深掘りします。AI活用、サステナビリティ、グローバル連携など、様々な観点から分析します。",
        date: "2025年1月15日",
        duration: "45分",
        guests: ["田中太郎（東京大学起業サークル）", "佐藤花子（早稲田大学国際交流サークル）"],
        tags: ["トレンド", "予測", "2025年", "学生団体"],
      },
      {
        id: 2,
        title: "国際交流の新時代：オンラインで広がる学生の輪",
        description: "コロナ禍を経て変化した国際交流の形について、オンラインツールを活用した新しい交流方法や、バーチャル留学の可能性について探ります。",
        date: "2025年1月5日",
        duration: "43分",
        guests: ["ジョン・スミス（交換留学生）", "田村さくら（国際交流団体代表）"],
        tags: ["国際交流", "オンライン", "留学", "バーチャル"],
      },
      {
        id: 3,
        title: "学生起業のリアル：成功と失敗の分岐点",
        description: "実際に学生時代に起業した先輩たちが、起業の動機から現在に至るまでの道のりを赤裸々に語ります。",
        date: "2024年12月28日",
        duration: "48分",
        guests: ["伊藤翔太（株式会社StartUp代表）", "小林あゆみ（フリーランスデザイナー）"],
        tags: ["起業", "スタートアップ", "体験談", "キャリア"],
      },
    ],
    team: [
      {
        name: "田中太郎",
        role: "MC",
        description: "双子の兄。学生団体の活動に詳しく、インタビューを担当。",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "田中花子",
        role: "MC",
        description: "双子の妹。番組の企画・構成を担当。",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    stats: [
      { label: "総エピソード数", value: "45" },
      { label: "月間リスナー数", value: "5,000+" },
      { label: "取材団体数", value: "30+" },
      { label: "配信開始", value: "2023年4月" },
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
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 overflow-hidden">
                    <NextImage
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
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">配信開始</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.startDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">MC</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.hosts.join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Play className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">エピソード数</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.totalEpisodes}回</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">平均配信時間</div>
                        <div className="font-medium text-gray-900 dark:text-white">40-50分</div>
                      </div>
                    </div>
                  </div>

                  {/* 特徴 */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">番組の特徴</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">双子MCによる親しみやすいトーク</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">学生団体の活動を深掘り取材</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">ゲストとの対話を通じた学び</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">学生のリアルな声を社会に発信</span>
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
                    ? "bg-blue-600 text-white shadow-lg"
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
                    ユニラジは、学生の声を社会に届けることを目的としたトークバラエティ番組です。
                    双子MCの田中太郎・花子が、全国各地の学生団体の活動を取材し、
                    学生のリアルな想いや活動の裏側を深掘りしていきます。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    毎回、様々な分野で活躍する学生団体の代表者やメンバーをゲストに迎え、
                    活動のきっかけから現在の取り組み、そして未来への展望まで、
                    幅広いテーマで対話を展開します。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    学生の視点から見た社会課題や、学生団体ならではの取り組みを通じて、
                    リスナーの皆さんに新しい発見や学びを提供することを目指しています。
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
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white">
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
                              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs"
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
                          <NextImage
                            src={member.image}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                          <div className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</div>
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