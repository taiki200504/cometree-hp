"use client"

import Link from "next/link"
import NextImage from "next/image"
import { Twitter, Instagram, Youtube, Mail, Settings } from "lucide-react"

const footerCategories = [
  {
    title: "学生向け",
    links: [
      { href: "/for-students", label: "学生向けトップ" },
      { href: "/for-students/unimate", label: "UNIMATE（個人）" },
      { href: "/for-students/union", label: "UNION（団体）" },
      { href: "/for-students/faq", label: "よくある質問" },
    ],
  },
  {
    title: "法人向け",
    links: [
      { href: "/for-corporate", label: "法人向けトップ" },
      { href: "/for-corporate/service", label: "サービス紹介" },
      { href: "/for-corporate/benefits", label: "法人のメリット" },
      { href: "/for-corporate/plan", label: "プラン" },
      { href: "/for-corporate/projects", label: "案件募集" },
      { href: "/for-corporate/events", label: "イベント連携" },
      { href: "/for-corporate/faq", label: "よくある質問" },
      { href: "/for-corporate/contact", label: "相談・お問い合わせ" },
    ],
  },
  {
    title: "その他",
    links: [
      { href: "/events", label: "UNION主催イベント" },
      { href: "/media", label: "メディア「ワカモノ」" },
      { href: "/about", label: "運営会社について" },
    ],
  },
  {
    title: "規約・ポリシー",
    links: [
      { href: "/terms", label: "利用規約" },
      { href: "/privacy", label: "プライバシーポリシー" },
    ],
  },
]

const socialLinks = [
  { href: "https://x.com/UNION_gakusei26", icon: Twitter, label: "X" },
  { href: "https://www.instagram.com/gakusei.union/", icon: Instagram, label: "Instagram" },
  { href: "https://www.youtube.com/@%E5%AD%A6%E7%94%9F%E5%9B%A3%E4%BD%93%E9%80%A3%E5%90%88UNION/videos", icon: Youtube, label: "YouTube" },
  { href: "mailto:gakusei.union226@gmail.com", icon: Mail, label: "Email" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white border-t border-gray-800">
      <div className="union-container py-12 lg:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 mb-12">
          {footerCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2.5">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/" className="flex items-center">
              <NextImage
                src="/images/footer-logo.png"
                alt="UNION 学生団体連合"
                width={120}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              学生の声を社会に響かせる。全国の学生団体と学生が参加するコミュニティ。
            </p>
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            © 2025 学生団体連合UNION. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              利用規約
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/brand" className="text-gray-400 hover:text-white text-sm transition-colors">
              ブランドガイドライン
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/admin/login"
            className="inline-block opacity-10 hover:opacity-70 transition-opacity"
            title="管理者ログイン"
          >
            <Settings className="h-3 w-3 text-gray-500" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
