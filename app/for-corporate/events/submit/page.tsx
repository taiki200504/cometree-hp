import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ArrowRight, Calendar, CheckCircle, ExternalLink, Mail, Clock } from "lucide-react"
import Link from "next/link"

export default function EventsSubmitPage() {
  const requiredInfo = [
    "イベント名・企画内容",
    "目的・ターゲット",
    "希望する実施方法（共同開催・協賛など）",
    "希望日時・会場",
    "予算・料金",
    "期待する成果・効果",
  ]

  const process = [
    {
      step: "1",
      title: "申請フォーム記入",
      description: "イベント情報を申請フォームに記入して送信します。",
    },
    {
      step: "2",
      title: "内容確認・ヒアリング",
      description: "申請内容を確認し、詳細をヒアリングします（1週間程度）。",
    },
    {
      step: "3",
      title: "企画調整・提案",
      description: "企画内容を調整し、最適なプランを提案します。",
    },
    {
      step: "4",
      title: "実施・運営",
      description: "イベントを実施し、運営をサポートします。",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Submit Event"
        title="イベント申請"
        description="イベント共同開催・協賛の申請フォームです。学生に響くイベントを一緒に創りましょう。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Application"
              title="イベント申請"
              description="以下のフォームからイベント情報をご申請ください。"
            />
            
            {/* 申請に必要な情報 */}
            <div className="union-card mb-6">
              <h3 className="union-heading-card mb-4">申請に必要な情報</h3>
              <ul className="space-y-2">
                {requiredInfo.map((info) => (
                  <li key={info} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                    <span className="text-[var(--union-text)]">{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 申請フォーム */}
            <div className="union-card mb-6">
              <h3 className="union-heading-card mb-4">申請方法</h3>
              <div className="space-y-4">
                <div className="p-5 bg-[var(--union-section-alt)] rounded-lg border-2 border-[#066ff2]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6 text-[#066ff2]" />
                    <h4 className="font-semibold text-[var(--union-text)]">外部フォーム（推奨）</h4>
                  </div>
                  <p className="union-body text-sm mb-3">
                    Googleフォームから申請できます。イベント企画の詳細を記入してください。
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdUR_v_l38b0abzhnaEqsA58zRjeS6z72s0SSwb4OWoZouZ6g/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="union-btn-primary inline-flex"
                  >
                    申請フォームを開く
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
                <div className="p-5 bg-[var(--union-section-alt)] rounded-lg border border-[var(--union-border)]">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-6 w-6 text-[#066ff2]" />
                    <h4 className="font-semibold text-[var(--union-text)]">お問い合わせフォーム</h4>
                  </div>
                  <p className="union-body text-sm mb-3">
                    お問い合わせフォームからも申請可能です。件名に「イベント申請」と記載してください。
                  </p>
                  <Link href="/for-corporate/contact" className="union-link inline-flex items-center gap-1 font-medium">
                    お問い合わせフォームへ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 申請後の流れ */}
            <div className="union-card bg-[#066ff2]/5 border-[#066ff2]/20 mb-6">
              <h3 className="union-heading-card mb-4">申請後の流れ</h3>
              <div className="space-y-4">
                {process.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#066ff2] text-white flex items-center justify-center font-semibold text-sm">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-medium text-[var(--union-text)] mb-1">{item.title}</h4>
                      <p className="union-body text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 注意事項 */}
            <div className="union-card border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 mb-6">
              <h3 className="union-heading-card mb-3">ご注意事項</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                  <span className="text-[var(--union-text)]">イベント企画によっては、実施をお断りする場合があります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                  <span className="text-[var(--union-text)]">企画調整には1週間程度かかります。余裕を持って申請してください。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                  <span className="text-[var(--union-text)]">料金はイベントの規模・内容によって変動します。詳細はお問い合わせください。</span>
                </li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <p className="union-body text-sm">
                <Link href="/for-corporate/events/menu" className="union-link">
                  共同開催メニュー
                </Link>
                {" / "}
                <Link href="/for-corporate/events/guide" className="union-link">
                  企画の作り方ガイド
                </Link>
                {" / "}
                <Link href="/for-corporate/events" className="union-link">
                  イベント連携トップ
                </Link>
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
