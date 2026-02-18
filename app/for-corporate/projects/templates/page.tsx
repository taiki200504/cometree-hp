"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { FileText, Copy, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ProjectTemplatesPage() {
  const templates = [
    {
      title: "インターンシップ募集",
      description: "学生向けインターンシップ案件の募集文テンプレートです。期間・内容・報酬・応募条件を明確に記載してください。",
      example: `【インターンシップ募集】

期間：3ヶ月（2025年4月〜6月）
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
      tips: [
        "期間と勤務時間を明確に記載",
        "業務内容を具体的に説明",
        "報酬を明記（時給・日給など）",
        "応募条件を具体的に記載",
      ],
    },
    {
      title: "業務委託募集",
      description: "学生向け業務委託案件の募集文テンプレートです。業務内容・報酬・納期を明確に記載してください。",
      example: `【業務委託募集】

業務内容：SNS運用・コンテンツ制作
納期：2025年3月末まで
報酬：1案件あたり5万円〜（内容に応じて調整）

具体的な業務：
・Instagram投稿（週3回）
・Twitter投稿（週5回）
・ブログ記事執筆（月2本）
・画像・動画編集

応募条件：
・デザイン・ライティングスキルがある方
・SNS運用経験がある方
・学生団体での活動経験がある方

応募方法：
ポートフォリオと一緒にご応募ください。
[応募フォームURL]`,
      tips: [
        "業務内容を具体的に記載",
        "報酬の範囲を明記",
        "納期を明確に記載",
        "必要なスキルを具体的に記載",
      ],
    },
    {
      title: "イベントスタッフ募集",
      description: "イベント運営スタッフの募集文テンプレートです。日時・業務内容・報酬を明確に記載してください。",
      example: `【イベントスタッフ募集】

イベント名：学生団体連合UNION 交流会
日時：2025年3月15日（土）13:00〜18:00
会場：東京都内（詳細は採用後にお知らせします）

業務内容：
・受付・案内（13:00〜15:00）
・会場設営・撤収（12:00〜19:00）
・写真撮影・SNS投稿

報酬：日給8,000円
交通費：実費支給
食事：軽食を提供

応募条件：
・コミュニケーション能力がある方
・イベント運営経験がある方歓迎
・学生団体での活動経験がある方

応募方法：
以下のフォームからご応募ください。
[応募フォームURL]`,
      tips: [
        "日時と会場を明確に記載",
        "業務内容を時間帯ごとに記載",
        "報酬を明記",
        "必要な経験・スキルを記載",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Templates"
        title="募集テンプレート集"
        description="効果的な案件募集文のテンプレートをご用意しています。コピーしてご利用ください。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Examples"
              title="テンプレート一覧"
              description="案件タイプ別の募集文テンプレートです。コピーしてご利用ください。"
            />
            <div className="space-y-8 mb-10">
              {templates.map((template) => (
                <div key={template.title} className="union-card">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-6 w-6 text-[#066ff2]" />
                    <h3 className="union-heading-card">{template.title}</h3>
                  </div>
                  <p className="union-body text-sm mb-4">{template.description}</p>
                  
                  {/* テンプレート例 */}
                  <div className="bg-[var(--union-section-alt)] rounded-lg p-4 border border-[var(--union-border)] mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[var(--union-text-muted)]">テンプレート例</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(template.example)
                          alert("コピーしました")
                        }}
                        className="text-xs text-[#066ff2] hover:underline inline-flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        コピー
                      </button>
                    </div>
                    <pre className="text-sm text-[var(--union-text-muted)] whitespace-pre-wrap font-mono">
                      {template.example}
                    </pre>
                  </div>

                  {/* ポイント */}
                  <div className="bg-[#066ff2]/5 rounded-lg p-4 border border-[#066ff2]/20">
                    <p className="text-xs font-semibold text-[var(--union-text)] mb-2">記載のポイント：</p>
                    <ul className="space-y-1">
                      {template.tips.map((tip) => (
                        <li key={tip} className="flex items-center gap-2 text-xs text-[var(--union-text-muted)]">
                          <CheckCircle className="h-3 w-3 text-[#066ff2] flex-shrink-0" />
                          {tip}
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
