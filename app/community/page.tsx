"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Users, Building, Handshake, MessageSquare, ExternalLink, ArrowRight, Globe, Heart, MapPin } from "lucide-react"
import Link from "next/link"
import { useStats } from "@/hooks/use-stats"

export default function CommunityPage() {
  const { stats, loading } = useStats()

  const statsData = [
    { number: loading ? "—" : stats?.organizationCount ?? 0, label: "加盟団体", icon: Users },
    { number: loading ? "—" : stats?.memberCount ?? 0, label: "参加学生", icon: Heart },
    { number: loading ? "—" : stats?.partnerCount ?? 0, label: "提携企業", icon: Building },
    { number: loading ? "—" : stats?.prefectureCount ?? 0, label: "都道府県", icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />

      <ModernHero
        subtitle="Community"
        title="コミュニティ"
        description="全国の学生団体と企業がつながる学生コミュニティ。加盟団体・提携企業の一覧や参加方法をご案内します。"
        primaryAction={{ text: "加盟団体一覧", href: "/community/organizations" }}
        secondaryAction={{ text: "提携企業一覧", href: "/community/partners" }}
      />

      <main className="union-section">
        <div className="union-container">
          {/* 数字 */}
          <AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
              {statsData.map((stat, i) => (
                <div key={i} className="union-card text-center">
                  <div className="text-2xl font-semibold text-[var(--union-text)]">{stat.number}</div>
                  <div className="union-body text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* 加盟団体・提携企業への導線（カード化） */}
          <AnimatedSection>
            <SectionHeading
              label="Directory"
              title="加盟団体・提携企業"
              description="加盟団体一覧と提携企業一覧から、活動内容や連携先をご確認いただけます。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              <Link
                href="/community/organizations"
                className="union-card group flex items-start gap-5 hover:border-[#066ff2]/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center shrink-0">
                  <Building className="h-6 w-6 text-[#066ff2]" />
                </div>
                <div>
                  <h3 className="union-heading-card text-lg mb-1">加盟団体一覧</h3>
                  <p className="union-body text-sm">
                    全国の加盟学生団体を一覧でご覧いただけます。活動分野・地域で検索可能です。
                  </p>
                  <span className="union-link text-sm font-medium mt-3 inline-flex items-center gap-1">
                    一覧を見る
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
              <Link
                href="/community/partners"
                className="union-card group flex items-start gap-5 hover:border-[#ec4faf]/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ec4faf]/10 flex items-center justify-center shrink-0">
                  <Handshake className="h-6 w-6 text-[#ec4faf]" />
                </div>
                <div>
                  <h3 className="union-heading-card text-lg mb-1">提携企業一覧</h3>
                  <p className="union-body text-sm">
                    UNIONと提携・協賛いただいている企業・団体の一覧です。
                  </p>
                  <span className="union-link text-sm font-medium mt-3 inline-flex items-center gap-1">
                    一覧を見る
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          </AnimatedSection>

          {/* Slack・Discord・ポータル：目的と参加条件が伝わる */}
          <AnimatedSection>
            <SectionHeading
              label="Join"
              title="参加の方法"
              description="学生向けコミュニティ（Slack）と、団体向けポータルをご用意しています。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Link
                href="/community/slack"
                className="union-card hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <MessageSquare className="h-6 w-6 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">Slackコミュニティ</h3>
                <p className="union-body text-sm">
                  学生限定。イベント告知・情報交換・質問ができるチャンネルです。参加は無料です。
                </p>
                <span className="union-link text-sm font-medium mt-3 inline-flex items-center gap-1">
                  Slackに参加
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/community/discord"
                className="union-card hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <MessageSquare className="h-6 w-6 text-[#5865F2] mb-4" />
                <h3 className="union-heading-card mb-2">Discord</h3>
                <p className="union-body text-sm">
                  学生・加盟団体向けの交流サーバー。用途に応じてご参加ください。
                </p>
                <span className="union-link text-sm font-medium mt-3 inline-flex items-center gap-1">
                  Discordへ
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/community/portal/login"
                className="union-card hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <Globe className="h-6 w-6 text-[var(--union-text-muted)] mb-4" />
                <h3 className="union-heading-card mb-2">加盟団体専用ポータル</h3>
                <p className="union-body text-sm">
                  加盟団体の方向けのログイン入口。申請承認後、ご利用いただけます。
                </p>
                <span className="union-link text-sm font-medium mt-3 inline-flex items-center gap-1">
                  ログイン
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="union-card bg-gradient-to-br from-[#066ff2]/10 to-[#ec4faf]/10 border-[var(--union-primary)]/20 text-center py-10">
              <p className="union-body mb-6">団体として加盟したい方・企業として提携をご検討の方は以下からお申し込みください。</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="union-btn-primary"
                >
                  加盟申請フォーム
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                <Link href="/for-corporate" className="union-btn-secondary">
                  企業の提携・協賛
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
