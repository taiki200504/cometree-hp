import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { CheckCircle, ArrowRight, Calendar, Mic, Users } from "lucide-react"
import Link from "next/link"

export default function EventsMenuPage() {
  const menus = [
    {
      name: "イベント出展協賛",
      price: "¥30,000〜",
      description: "学生向けイベントや交流会などにおいて、企業様のブース出展・資料配布・名刺交換などを可能とする協賛枠。",
      features: [
        "会場内ブース設置スペースの提供",
        "企業ロゴの掲載(パンフレットなど)",
        "学生との直接交流機会の提供",
        "SNSでの告知・拡散支援",
      ],
      icon: Calendar,
      suitable: "Z世代へのブランディング、採用活動",
    },
    {
      name: "プレゼンテーション・登壇協賛",
      price: "¥50,000〜",
      description: "イベント内での企業紹介プレゼンやパネルディスカッションへの登壇など、登壇機会を提供する協賛枠。",
      features: [
        "5〜10分程度のプレゼン時間(内容応相談)",
        "タイムテーブル・パンフレット・Web上での紹介",
        "質疑応答やトークセッション参加権",
        "動画配信・録画の提供",
      ],
      icon: Mic,
      suitable: "企業理念・事業内容の訴求、採用説明",
    },
    {
      name: "共同開催",
      price: "応相談",
      description: "企業様とUNIONが共同でイベントを企画・運営します。企画から運営までトータルサポート。",
      features: [
        "企画・設計サポート",
        "会場手配",
        "学生集客",
        "運営サポート",
        "広報・宣伝支援",
      ],
      icon: Users,
      suitable: "大規模なブランディング、CSR活動",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Menu"
        title="共同開催メニュー"
        description="イベント共同開催・協賛のメニューと料金をご紹介します。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Options"
              title="メニュー一覧"
              description="イベント連携のメニューと料金の目安です。詳細はお問い合わせください。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {menus.map((menu) => (
                <div key={menu.name} className="union-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center">
                      <menu.icon className="h-6 w-6 text-[#066ff2]" />
                    </div>
                    <h3 className="union-heading-card text-lg">{menu.name}</h3>
                  </div>
                  <div className="text-2xl font-semibold text-[#066ff2] mb-4">{menu.price}</div>
                  <p className="union-body text-sm mb-4">{menu.description}</p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[var(--union-text-muted)] mb-2">適している用途：</p>
                    <p className="text-sm text-[var(--union-text)]">{menu.suitable}</p>
                  </div>
                  <ul className="space-y-2">
                    {menu.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                        <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="union-card bg-[#066ff2]/5 border-[#066ff2]/20 mb-10">
              <h3 className="union-heading-card mb-3">料金について</h3>
              <p className="union-body text-sm mb-4">
                料金はイベントの規模・内容・期間によって変動します。詳細はお問い合わせいただいた後、ご希望に応じてお見積もりをご提示いたします。
              </p>
              <ul className="space-y-2 text-sm text-[var(--union-text-muted)]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                  イベント規模に応じた柔軟な料金設定
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                  複数メニューの組み合わせも可能
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                  継続的な連携には割引あり
                </li>
              </ul>
            </div>
            <div className="text-center">
              <Link href="/for-corporate/events/submit" className="union-btn-primary">
                イベント申請
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
