"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Mic, Play, Clock, Users, ExternalLink, ArrowLeft, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "episodes" | "team">("overview")

  // キャリアみっけ隊の詳細情報
  const showInfo = {
    name: "キャリアみっけ隊",
    description: "学生のキャリア形成支援番組",
    fullDescription: "学生のキャリア形成を支援するポッドキャスト番組。様々な業界で活躍する先輩たちの体験談や、キャリア選択のアドバイスを通じて、学生の将来設計をサポートします。",
    cover: "/images/podcast/career.png",
    color: "from-green-400 to-green-600",
    totalEpisodes: 21,
    startDate: "2023年6月",
    hosts: ["山田太郎", "佐藤花子"],
    externalLinks: {
      youtube: null, // 現状なし
      spotify: null, // 現状なし
      apple: null, // 現状なし
    },
    recentEpisodes: [
      {
        id: 1,
        title: "IT業界で働くということ：エンジニアのリアル",
        description: "大手IT企業で働くエンジニアの先輩に、実際の仕事内容やキャリアパスについて詳しく聞きました。学生時代にやっておくべきことや、業界の最新トレンドも紹介します。",
        date: "2024年12月20日",
        duration: "52分",
        guests: ["田中一郎（Google Japan）", "鈴木美咲（フリーランスエンジニア）"],
        tags: ["IT", "エンジニア", "キャリア", "技術"],
      },
      {
        id: 2,
        title: "起業家への道：学生起業の成功と失敗",
        description: "学生時代に起業した先輩たちが、起業のきっかけから現在に至るまでの道のりを赤裸々に語ります。",
        date: "2024年12月10日",
        duration: "48分",
        guests: ["伊藤翔太（株式会社StartUp代表）", "小林あゆみ（フリーランスデザイナー）"],
        tags: ["起業", "スタートアップ", "体験談", "キャリア"],
      },
      {
        id: 3,
        title: "公務員試験対策：合格への道のり",
        description: "公務員試験に合格した先輩に、勉強方法や面接対策について詳しく聞きました。",
        date: "2024年11月30日",
        duration: "45分",
        guests: ["高橋健太（国家公務員）", "中村優子（地方公務員）"],
        tags: ["公務員", "試験対策", "面接", "キャリア"],
      },
    ],
    team: [
      {
        name: "山田太郎",
        role: "MC",
        description: "キャリアコンサルタントとして活動。学生のキャリア相談を担当。",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "佐藤花子",
        role: "MC",
        description: "人事コンサルタント。企業の採用活動にも詳しい。",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    stats: [
      { label: "総エピソード数", value: "21" },
      { label: "月間リスナー数", value: "3,000+" },
      { label: "ゲスト数", value: "40+" },
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
                  <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-xl mb-6 overflow-hidden">
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
                    {!showInfo.externalLinks.youtube && !showInfo.externalLinks.spotify && !showInfo.externalLinks.apple && (
                      <div className="text-center py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-500 dark:text-gray-400">
                        配信準備中
                      </div>
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
                      <Calendar className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">配信開始</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.startDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">MC</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.hosts.join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Play className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">エピソード数</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.totalEpisodes}回</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">平均配信時間</div>
                        <div className="font-medium text-gray-900 dark:text-white">45-55分</div>
                      </div>
                    </div>
                  </div>

                  {/* 特徴 */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">番組の特徴</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">様々な業界の先輩による体験談</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">実践的なキャリアアドバイス</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">業界の最新トレンド情報</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">学生のキャリア相談にも対応</span>
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
                    ? "bg-green-600 text-white shadow-lg"
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
                    キャリアみっけ隊は、学生のキャリア形成を支援することを目的としたポッドキャスト番組です。
                    様々な業界で活躍する先輩たちの体験談や、キャリア選択のアドバイスを通じて、
                    学生の将来設計をサポートします。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    毎回、IT、金融、製造、公務員など様々な業界で働く先輩をゲストに迎え、
                    実際の仕事内容やキャリアパス、学生時代にやっておくべきことなどについて
                    詳しくお話を伺います。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    また、キャリアコンサルタントのMCが、学生のキャリア相談にも対応し、
                    実践的なアドバイスを提供します。学生の皆さんのキャリア選択の参考にしていただける番組です。
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
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white">
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
                              className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-xs"
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
                          <div className="text-green-600 dark:text-green-400 font-medium mb-2">{member.role}</div>
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