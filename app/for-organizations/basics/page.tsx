import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { BookOpen, FileText, Scale, Users, Megaphone } from "lucide-react"
import Link from "next/link"

export default function StudentOrgBasicsPage() {
  const sections = [
    {
      icon: FileText,
      title: "学生団体とは",
      body: "学生が主体となり、学業以外の活動（文化・スポーツ・ボランティア・起業・国際交流など）を行う団体です。大学公認サークル、任意団体、NPO法人など形態はさまざまです。",
    },
    {
      icon: Scale,
      title: "運営の基本",
      body: "規約・役員・総会の整備、予算管理、活動報告の習慣化が重要です。UNION加盟団体は、ポータルやコミュニティを通じて運営ノウハウを共有しています。",
    },
    {
      icon: Users,
      title: "役割分担と継承",
      body: "代表・副代表・各部門の役割を明確にし、世代交代時に引き継ぎ資料を残すと、団体の持続につながります。",
    },
    {
      icon: Megaphone,
      title: "広報・ブランディング",
      body: "SNS、ホームページ、取材対応などで団体の活動を発信すると、メンバー募集や協力者獲得に効果的です。UNIONのメディア・告知支援もご活用ください。",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ModernHero
        subtitle="Student Organization Basics"
        title="学生団体基礎知識"
        description="学生団体の運営・法務・広報の基礎をまとめました。加盟団体の方は参照用としてご利用ください。"
      />
      <AnimatedSection className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="flex gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <s.icon className="h-6 w-6 text-[#066ff2]" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{s.body}</p>
              </div>
            </div>
          ))}
          <p className="text-center pt-4">
            <Link href="/for-organizations/benefits" className="text-[#066ff2] hover:underline">登録団体のメリット</Link>
            {" / "}
            <Link href="/community/organizations" className="text-[#066ff2] hover:underline">加盟団体一覧</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
