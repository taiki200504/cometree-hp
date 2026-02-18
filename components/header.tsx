"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
  }, [])

  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
      }
    }

    if (isMenuOpen || activeDropdown) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen, activeDropdown, closeMenu])

  const navigationLinks = [
    { href: "/", label: "ホーム" },
    {
      href: "/for-students",
      label: "学生向け",
      hasDropdown: true,
      dropdownItems: [
        { href: "/for-students", label: "学生向けトップ" },
        { href: "/for-students/unimate", label: "UNIMATE（個人）" },
        { href: "/for-students/union", label: "UNION（団体）" },
        { href: "/for-students/faq", label: "よくある質問" },
      ],
    },
    {
      href: "/for-corporate",
      label: "法人向け",
      hasDropdown: true,
      dropdownItems: [
        { href: "/for-corporate", label: "法人向けトップ" },
        { href: "/for-corporate/service", label: "サービス紹介" },
        { href: "/for-corporate/benefits", label: "法人のメリット" },
        { href: "/for-corporate/plan", label: "プラン" },
        { href: "/for-corporate/flow", label: "導入フロー" },
        { href: "/for-corporate/projects", label: "案件募集" },
        { href: "/for-corporate/events", label: "イベント連携" },
        { href: "/for-corporate/contact", label: "相談・お問い合わせ" },
        { href: "/for-corporate/faq", label: "よくある質問" },
      ],
    },
    { href: "/events", label: "イベント" },
    { href: "/media", label: "メディア" },
    { href: "/about", label: "運営会社" },
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

  // ドロップダウンアイテムクリック時の処理（メニューを閉じない）
  const handleDropdownItemClick = useCallback(() => {
    // ドロップダウンメニューは開いたままにする
    setIsMenuOpen(false) // モバイルメニューのみ閉じる
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-[var(--union-section-alt)]/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-[var(--union-border)]"
            : "bg-[var(--union-section-alt)]/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-[var(--union-border)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* ロゴエリア */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <NextImage
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
                      <button className="flex items-center text-[var(--union-text)] hover:text-[#066ff2] transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-[var(--union-section-bg)] text-sm">
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
                        <div className="bg-[var(--union-section-alt)] rounded-lg shadow-lg border border-[var(--union-border)] py-2 overflow-hidden">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleDropdownItemClick}
                              className="block px-4 py-2 text-sm text-[var(--union-text)] hover:text-[#066ff2] hover:bg-[var(--union-section-bg)] transition-colors duration-200"
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
                      className="text-[var(--union-text)] hover:text-[#066ff2] transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-[var(--union-section-bg)] text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* 右側：主CTA + テーマ + ハンバーガー */}
            <div className="flex items-center gap-3">
              <Link
                href="/for-students"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[var(--union-primary)] hover:bg-[var(--union-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--union-primary)] focus-visible:ring-offset-2"
              >
                参加する
              </Link>
              <ThemeToggle />

              {/* ハンバーガーメニューボタン */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--union-border)] bg-[var(--union-section-alt)] text-[var(--union-text)] hover:bg-[var(--union-section-bg)] transition-colors duration-200"
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
        data-mobile-menu={isMenuOpen ? "open" : "closed"}
      >
        <div className="bg-[var(--union-section-alt)] border-b border-[var(--union-border)] shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
                <Link
                  href="/for-students"
                  className="flex items-center justify-center w-full py-3 rounded-lg text-sm font-semibold text-white bg-[var(--union-primary)] hover:opacity-90 mb-4"
                  onClick={closeMenu}
                >
                  参加する
                </Link>
            {navigationLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-[var(--union-text)] hover:text-[#066ff2] transition-colors duration-200 font-medium rounded-lg hover:bg-[var(--union-section-bg)]"
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
                        className="block px-3 py-2 text-sm text-[var(--union-text-muted)] hover:text-[#066ff2] transition-colors duration-200 rounded-lg hover:bg-[var(--union-section-bg)]"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// Named exportも追加
export { Header }
