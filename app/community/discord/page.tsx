"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { MessageSquare, Users, Hash, ExternalLink } from "lucide-react"
import Link from "next/link"

const DISCORD_INVITE_URL = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || ""

export default function DiscordCommunityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Discord"
        title="Discordコミュニティ"
        description="UNIONのDiscordサーバーで学生同士の交流や情報共有をしませんか？"
        primaryAction={
          DISCORD_INVITE_URL
            ? { text: "Discordに参加する", href: DISCORD_INVITE_URL }
            : undefined
        }
        secondaryAction={{ text: "コミュニティ概要へ", href: "/community" }}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {DISCORD_INVITE_URL ? (
            <>
              <div className="bg-gradient-to-r from-[#5865F2] to-[#7289da] rounded-3xl p-12 text-white text-center mb-12">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <MessageSquare className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-bold mb-6">Discordでつながろう</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  学生限定のDiscordサーバーでは、チャンネルごとにテーマを分けて交流しています。
                  イベント情報の共有や雑談、勉強会の企画などにご活用ください。
                </p>
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-[#5865F2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Discordに参加する
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-[#5865F2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">学生同士の交流</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      全国の学生団体メンバーと気軽にやり取りできます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                    <Hash className="h-6 w-6 text-[#5865F2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">テーマ別チャンネル</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      興味や目的に合わせてチャンネルを選べます。
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-12 text-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
                <MessageSquare className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">準備中です</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
                UNIONのDiscordコミュニティは現在準備中です。公開までしばらくお待ちください。
                学生向けのSlackコミュニティもございますので、あわせてご利用ください。
              </p>
              <Link
                href="/community/slack"
                className="inline-flex items-center bg-[#066ff2] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Slackコミュニティを見る
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
