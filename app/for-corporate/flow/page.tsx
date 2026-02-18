import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ArrowRight, Mail, Phone, Calendar, FileText, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function CorporateFlowPage() {
  const steps = [
    {
      number: "1",
      title: "お問い合わせ・相談",
      description: "お問い合わせフォームまたは相談予約から、ご希望のサービスやニーズをお知らせください。",
      details: [
        "お問い合わせフォームから連絡",
        "電話・メールでの相談も可能",
        "オンライン面談の予約も可能",
        "無料で相談可能",
      ],
      icon: Mail,
      duration: "即日〜3営業日以内",
    },
    {
      number: "2",
      title: "ヒアリング・プラン提案",
      description: "企業のニーズをヒアリングし、最適なプランをご提案します。",
      details: [
        "企業のニーズ・目的のヒアリング",
        "最適なプランの提案",
        "料金・スケジュールの調整",
        "必要に応じて複数プランの提示",
      ],
      icon: Phone,
      duration: "1週間程度",
    },
    {
      number: "3",
      title: "契約・開始",
      description: "プランにご納得いただいた後、契約手続きを行い、サービスを開始します。",
      details: [
        "契約書の作成・確認",
        "契約締結",
        "サービス開始準備",
        "専任担当のアサイン",
      ],
      icon: FileText,
      duration: "1週間程度",
    },
    {
      number: "4",
      title: "運用・サポート",
      description: "サービス運用中は、専任担当がサポートします。効果測定や改善提案も行います。",
      details: [
        "定期的な進捗報告",
        "効果測定・分析",
        "改善提案",
        "継続的なサポート",
      ],
      icon: CheckCircle,
      duration: "継続的",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Flow"
        title="導入フロー"
        description="サービス導入までの流れをご案内します。お問い合わせからサービス開始まで、スムーズに進みます。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Process"
              title="導入までの流れ"
              description="お問い合わせからサービス開始まで、4つのステップで進みます。"
            />
            <div className="space-y-6 mb-10">
              {steps.map((step) => (
                <div key={step.number} className="union-card">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-2">
                        <step.icon className="h-6 w-6 text-[#066ff2]" />
                      </div>
                      <span className="w-10 h-10 rounded-full bg-[#066ff2] text-white flex items-center justify-center font-semibold text-sm">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="union-heading-card">{step.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-[var(--union-text-muted)]">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </div>
                      </div>
                      <p className="union-body text-sm mb-3">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                            <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-corporate/contact" className="union-btn-primary">
                お問い合わせ・相談予約
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* よくある質問への導線 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-2xl text-center">
            <h3 className="union-heading-card mb-3">導入についての質問</h3>
            <p className="union-body text-sm mb-4">
              導入フローに関するよくある質問は、FAQページでご確認いただけます。
            </p>
            <Link href="/for-corporate/faq" className="union-link inline-flex items-center gap-1 font-medium">
              よくある質問を見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
