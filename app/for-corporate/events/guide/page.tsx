import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { CheckCircle, ArrowRight, Target, Users, Lightbulb, Calendar } from "lucide-react"
import Link from "next/link"

export default function EventsGuidePage() {
  const steps = [
    {
      icon: Target,
      title: "目的の明確化",
      description: "イベントの目的（採用・ブランディング・CSRなど）を明確にします。",
      details: [
        "採用活動：優秀な学生人材との出会い",
        "ブランディング：Z世代への企業認知度向上",
        "CSR活動：社会貢献・教育支援",
        "商品・サービスPR：新商品・サービスの紹介",
      ],
    },
    {
      icon: Users,
      title: "ターゲット設定",
      description: "どのような学生にリーチしたいかを具体的に設定します。",
      details: [
        "学生団体で活動する学生",
        "特定の分野に興味がある学生",
        "特定の地域の学生",
        "特定の学年・学部の学生",
      ],
    },
    {
      icon: Lightbulb,
      title: "企画内容の検討",
      description: "目的とターゲットに合わせた企画内容を検討します。",
      details: [
        "イベント形式：セミナー・ワークショップ・交流会など",
        "コンテンツ：企業紹介・業界説明・体験型プログラムなど",
        "規模：参加者数・会場の大きさ",
        "予算：イベント費用・協賛費用",
      ],
    },
    {
      icon: Calendar,
      title: "実施方法の決定",
      description: "共同開催・協賛・単独開催など、実施方法を決定します。",
      details: [
        "共同開催：UNIONと共同で企画・運営",
        "協賛：既存イベントへの協賛・出展",
        "単独開催：企業主催、UNIONがサポート",
        "オンライン・オフライン・ハイブリッド",
      ],
    },
  ]

  const tips = [
    {
      title: "学生のニーズを理解する",
      description: "学生が求める情報や体験を提供することで、高い満足度を得られます。",
    },
    {
      title: "双方向のコミュニケーション",
      description: "一方的な説明ではなく、学生との対話や交流の機会を設けることが重要です。",
    },
    {
      title: "継続的な関係構築",
      description: "一度きりのイベントではなく、継続的な関係構築を意識した企画が効果的です。",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Guide"
        title="企画の作り方ガイド"
        description="効果的なイベント企画の作り方をご紹介します。学生に響くイベントを一緒に創りましょう。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="How to plan"
              title="企画の作り方"
              description="学生に響くイベント企画を作成するための4ステップです。"
            />
            <div className="space-y-6 mb-10">
              {steps.map((step, index) => (
                <div key={step.title} className="union-card">
                  <div className="flex gap-4 mb-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-[#066ff2]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-[#066ff2] text-white flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="union-heading-card">{step.title}</h3>
                      </div>
                      <p className="union-body text-sm mb-3">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-sm text-[var(--union-text-muted)]">
                            <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 成功のポイント */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Tips"
              title="成功のポイント"
              description="効果的なイベント企画のためのポイントです。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {tips.map((tip) => (
                <div key={tip.title} className="union-card">
                  <h3 className="union-heading-card mb-2">{tip.title}</h3>
                  <p className="union-body text-sm">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* サポート内容 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Support"
              title="UNIONのサポート内容"
              description="イベント企画から運営まで、UNIONがサポートします。"
            />
            <div className="union-card bg-[#066ff2]/5 border-[#066ff2]/20">
              <ul className="space-y-3">
                {[
                  "企画・設計のサポート",
                  "学生集客の支援",
                  "会場手配のサポート",
                  "広報・宣伝の支援",
                  "運営当日のサポート",
                  "効果測定・フィードバック",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                    <span className="text-[var(--union-text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-3xl text-center">
            <Link href="/for-corporate/events/submit" className="union-btn-primary">
              イベント申請
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="union-body text-sm mt-4">
              <Link href="/for-corporate/events/menu" className="union-link">
                共同開催メニュー
              </Link>
              {" / "}
              <Link href="/for-corporate/events" className="union-link">
                イベント連携トップ
              </Link>
            </p>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
