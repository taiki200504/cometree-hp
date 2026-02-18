import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { CheckCircle, XCircle, ArrowRight, FileText, DollarSign, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function ProjectGuidePage() {
  const requirements = [
    {
      icon: FileText,
      text: "案件内容が明確であること",
      description: "具体的な業務内容、期待される成果を明記してください。",
    },
    {
      icon: DollarSign,
      text: "報酬・条件が明記されていること",
      description: "時給・日給・案件単価など、具体的な金額を記載してください。",
    },
    {
      icon: Users,
      text: "応募条件が具体的であること",
      description: "必要なスキル、経験、学生団体での活動経験などを具体的に記載してください。",
    },
    {
      icon: Calendar,
      text: "期間・スケジュールが明記されていること",
      description: "開始日、終了日、勤務時間、納期などを明確に記載してください。",
    },
  ]

  const ngExamples = [
    {
      title: "報酬が不明確",
      example: "報酬：応相談",
      reason: "学生が応募しにくくなります。具体的な金額または範囲を明記してください。",
      improvement: "報酬：時給1,500円〜2,000円（経験に応じて調整）",
    },
    {
      title: "応募条件が曖昧",
      example: "やる気のある方",
      reason: "具体的なスキルや経験を明記することで、適切な学生とマッチングできます。",
      improvement: "応募条件：学生団体での活動経験がある方、マーケティングに興味がある方",
    },
    {
      title: "業務内容が不明確",
      example: "業務：雑務全般",
      reason: "具体的な業務内容を記載することで、学生の理解が深まり応募しやすくなります。",
      improvement: "業務内容：SNS投稿（週3回）、ブログ記事執筆（月2本）、データ分析・レポート作成",
    },
    {
      title: "期間・スケジュールが不明確",
      example: "期間：3ヶ月程度",
      reason: "具体的な開始日・終了日、勤務時間を明記することで、学生が応募しやすくなります。",
      improvement: "期間：2025年4月1日〜6月30日（3ヶ月）、勤務時間：週2〜3日、1日6時間程度",
    },
  ]

  const goodExamples = [
    {
      title: "良い例：インターンシップ募集",
      content: `【インターンシップ募集】

期間：2025年4月1日〜6月30日（3ヶ月）
勤務時間：週2〜3日、1日6時間程度
勤務形態：リモート可

業務内容：
・マーケティング業務（SNS運用、コンテンツ制作）
・データ分析・レポート作成
・イベント企画・運営サポート

報酬：時給1,500円
交通費：実費支給

応募条件：
・学生団体での活動経験がある方
・マーケティングに興味がある方
・コミュニケーション能力がある方

応募方法：
以下のフォームからご応募ください。
[応募フォームURL]`,
      points: [
        "期間が具体的（開始日・終了日が明記）",
        "勤務時間が明確",
        "業務内容が具体的",
        "報酬が明記",
        "応募条件が具体的",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Guide"
        title="募集の作り方ガイド"
        description="効果的な案件募集文の書き方とNG例をご紹介します。学生に響く募集文を作成しましょう。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="How to write"
              title="効果的な募集文の書き方"
              description="学生に響く案件募集文を作成するためのポイントです。"
            />

            {/* 必須項目 */}
            <div className="union-card mb-6">
              <h3 className="union-heading-card mb-4">必須項目</h3>
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div key={req.text} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-[#066ff2]/10 flex items-center justify-center">
                      <req.icon className="h-5 w-5 text-[#066ff2]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                        <span className="font-medium text-[var(--union-text)]">{req.text}</span>
                      </div>
                      <p className="text-sm text-[var(--union-text-muted)]">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NG例 */}
            <div className="mb-10">
              <h3 className="union-heading-card mb-4">NG例と改善ポイント</h3>
              <div className="space-y-4">
                {ngExamples.map((ng) => (
                  <div key={ng.title} className="union-card border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h4 className="font-semibold text-[var(--union-text)]">{ng.title}</h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">NG例：</p>
                      <p className="union-body text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{ng.example}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium text-[var(--union-text-muted)] mb-1">理由：</p>
                      <p className="union-body text-sm">{ng.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">改善例：</p>
                      <p className="union-body text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded">{ng.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 良い例 */}
            <div className="mb-10">
              <h3 className="union-heading-card mb-4">良い例</h3>
              {goodExamples.map((good) => (
                <div key={good.title} className="union-card border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-[var(--union-text)] mb-3">{good.title}</h4>
                  <div className="bg-[var(--union-section-alt)] rounded-lg p-4 border border-[var(--union-border)] mb-4">
                    <pre className="text-sm text-[var(--union-text-muted)] whitespace-pre-wrap font-mono">
                      {good.content}
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--union-text-muted)] mb-2">良いポイント：</p>
                    <ul className="space-y-1">
                      {good.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <Link href="/for-corporate/projects/submit" className="union-btn-primary">
                案件掲載申請
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="union-body text-sm">
                <Link href="/for-corporate/projects/templates" className="union-link">
                  募集テンプレート集
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
