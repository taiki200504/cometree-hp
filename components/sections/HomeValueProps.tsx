"use client"

import { Link2, Shield, TrendingUp } from "lucide-react"

const values = [
  {
    icon: Link2,
    title: "学生×社会をつなぐ",
    description: "全国の学生団体と学生を一堂に集め、企業・行政とのマッチングを実現します。",
  },
  {
    icon: Shield,
    title: "信頼のプラットフォーム",
    description: "公認の連合組織として、学生にも企業にも安心して利用していただける基盤を提供します。",
  },
  {
    icon: TrendingUp,
    title: "共に成長する",
    description: "イベント・メディア・1on1相談を通じて、学生の挑戦と企業のニーズをともに支えます。",
  },
]

export function HomeValueProps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {values.map((item, index) => (
        <div key={index} className="union-card text-center">
          <div className="w-14 h-14 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mx-auto mb-5 text-[#066ff2]">
            <item.icon className="h-7 w-7" />
          </div>
          <h3 className="union-heading-card text-lg mb-3">{item.title}</h3>
          <p className="union-body text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
