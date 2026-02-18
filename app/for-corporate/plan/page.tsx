import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CorporatePlanPage() {
  const plans = [
    {
      name: "イベント出展協賛",
      price: "¥30,000〜",
      description: "学生向けイベントや交流会などにおいて、企業様のブース出展・資料配布・名刺交換などを可能とする協賛枠。",
      features: ["会場内ブース設置スペースの提供", "企業ロゴの掲載(パンフレットなど)", "学生との直接交流機会の提供"],
    },
    {
      name: "プレゼンテーション・登壇協賛",
      price: "¥50,000〜",
      description: "イベント内での企業紹介プレゼンやパネルディスカッションへの登壇など、登壇機会を提供する協賛枠。",
      features: [
        "5〜10分程度のプレゼン時間(内容応相談)",
        "タイムテーブル・パンフレット・Web上での紹介",
        "質疑応答やトークセッション参加権",
      ],
    },
    {
      name: "SNS投稿協賛",
      price: "¥5,000〜",
      description: "学生団体連合UNIONの公式SNS(Instagram、X (旧Twitter) など)を活用した、企業様に関する投稿枠。",
      features: ["Instagram投稿", "X (旧Twitter) 投稿", "ハッシュタグ付き投稿", "リポスト・リツイート対応"],
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Plans"
        title="プラン"
        description="イベント協賛やメディア掲載の料金プランをご紹介します。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Pricing"
              title="料金プラン"
              description="イベント協賛・メディア掲載の料金の目安です。詳細はお問い合わせください。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {plans.map((plan) => (
                <div key={plan.name} className="union-card">
                  <h3 className="union-heading-card text-lg mb-2">{plan.name}</h3>
                  <div className="text-2xl font-semibold text-[#066ff2] mb-4">{plan.price}</div>
                  <p className="union-body text-sm mb-4">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                        <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="union-card bg-[#066ff2]/5 border-[#066ff2]/20">
              <p className="union-body text-sm mb-4">
                人材マッチング・案件募集・共創プロジェクトなど、その他のサービスについては個別にお見積もりいたします。
              </p>
              <Link href="/for-corporate/contact" className="union-link inline-flex items-center gap-1 font-medium">
                お問い合わせ・相談予約
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
