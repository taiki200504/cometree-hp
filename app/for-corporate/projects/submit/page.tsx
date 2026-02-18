import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ArrowRight, FileText, CheckCircle, ExternalLink, Mail } from "lucide-react"
import Link from "next/link"

export default function ProjectSubmitPage() {
  const requiredInfo = [
    "案件タイプ（インターンシップ・業務委託・イベントスタッフなど）",
    "案件内容・業務内容の詳細",
    "期間・スケジュール",
    "報酬・条件",
    "応募条件・必要なスキル",
    "応募方法・連絡先",
  ]

  const process = [
    {
      step: "1",
      title: "申請フォーム記入",
      description: "案件情報を申請フォームに記入して送信します。",
    },
    {
      step: "2",
      title: "内容確認・審査",
      description: "申請内容を確認し、審査を実施します（1〜3営業日程度）。",
    },
    {
      step: "3",
      title: "掲載・案内",
      description: "審査通過後、学生に案件情報を案内します。",
    },
    {
      step: "4",
      title: "応募管理",
      description: "応募者の管理やマッチングをサポートします。",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Submit Project"
        title="案件掲載申請"
        description="案件情報を掲載するための申請フォームです。学生団体で活動する意欲的な学生にリーチできます。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Application"
              title="案件掲載申請"
              description="以下のフォームから案件情報をご申請ください。"
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
                    <FileText className="h-6 w-6 text-[#066ff2]" />
                    <h4 className="font-semibold text-[var(--union-text)]">外部フォーム（推奨）</h4>
                  </div>
                  <p className="union-body text-sm mb-3">
                    Googleフォームから申請できます。案件情報を詳しく記入してください。
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
                    お問い合わせフォームからも申請可能です。件名に「案件掲載申請」と記載してください。
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
                  <span className="text-[var(--union-text)]">案件内容によっては、掲載をお断りする場合があります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                  <span className="text-[var(--union-text)]">審査には1〜3営業日程度かかります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                  <span className="text-[var(--union-text)]">報酬・条件が不明確な案件は掲載できません。</span>
                </li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <p className="union-body text-sm">
                <Link href="/for-corporate/projects/templates" className="union-link">
                  募集テンプレート集
                </Link>
                {" / "}
                <Link href="/for-corporate/projects/guide" className="union-link">
                  募集の作り方ガイド
                </Link>
                {" / "}
                <Link href="/for-corporate/projects" className="union-link">
                  案件募集トップ
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
