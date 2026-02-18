import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ArrowRight, CheckCircle, Users, FileText, Award, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function UnionJoinPage() {
  const steps = [
    {
      number: "1",
      title: "加盟申請",
      description: "加盟申請フォームから団体情報を登録します。",
      details: [
        "団体名・活動内容",
        "メンバー数・活動地域",
        "代表者情報",
        "活動実績・成果",
      ],
    },
    {
      number: "2",
      title: "審査",
      description: "登録情報を確認し、審査を実施します。",
      details: [
        "登録情報の確認",
        "活動内容の審査",
        "必要に応じて追加情報の確認",
        "審査結果の通知（1〜2週間程度）",
      ],
    },
    {
      number: "3",
      title: "承認",
      description: "承認後、UNIONのサービスを利用可能になります。",
      details: [
        "承認通知の受領",
        "サービス利用開始",
        "Slackコミュニティへの参加",
        "メディア発信・イベント告知などのサービス利用",
      ],
    },
  ]

  const requirements = [
    "2名以上の学生で構成された団体であること",
    "営利目的でない学生主体の活動であること",
    "活動内容が明確であること",
    "利用規約・プライバシーポリシーに同意すること",
  ]

  const benefits = [
    "メディア発信支援（ポッドキャスト出演など）",
    "イベント告知・広報支援",
    "他団体との連携機会",
    "運営サポート・1on1カウンセリング",
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Join UNION"
        title="団体登録"
        description="学生団体としてUNIONに登録して、メディア発信・イベント告知・連携の機会を広げましょう。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Registration"
              title="登録方法"
              description="学生団体としてUNIONに登録する手順です。"
            />
            
            {/* 登録の流れ */}
            <div className="space-y-6 mb-8">
              {steps.map((step) => (
                <div key={step.number} className="union-card">
                  <div className="flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-[#ec4faf] text-white flex items-center justify-center font-semibold">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="union-heading-card mb-2">{step.title}</h3>
                      <p className="union-body text-sm mb-3">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                            <CheckCircle className="h-4 w-4 text-[#ec4faf] flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 登録条件 */}
            <div className="union-card bg-[#ec4faf]/5 border-[#ec4faf]/20 mb-6">
              <h3 className="union-heading-card mb-3">登録条件</h3>
              <ul className="space-y-2">
                {requirements.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#ec4faf] flex-shrink-0" />
                    <span className="text-[var(--union-text)]">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 登録後のメリット */}
            <div className="union-card bg-[#066ff2]/5 border-[#066ff2]/20 mb-8">
              <h3 className="union-heading-card mb-3">登録後のメリット</h3>
              <ul className="space-y-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                    <span className="text-[var(--union-text)]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="union-btn-primary inline-flex"
              >
                加盟申請フォーム
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <p className="union-body text-sm">
                <Link href="/for-students/union/benefits" className="union-link">
                  登録のメリット
                </Link>
                {" / "}
                <Link href="/for-students/union" className="union-link">
                  UNIONについて
                </Link>
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* よくある質問への導線 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-2xl text-center">
            <h3 className="union-heading-card mb-3">登録についての質問</h3>
            <p className="union-body text-sm mb-4">
              登録に関するよくある質問は、FAQページでご確認いただけます。
            </p>
            <Link href="/for-students/faq" className="union-link inline-flex items-center gap-1 font-medium">
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
