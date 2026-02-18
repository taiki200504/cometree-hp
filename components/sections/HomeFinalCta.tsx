"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HomeFinalCta() {
  return (
    <section className="union-section relative overflow-hidden bg-gradient-to-br from-[#066ff2] via-[#066ff2] to-[#7c3aed]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(236,79,175,0.12)_100%)] pointer-events-none" />
      <div className="union-container relative text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          一緒に未来を創りませんか？
        </h2>
        <p className="text-white/90 text-sm sm:text-base mb-10 max-w-lg mx-auto">
          学生の挑戦を応援し、企業と学生をつなぐプラットフォーム。目的に合わせてご参加ください。
        </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link
                href="/for-students/unimate/join"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-[#066ff2] bg-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#066ff2]"
              >
                登録する（学生）
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/for-corporate/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white border-2 border-white/70 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#066ff2]"
              >
                相談する（法人）
              </Link>
              <Link
                href="/for-students/union/join"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#066ff2]"
              >
                加盟する（団体）
              </Link>
            </div>
      </div>
    </section>
  )
}
