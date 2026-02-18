"use client"

import { Building2, Users, Building, Radio } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useStats } from "@/hooks/use-stats"

const StatsSection = () => {
  const { stats, loading } = useStats()

  const statsData = [
    {
      icon: Building2,
      number: loading ? "—" : `${stats?.organizationCount ?? 0}+`,
      label: "加盟学生団体",
    },
    {
      icon: Users,
      number: loading ? "—" : `${stats?.memberCount ?? 0}+`,
      label: "コミュニティメンバー",
    },
    {
      icon: Building,
      number: loading ? "—" : `${stats?.partnerCount ?? 0}+`,
      label: "提携企業・団体",
    },
    {
      icon: Radio,
      number: loading ? "—" : `${stats?.mediaCount ?? 0}`,
      label: "メディアコンテンツ",
    },
  ]

  return (
    <section className="union-section bg-[var(--union-section-alt)] border-y border-[var(--union-border)]">
      <div className="union-container">
        <p className="union-label text-center">About</p>
        <h2 className="union-heading-section text-center mb-4">
          数字で見るUNION
        </h2>
        <p className="union-body text-center max-w-xl mx-auto mb-12">
          信頼の基盤となる実績。学生・企業双方に選ばれ続けています。
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div className="union-card text-center">
                <div className="w-10 h-10 rounded-lg bg-[#066ff2]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-5 w-5 text-[#066ff2]" />
                </div>
                <div className="text-2xl font-semibold text-[var(--union-text)] mb-1">
                  {stat.number}
                </div>
                <div className="union-body text-sm">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
