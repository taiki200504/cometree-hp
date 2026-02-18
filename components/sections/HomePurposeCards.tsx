"use client"

import Link from "next/link"
import { ArrowRight, Users, Building2, UsersRound, Heart } from "lucide-react"

const purposes = [
  {
    href: "/for-students",
    label: "学生",
    description: "UNIMATE（個人）・UNION（団体）",
    icon: Users,
    color: "text-[#066ff2]",
    bgColor: "bg-[#066ff2]/10",
  },
  {
    href: "/for-corporate",
    label: "法人",
    description: "人材紹介・協賛・共創プロジェクト",
    icon: Building2,
    color: "text-[#ec4faf]",
    bgColor: "bg-[#ec4faf]/10",
  },
  {
    href: "/for-students/union",
    label: "団体",
    description: "学生団体としてUNIONに加盟する",
    icon: UsersRound,
    color: "text-[#7c3aed]",
    bgColor: "bg-[#7c3aed]/10",
  },
  {
    href: "/join/donate",
    label: "支援者",
    description: "ご寄付・ご支援で応援する",
    icon: Heart,
    color: "text-[#059669]",
    bgColor: "bg-[#059669]/10",
  },
]

export function HomePurposeCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 lg:mt-12">
      {purposes.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="union-card group flex flex-col hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--union-primary)] focus-visible:ring-offset-2"
        >
          <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 ${item.color}`}>
            <item.icon className="h-6 w-6" />
          </div>
          <h3 className="union-heading-card mb-2">{item.label}</h3>
          <p className="union-body text-sm flex-1">{item.description}</p>
          <span className="union-link inline-flex items-center gap-1 mt-3 text-sm font-medium group-hover:underline">
            詳しく見る
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      ))}
    </div>
  )
}
