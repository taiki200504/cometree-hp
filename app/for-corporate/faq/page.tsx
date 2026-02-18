"use client"

import { useState } from "react"
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
    q: "提携・協賛の流れを教えてください。",
    a: "お問い合わせいただいた後、ご希望（人材紹介・イベント協賛・メディア協賛など）に応じてヒアリングし、プランをご提案します。",
  },
  {
    q: "採用以外の活用はできますか？",
    a: "はい。Z世代向けブランディング、学生団体との共創プロジェクト、イベント協賛・メディア掲載など、幅広くご利用いただけます。",
  },
  {
    q: "料金の目安はありますか？",
    a: "イベント協賛やメディア協賛など、施策に応じたプランをご用意しています。詳細はお問い合わせください。",
  },
  {
    q: "案件募集はどのように行いますか？",
    a: "案件掲載申請フォームから案件情報をご申請ください。審査後、学生に案内します。",
  },
  {
    q: "イベント共同開催の流れは？",
    a: "イベント申請フォームから企画内容をご申請ください。企画内容を確認後、共同開催の詳細を調整します。",
  },
]

export default function CorporateFaqPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="FAQ"
        title="よくある質問"
        description="法人向けサービスに関するよくある質問をまとめています。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Questions"
              title="法人向けFAQ"
              description="サービス・料金・導入フローに関する質問にお答えします。"
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
            <div className="text-center">
              <Link href="/for-corporate/contact" className="union-btn-primary">
                相談する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
