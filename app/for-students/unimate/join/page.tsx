import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ArrowRight, CheckCircle, User, FileText, Briefcase, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function UnimateJoinPage() {
  const steps = [
    {
      number: "1",
      title: "ログインまたは新規登録",
      description: "既存アカウントでログインするか、新規登録を行います。",
      details: [
        "メールアドレスでアカウント作成",
        "学生であることを確認",
        "利用規約・プライバシーポリシーに同意",
      ],
    },
    {
      number: "2",
      title: "プロフィール登録",
      description: "学生情報・興味分野・希望する案件タイプなどを登録します。",
      details: [
        "基本情報（氏名・大学・学年・学部）",
        "学生団体での活動経験",
        "興味分野・希望する案件タイプ",
        "自己PR・スキル・経験",
      ],
    },
    {
      number: "3",
      title: "案件情報の確認",
      description: "マッチングされた案件情報を確認し、応募や面談を進めます。",
      details: [
        "マッチングされた案件の確認",
        "応募・面談のスケジュール調整",
        "企業との面談",
        "マッチング後のフォローアップ",
      ],
    },
  ]

  const requirements = [
    "学生であること（大学・大学院・専門学校など）",
    "学生団体での活動経験があること（推奨）",
    "利用規約・プライバシーポリシーに同意すること",
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Join UNIMATE"
        title="学生登録"
        description="UNIMATEに登録して、キャリアの選択肢を広げましょう。学生団体で活動する意欲的な学生と企業をつなぎます。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Registration"
              title="登録方法"
              description="学生個人としてUNIMATEに登録する手順です。"
            />
            
            {/* 登録の流れ */}
            <div className="space-y-6 mb-8">
              {steps.map((step) => (
                <div key={step.number} className="union-card">
                  <div className="flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-[#066ff2] text-white flex items-center justify-center font-semibold">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="union-heading-card mb-2">{step.title}</h3>
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

            {/* 登録条件 */}
            <div className="union-card bg-[#066ff2]/5 border-[#066ff2]/20 mb-8">
              <h3 className="union-heading-card mb-3">登録条件</h3>
              <ul className="space-y-2">
                {requirements.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                    <span className="text-[var(--union-text)]">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <Link href="/login" className="union-btn-primary inline-flex">
                ログイン・新規登録
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="union-card bg-[var(--union-section-bg)]">
                <p className="union-body text-sm mb-3">
                  外部のUNION Match LPからも登録できます。
                </p>
                <a
                  href="https://union-match-lp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="union-link inline-flex items-center gap-1 font-medium"
                >
                  UNION Match LPを見る
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="union-body text-sm">
                <Link href="/for-students/unimate/benefits" className="union-link">
                  登録のメリット
                </Link>
                {" / "}
                <Link href="/for-students/unimate" className="union-link">
                  UNIMATEについて
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
