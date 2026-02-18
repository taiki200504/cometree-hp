import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Layout, Briefcase, BookOpen, MessageCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrganizationBenefitsPage() {
  const benefits = [
    { icon: Layout, title: "自団体のLP", text: "加盟団体ごとの紹介ページ（LP）を用意。団体の活動を発信できます。" },
    { icon: Briefcase, title: "団体向け案件", text: "企業・行政からの団体向け案件・協働の案内を受けられます。" },
    { icon: BookOpen, title: "学生団体基礎知識", text: "運営や法務などの基礎知識コンテンツを提供します。" },
    { icon: MessageCircle, title: "Discord（代表）", text: "代表者向けのDiscordで情報共有・交流ができます。" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ModernHero
        subtitle="For Registered Organizations"
        title="登録学生団体のメリット"
        description="UNIONに加盟している学生団体が得られることをまとめています。"
      />
      <AnimatedSection className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <b.icon className="h-6 w-6 text-[#066ff2]" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {b.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{b.text}</p>
              </div>
            </div>
          ))}
          <p className="text-center">
            <Link href="/join/organization" className="text-[#066ff2] hover:underline">団体として加盟する</Link>
            {" / "}
            <Link href="/community/portal/login" className="text-[#066ff2] hover:underline">加盟団体専用ポータル</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
