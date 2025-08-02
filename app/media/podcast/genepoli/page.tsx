"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Mic, Play, Clock, Users, ExternalLink, ArrowLeft, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"

export default function GenepoliPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "episodes" | "team">("overview")

  // ジェネポリの詳細情報
  const showInfo = {
    name: "ジェネポリ",
    description: "Z世代の政治・社会問題討論番組",
    fullDescription: "政治って、私が作るんだ。Z世代が実践する新しい社会参画の方法について議論し、従来の政治参加の枠を超えた新しい社会参画の形を探求します。",
    cover: "/images/podcast/genepoli.png",
    color: "from-purple-400 to-purple-600",
    totalEpisodes: 28,
    startDate: "2023年8月",
    hosts: ["東坂", "中村大輔"],
    externalLinks: {
      youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0QxkWwZKDNVKnQRHn6D22OD",
      spotify: "https://open.spotify.com/show/51ymNzm9X9UnSevjnH7uOZ?si=ac400f16f51d4495",
      apple: null,
    },
    recentEpisodes: [
      {
        id: 1,
        title: "Z世代が考える政治参加の新しい形",
        description: "従来の政治参加の枠を超えて、Z世代が実践する新しい社会参画の方法について議論します。SNSを活用した政治活動や、学生による政策提言の事例を紹介します。",
        date: "2025年1月10日",
        duration: "52分",
        guests: ["高橋リナ（明治大学政治研究会）", "中村大輔（学生政治団体代表）"],
        tags: ["政治", "Z世代", "社会参画", "SNS"],
      },
      {
        id: 2,
        title: "デジタルデモクラシー：オンライン投票の可能性と課題",
        description: "デジタル技術を活用した民主主義の新しい形について、オンライン投票やデジタル市民参加の可能性と課題を探ります。",
        date: "2024年12月20日",
        duration: "49分",
        guests: ["佐藤デジタル（IT政策専門家）", "田中未来（デジタル投票推進団体）"],
        tags: ["デジタル", "投票", "民主主義", "IT"],
      },
      {
        id: 3,
        title: "学生自治と大学改革：キャンパス民主主義の実践",
        description: "大学内での学生自治や大学改革について、実際に学生自治会で活動する学生たちの声を聞き、キャンパス民主主義の実践例を紹介します。",
        date: "2024年12月10日",
        duration: "45分",
        guests: ["山田学生（学生自治会会長）", "鈴木教授（政治学）"],
        tags: ["学生自治", "大学改革", "民主主義", "キャンパス"],
      },
    ],
    team: [
      {
        name: "高橋リナ",
        role: "MC・政治担当",
        description: "明治大学政治研究会所属。Z世代の政治参加について詳しく、若者の政治意識向上を目指す。",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "中村大輔",
        role: "MC・社会問題担当",
        description: "学生政治団体代表。社会問題に詳しく、政策提言活動を積極的に行っている。",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    stats: [
      { label: "総エピソード数", value: "28" },
      { label: "月間リスナー数", value: "2,800+" },
      { label: "政策提言数", value: "15+" },
      { label: "配信開始", value: "2023年8月" },
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
                  <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mb-6 overflow-hidden">
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
                    {!showInfo.externalLinks.apple && (
                      <div className="text-center py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-500 dark:text-gray-400">
                        Apple Podcast準備中
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
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">配信開始</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.startDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">MC</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.hosts.join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Play className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">エピソード数</div>
                        <div className="font-medium text-gray-900 dark:text-white">{showInfo.totalEpisodes}回</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-500" />
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
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">Z世代の政治参加に焦点</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">新しい社会参画の方法を探求</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">政策提言活動の紹介</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">専門家と学生の対話</span>
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
                    ? "bg-purple-600 text-white shadow-lg"
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
                    ジェネポリは、「政治って、私が作るんだ」をテーマにしたZ世代向けの政治・社会問題討論番組です。
                    従来の政治参加の枠を超えて、Z世代が実践する新しい社会参画の方法について議論し、
                    若者が政治に関心を持ち、実際に行動を起こすきっかけを提供します。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    SNSを活用した政治活動や、学生による政策提言の事例を紹介し、
                    デジタル技術を活用した新しい民主主義の形についても探求します。
                    また、大学内での学生自治や大学改革についても取り上げ、
                    キャンパス民主主義の実践例を紹介しています。
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    政治を身近に感じ、自分たちの手で社会を変えていけることを
                    リスナーの皆さんに伝えることを目指しています。
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
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white">
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
                              className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs"
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
                          <div className="text-purple-600 dark:text-purple-400 font-medium mb-2">{member.role}</div>
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