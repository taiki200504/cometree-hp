"use client"

import Link from "next/link"
import NextImage from "next/image"
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
      href: "https://x.com/UNION_gakusei26",
      icon: Twitter,
      label: "X",
      color: "hover:text-blue-400",
    },
    {
      href: "https://www.instagram.com/gakusei.union/",
      icon: Instagram,
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      href: "https://www.youtube.com/@%E5%AD%A6%E7%94%9F%E5%9B%A3%E4%BD%93%E9%80%A3%E5%90%88UNION/videos",
      icon: Youtube,
      label: "YouTube",
      color: "hover:text-red-500",
    },
    {
      href: "mailto:gakusei.union226@gmail.com",
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
              <NextImage
                src="/images/footer-logo.png"
                alt="UNION 学生団体連合"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              学生の声を社会に響かせる。全国60の学生団体、1800名の学生が参加するコミュニティ。学生から熱狂を生み出せる世界を作る。
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
            {/* 隠し管理者ログインボタン */}
            <div className="mt-4">
              <Link
                href="/admin/login"
                className="block w-full h-8 bg-transparent hover:bg-gray-800/20 transition-all duration-300 rounded-md border border-transparent hover:border-gray-600/30"
                title="管理者ログイン"
                style={{
                  opacity: 0.1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.1';
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <Settings className="h-3 w-3 text-gray-500" />
                </div>
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
              © 2025 学生団体連合UNION. All rights reserved.
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
