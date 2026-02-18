"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const faqItems = [
  {
    q: "UNIMATEとUNIONの違いは何ですか？",
    a: "UNIMATEは学生個人向けのマッチングサービスで、インターン・就職機会を提供します。UNIONは学生団体向けのサービスで、メディア発信・イベント告知・他団体との連携をサポートします。",
  },
  {
    q: "参加に費用はかかりますか？",
    a: "学生・学生団体のコミュニティ参加は無料です。イベントによっては参加費が発生する場合があります。",
  },
  {
    q: "個人でも参加できますか？",
    a: "はい。学生であれば団体に所属していなくてもUNIMATEに参加できます。Slackや掲示板で情報交換・イベント参加が可能です。",
  },
  {
    q: "団体として登録するにはどうすればいいですか？",
    a: "UNIONの団体登録ページから、団体情報を登録してください。審査・承認後、UNIONのサービスを利用できます。",
  },
  {
    q: "UNIMATE Matchとは何ですか？",
    a: "学生と企業をつなぐマッチングサービスです。学生団体で活動する意欲的な学生と、企業のインターン・採用ニーズをマッチングします。",
  },
  {
    q: "学生団体に所属していなくても参加できますか？",
    a: "はい。UNIMATEは個人でも参加可能です。ただし、学生団体での活動経験がある学生を優先的にマッチングします。",
  },
  {
    q: "メディア出演の条件はありますか？",
    a: "学生であれば個人・団体問わず出演可能です。活動内容や思いを共有していただける方を歓迎しています。",
  },
  {
    q: "イベント情報はどこで確認できますか？",
    a: "UNIONのイベントページや、Slackコミュニティ、Discordで最新のイベント情報を確認できます。",
  },
]

export default function StudentFaqPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="FAQ"
        title="よくある質問"
        description="学生向けサービスに関するよくある質問をまとめています。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Questions"
              title="学生向けFAQ"
              description="UNIMATE（個人）とUNION（団体）に関する質問にお答えします。"
            />
            <Accordion type="single" collapsible className="border border-[var(--union-border)] rounded-lg overflow-hidden bg-[var(--union-section-alt)] mb-10">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-[var(--union-border)] px-4">
                  <AccordionTrigger className="text-left text-[var(--union-text)] hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="union-body">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/for-students/unimate" className="union-card hover:border-[#066ff2]/30 hover:shadow-md transition-all text-center">
                  <h3 className="union-heading-card mb-2">UNIMATEについて</h3>
                  <p className="union-body text-sm mb-2">学生個人向けマッチングサービス</p>
                  <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                    詳しく見る
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/for-students/union" className="union-card hover:border-[#ec4faf]/30 hover:shadow-md transition-all text-center">
                  <h3 className="union-heading-card mb-2">UNIONについて</h3>
                  <p className="union-body text-sm mb-2">学生団体向けサービス</p>
                  <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                    詳しく見る
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
