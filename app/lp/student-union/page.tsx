import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudentUnionLpPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ModernHero
        subtitle="Student Union LP"
        title="学生団体連合UNION"
        description="全国の学生団体をつなぎ、学生の声を社会に届ける。加盟のメリットと参加方法をご案内します。"
      />
      <AnimatedSection className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">加盟するメリット</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>他団体との連携・情報共有</li>
              <li>メディア・イベント告知支援</li>
              <li>企業とのマッチング機会</li>
              <li>団体向け案件・Discord（代表）</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">参加方法</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              2名以上の学生団体であれば加盟いただけます。加盟は無料です。
            </p>
            <Button asChild>
              <Link href="/join/organization">団体として加盟する</Link>
            </Button>
          </section>
          <p className="text-center">
            <Link href="/about/union" className="text-[#066ff2] hover:underline">学生団体連合紹介へ</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
