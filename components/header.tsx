"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X, Grid3X3 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const allMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // スクロール処理
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // メニューを閉じる関数
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setIsAllMenuOpen(false)
  }, [])

  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
      }
    }

    if (isMenuOpen || activeDropdown || isAllMenuOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen, activeDropdown, isAllMenuOpen, closeMenu])

  const navigationLinks = [
    { href: "/", label: "ホーム" },
    {
      href: "/about",
      label: "About",
      hasDropdown: true,
      dropdownItems: [
        { href: "/about", label: "理念・組織概要" },
        { href: "/about/members", label: "運営メンバー紹介" },
        { href: "/about/initiatives", label: "事業内容" },
        { href: "/about/supporters", label: "ご支援者様" },
        { href: "/join/staff", label: "運営メンバーになる" },
      ],
    },
    {
      href: "/services",
      label: "サービス",
      hasDropdown: true,
      dropdownItems: [
        { href: "/services?tab=student", label: "学生向けサービス" },
        { href: "/services?tab=corporate", label: "企業向けサービス" },
      ],
    },
    {
      href: "/media",
      label: "メディア",
      hasDropdown: true,
      dropdownItems: [
        { href: "/media", label: "メディア事業概要" },
        { href: "/media/podcast", label: "ポッドキャスト" },
        { href: "/media/studentnews", label: "UNION Weekly News" },
        { href: "/board", label: "掲示板" },
      ],
    },
    {
      href: "/community",
      label: "コミュニティ",
      hasDropdown: true,
      dropdownItems: [
        { href: "/community", label: "コミュニティ概要" },
        { href: "/community/organizations", label: "加盟団体一覧" },
        { href: "/community/partners", label: "提携企業一覧" },
        { href: "/community/slack", label: "Slackコミュニティ" },
        { href: "/community/guild", label: "Media Guild" },
        { href: "/community/portal/login", label: "加盟団体専用" },
      ],
    },

    { href: "/news", label: "お知らせ" },
    {
      href: "/join",
      label: "参加する",
      hasDropdown: true,
      dropdownItems: [
        { href: "/join", label: "参加方法のご案内" },
        { href: "/join/organization", label: "団体として加盟" },
        { href: "/join/corporate", label: "企業として提携/協賛" },
      ],
    },
    {
      href: "/contact",
      label: "お問い合わせ",
      hasDropdown: true,
      dropdownItems: [
        { href: "/contact", label: "お問い合わせ" },
        { href: "/join/donate", label: "ご寄付について" },
        { href: "/contact/services", label: "提供サービス申し込み一覧" },
      ],
    },
  ]

  // 全ページリスト（ALLボタン用）
  const allPages = [
    {
      category: "基本ページ",
      items: [
        { href: "/", label: "ホーム" },
        { href: "/news", label: "お知らせ" },
      ],
    },
    {
      category: "About",
      items: [
        { href: "/about", label: "理念・組織概要" },
        { href: "/about/members", label: "運営メンバー紹介" },
        { href: "/about/initiatives", label: "事業内容" },
        { href: "/about/supporters", label: "ご支援者様" },
      ],
    },
    {
      category: "サービス",
      items: [
        { href: "/services", label: "サービス概要" },
        { href: "/services?tab=student", label: "学生向けサービス" },
        { href: "/services?tab=corporate", label: "企業向けサービス" },
      ],
    },
    {
      category: "メディア",
      items: [
        { href: "/media", label: "メディア事業概要" },
        { href: "/media/podcast", label: "ポッドキャスト" },
        { href: "/media/studentnews", label: "UNION Weekly News" },
        { href: "/board", label: "掲示板" },
        { href: "/board/favorites", label: "お気に入り掲示板" },
      ],
    },
    {
      category: "コミュニティ",
      items: [
        { href: "/community", label: "コミュニティ概要" },
        { href: "/community/organizations", label: "加盟団体一覧" },
        { href: "/community/partners", label: "提携企業一覧" },
        { href: "/community/slack", label: "Slackコミュニティ" },
        { href: "/community/guild", label: "Media Guild" },
        { href: "/community/portal/login", label: "加盟団体専用" },
      ],
    },
    {
      category: "参加・お問い合わせ",
      items: [
        { href: "/join", label: "参加方法のご案内" },
        { href: "/join/staff", label: "運営メンバーになる" },
        { href: "/join/organization", label: "団体として加盟" },
        { href: "/join/corporate", label: "企業として提携/協賛" },
        { href: "/join/donate", label: "ご寄付について" },
        { href: "/contact", label: "お問い合わせ" },
        { href: "/contact/services", label: "提供サービス申し込み一覧" },
      ],
    },
    {
      category: "その他",
      items: [
        { href: "/favorites", label: "お気に入り" },
        { href: "/brand", label: "ブランドガイドライン" },
        { href: "/privacy", label: "プライバシーポリシー" },
      ],
    },
  ]

  // ダークモードかどうかを判定（ハイドレーションエラーを防ぐため、mounted状態を確認）
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDarkMode = mounted && resolvedTheme === "dark"

  // ドロップダウンメニューのホバー処理を改善
  const handleDropdownEnter = useCallback((menuType: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setActiveDropdown(menuType)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  // ALLメニューのホバー処理
  const handleAllMenuEnter = useCallback(() => {
    if (allMenuTimeoutRef.current) {
      clearTimeout(allMenuTimeoutRef.current)
      allMenuTimeoutRef.current = null
    }
    setIsAllMenuOpen(true)
  }, [])

  const handleAllMenuLeave = useCallback(() => {
    allMenuTimeoutRef.current = setTimeout(() => {
      setIsAllMenuOpen(false)
    }, 150)
  }, [])

  // ドロップダウンアイテムクリック時の処理（メニューを閉じない）
  const handleDropdownItemClick = useCallback(() => {
    // ドロップダウンメニューは開いたままにする
    setIsMenuOpen(false) // モバイルメニューのみ閉じる
  }, [])

  // ALLメニューアイテムクリック時の処理
  const handleAllMenuItemClick = useCallback(() => {
    setIsAllMenuOpen(false)
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* ロゴエリア */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <Image
                  src={mounted && isDarkMode ? "/images/header-logo-dark.png" : "/images/header-logo.png"}
                  alt="UNION 学生団体連合"
                  width={120}
                  height={32}
                  className="h-8 w-auto transition-all duration-300 hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* デスクトップナビゲーション */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <div key={link.href} className="relative group">
                  {link.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(link.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#066ff2] dark:hover:text-[#066ff2] transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                        {link.label}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === link.label ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>

                      {/* ドロップダウンメニュー */}
                      <div
                        className={`absolute top-full left-0 mt-1 w-56 transition-all duration-200 ${
                          activeDropdown === link.label
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        }`}
                        onMouseEnter={() => handleDropdownEnter(link.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 overflow-hidden">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleDropdownItemClick}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#066ff2] dark:hover:text-[#066ff2] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-[#066ff2] dark:hover:text-[#066ff2] transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* 右側のアクション */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />

              {/* デスクトップALLボタン */}
              <div className="hidden lg:block relative">
                <div onMouseEnter={handleAllMenuEnter} onMouseLeave={handleAllMenuLeave}>
                  <button className="flex items-center bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 text-sm">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    ALL
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isAllMenuOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* ALLメニュードロップダウン */}
                  <div
                    className={`absolute top-full right-0 mt-1 w-80 transition-all duration-200 ${
                      isAllMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                    onMouseEnter={handleAllMenuEnter}
                    onMouseLeave={handleAllMenuLeave}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 overflow-hidden max-h-96 overflow-y-auto">
                      {allPages.map((category) => (
                        <div key={category.category} className="mb-2">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                            {category.category}
                          </div>
                          {category.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleAllMenuItemClick}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#066ff2] dark:hover:text-[#066ff2] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ハンバーガーメニューボタン */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                aria-expanded={isMenuOpen}
              >
                <div className="relative">
                  <Menu
                    className={`h-5 w-5 transition-all duration-200 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                  />
                  <X
                    className={`h-5 w-5 absolute inset-0 transition-all duration-200 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* モバイルメニューオーバーレイ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-200"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* モバイルメニュー */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          isMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {navigationLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-[#066ff2] dark:hover:text-[#066ff2] transition-colors duration-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="ml-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-4 mt-2">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#066ff2] dark:hover:text-[#066ff2] transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* モバイル用ALLメニュー */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-4 py-3 rounded-lg font-medium text-center mb-4">
                <Grid3X3 className="h-4 w-4 inline mr-2" />
                全ページ一覧
              </div>
              <div className="space-y-4">
                {allPages.map((category) => (
                  <div key={category.category}>
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {category.category}
                    </div>
                    <div className="ml-2 space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#066ff2] dark:hover:text-[#066ff2] transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Named exportも追加
export { Header }
