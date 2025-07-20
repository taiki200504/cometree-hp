"use client"

import { Building2, Users, Building, Radio } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useStats } from "@/hooks/use-stats"

const StatsSection = () => {
  const { stats, loading } = useStats()

  const statsData = [
    {
      icon: Building2,
      number: loading ? "..." : `${stats?.organizationCount || 0}+`,
      label: "加盟学生団体",
      description: "様々な分野で活動する学生団体が参加",
    },
    {
      icon: Users,
      number: loading ? "..." : `${stats?.memberCount || 0}+`,
      label: "コミュニティメンバー",
      description: "活発に交流する学生コミュニティ",
    },
    {
      icon: Building,
      number: loading ? "..." : `${stats?.partnerCount || 0}+`,
      label: "提携企業・団体",
      description: "学生の成長を支援するパートナー",
    },
    {
      icon: Radio,
      number: loading ? "..." : `${stats?.mediaCount || 0}`,
      label: "メディアコンテンツ",
      description: "ポッドキャスト番組を制作・配信",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">数字で見るUNION</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              学生団体の連携と成長を支援する私たちの実績をご紹介します
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-lg mb-4 mx-auto">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
