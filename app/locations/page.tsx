import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { MapPin, Building2 } from "lucide-react"
import Link from "next/link"

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ModernHero
        subtitle="Locations"
        title="拠点情報"
        description="UNIONおよび連携拠点の情報です。アンバサダー以外の学生も、BEGOPEN・クロスワンなどの拠点で育成・交流できます。"
      />
      <AnimatedSection className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-[#066ff2]" />
              全国の活動拠点
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              学生団体連合UNIONは、17都道府県に活動拠点を展開しています。
              イベント送客・就活人材・地域の関係人口として、アンバサダーに認定されなかった学生も、BEGOPEN・クロスワンなどの連携拠点で育成・交流の機会を提供しています。
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-[#066ff2]" />
              拠点の詳細
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              各拠点の住所・開設日・利用方法は、順次このページまたはコミュニティでお知らせします。
            </p>
          </div>
          <p className="text-center">
            <Link href="/for-students" className="text-[#066ff2] hover:underline">学生向けトップに戻る</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
