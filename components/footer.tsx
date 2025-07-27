"use client"

import Link from "next/link"
import Image from "next/image"
import { Twitter, Instagram, Youtube, Mail, ExternalLink, Settings } from "lucide-react"

export default function Footer() {
  const footerLinks = {
    about: [
      { href: "/about", label: "理念・組織概要" },
      { href: "/about/members", label: "運営メンバー紹介" },
      { href: "/about/initiatives", label: "事業内容" },
      { href: "/about/students", label: "学生向け取り組み" },
      { href: "/about/community", label: "コミュニティ" },
      { href: "/media", label: "メディア出演" },
    ],
    services: [
      { href: "/services", label: "サービス概要" },
      { href: "/services?tab=student", label: "学生向けサービス" },
      { href: "/services?tab=corporate", label: "企業向けサービス" },
    ],
    community: [
      { href: "/community", label: "コミュニティ概要" },
      { href: "/community/slack", label: "学生Slackコミュニティ" },
      { href: "/community/guild", label: "UNION Media Guild" },
      { href: "/community/organizations", label: "加盟団体一覧" },
      { href: "/community/partners", label: "提携企業一覧" },
    ],
    media: [
      { href: "/studentnews", label: "学生団体ニュース" },
      { href: "/podcast", label: "Podcast" },
      { href: "/board", label: "掲示板" },
      { href: "/news", label: "お知らせ" },
    ],
    join: [
      { href: "/join", label: "参加方法のご案内" },
      { href: "/join/staff", label: "運営メンバーになる" },
      { href: "/join/organization", label: "団体として加盟" },
      { href: "/join/corporate", label: "企業として提携/協賛" },
      { href: "/join/donate", label: "ご寄付について" },
    ],
    support: [
      { href: "/contact", label: "お問い合わせ" },
      { href: "/contact/services", label: "サービス申し込み" },
      { href: "/about/supporters", label: "ご支援者様一覧" },
      { href: "/community/portal", label: "加盟団体専用ページ" },
    ],
  }

  const socialLinks = [
    {
      href: "https://twitter.com/UNION_gakusei26",
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      href: "https://www.instagram.com/union_gakusei/",
      icon: Instagram,
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      href: "https://www.youtube.com/@union_gakusei",
      icon: Youtube,
      label: "YouTube",
      color: "hover:text-red-500",
    },
    {
      href: "mailto:info@union-gakusei.org",
      icon: Mail,
      label: "Email",
      color: "hover:text-green-400",
    },
  ]

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* メインフッターコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* ブランド情報 */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/footer-logo.png"
                alt="UNION 学生団体連合"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              学生の声を社会に響かせる。全国85の学生団体、1200名の学生が参加するコミュニティ。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            {/* 管理者ログインボタン */}
            <div className="mt-4">
              <Link
                href="/admin/login"
                className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-all duration-200 border border-gray-600 hover:border-gray-500"
                title="管理者ログイン"
              >
                <Settings className="h-4 w-4 mr-2" />
                管理者ログイン
              </Link>
            </div>
          </div>

          {/* UNIONについて */}
          <div>
            <h3 className="text-white font-semibold mb-4">UNIONについて</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サービス・コミュニティ */}
          <div>
            <h3 className="text-white font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mb-4">コミュニティ</h3>
            <ul className="space-y-2">
              {footerLinks.community.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 参加・サポート */}
          <div>
            <h3 className="text-white font-semibold mb-4">参加する</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.join.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mb-4">サポート</h3>
            <ul className="space-y-2">
              {footerLinks.support.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 学生団体連合UNION. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/brand"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                ブランドガイドライン
              </Link>
            </div>
          </div>
        </div>


      </div>
    </footer>
  )
}

// Named exportも追加
export { Footer }
