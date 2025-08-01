"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Clock, Users, Mic, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PodcastPage() {
  // ポッドキャスト番組データ
  const podcastShows = [
    {
      id: "yuniraji",
      name: "ユニラジ",
      description: "学生の声を届けるトークバラエティ番組",
      cover: "/images/podcast/yuniraji.JPG",
      color: "from-blue-400 to-blue-600",
      totalEpisodes: 45,
      detailUrl: "/media/podcast/yuniraji",
      externalLinks: {
        youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0TF7cUSGN_QSK56pnV4Ryld",
        spotify: "https://open.spotify.com/episode/06ZEBrT8NzRk02jSkcx2pl?si=04931c607b524a2f",
        apple: "https://podcasts.apple.com/jp/podcast/学生団体unionのユニラジ/id1773603325",
      },
    },
    {
      id: "cocomiyu",
      name: "ここみゆの夢ぐらし",
      description: "心と未来をつなぐ対話番組",
      cover: "/images/podcast/cocomiyu.jpg",
      color: "from-pink-400 to-pink-600",
      totalEpisodes: 32,
      detailUrl: "/media/podcast/cocomiyu",
      externalLinks: {
        youtube: "https://youtube.com/playlist?list=PLTtd12wBPw0S2FfzzPpQa9chH-P_O3j7q&si=AwpqWALvFiW206nV",
        spotify: "https://open.spotify.com/show/3Hhp09NBFgXh3fR5e3sLCn?si=11d7d1cbb6344d50",
        apple: "https://podcasts.apple.com/jp/podcast/ここみゆの夢ぐらし/id1806841907",
      },
    },
    {
      id: "genepoli",
      name: "ジェネポリ",
      description: "Z世代の政治・社会問題討論番組",
      cover: "/images/podcast/genepoli.png",
      color: "from-purple-400 to-purple-600",
      totalEpisodes: 28,
      detailUrl: "/media/podcast/genepoli",
      externalLinks: {
        youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0QxkWwZKDNVKnQRHn6D22OD",
        spotify: "https://open.spotify.com/show/51ymNzm9X9UnSevjnH7uOZ?si=ac400f16f51d4495",
        apple: null, // 現状なし
      },
    },
    {
      id: "career",
      name: "キャリアみっけ隊",
      description: "学生のキャリア形成支援番組",
      cover: "/images/podcast/career.png",
      color: "from-green-400 to-green-600",
      totalEpisodes: 21,
      detailUrl: "/media/podcast/career",
      externalLinks: {
        youtube: null, // 現状なし
        spotify: null, // 現状なし
        apple: null, // 現状なし
      },
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="UNION Podcast"
        title="ポッドキャスト"
        description="学生の声を届けるUNIONのポッドキャスト番組。多様なテーマで学生の想いや活動を発信しています。"
        primaryAction={{
          text: "出演申請する",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link",
        }}
        secondaryAction={{
          text: "メディア事業に戻る",
          href: "/media",
        }}
      />

      {/* 番組紹介 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
              Our Shows
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">番組紹介</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              UNIONが制作する4つのポッドキャスト番組をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {podcastShows.map((show) => (
              <div
                key={show.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* アートカバー */}
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={show.cover}
                    alt={show.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{show.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{show.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{show.totalEpisodes}エピソード</span>
                  </div>
                  
                  {/* 詳細リンク */}
                  <div className="mb-4">
                    <Link
                      href={show.detailUrl}
                      className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium text-sm transition-colors duration-300"
                    >
                      詳細を見る
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  {/* 外部リンクCTA */}
                  <div className="space-y-2">
                    {show.externalLinks.youtube && (
                      <a
                        href={show.externalLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300"
                      >
                        YouTubeで聴く
                      </a>
                    )}
                    {show.externalLinks.spotify && (
                      <a
                        href={show.externalLinks.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300"
                      >
                        Spotifyで聴く
                      </a>
                    )}
                    {show.externalLinks.apple && (
                      <a
                        href={show.externalLinks.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300"
                      >
                        Apple Podcastで聴く
                      </a>
                    )}
                    {!show.externalLinks.youtube && !show.externalLinks.spotify && !show.externalLinks.apple && (
                      <div className="text-center py-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-500 dark:text-gray-400">
                        配信準備中
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA セクション */}
      <section className="py-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">出演しませんか？</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            あなたの学生団体の活動や想いを、UNIONのポッドキャスト番組で発信しませんか？
            出演希望の方は、以下のフォームからお申し込みください。
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            出演申請する
            <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
} 