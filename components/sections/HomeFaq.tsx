"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const studentFaq = [
  {
    q: "参加に費用はかかりますか？",
    a: "学生・学生団体のコミュニティ参加は無料です。イベントによっては参加費が発生する場合があります。",
  },
  {
    q: "個人でも参加できますか？",
    a: "はい。学生であれば団体に所属していなくても参加できます。Slackや掲示板で情報交換・イベント参加が可能です。",
  },
  {
    q: "UNION Matchとは何ですか？",
    a: "学生と企業をつなぐマッチングサービスです。学生団体で活動する意欲的な学生と、企業のインターン・採用ニーズをマッチングします。",
  },
]

const corporateFaq = [
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
]

export function HomeFaq() {
  const [activeTab, setActiveTab] = useState<"student" | "corporate">("student")
  const items = activeTab === "student" ? studentFaq : corporateFaq

  return (
    <div>
      <div className="flex rounded-lg border border-[var(--union-border)] p-1 bg-[var(--union-section-bg)] max-w-xs mx-auto mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("student")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--union-primary)] focus-visible:ring-offset-2 ${
            activeTab === "student"
              ? "bg-[var(--union-section-alt)] text-[var(--union-text)] shadow-sm border border-[var(--union-border)]"
              : "text-[var(--union-text-muted)] hover:text-[var(--union-text)]"
          }`}
        >
          学生向け
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("corporate")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--union-primary)] focus-visible:ring-offset-2 ${
            activeTab === "corporate"
              ? "bg-[var(--union-section-alt)] text-[var(--union-text)] shadow-sm border border-[var(--union-border)]"
              : "text-[var(--union-text-muted)] hover:text-[var(--union-text)]"
          }`}
        >
          法人向け
        </button>
      </div>
      <Accordion type="single" collapsible className="max-w-2xl mx-auto border border-[var(--union-border)] rounded-lg overflow-hidden bg-[var(--union-section-alt)]">
        {items.map((faq, index) => (
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
    </div>
  )
}
