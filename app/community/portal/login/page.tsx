"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Users, Lock, ArrowRight, Shield } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PortalLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)

    if (result.success) {
      router.push("/community/portal")
    } else {
      setError(result.error || "ログインに失敗しました")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <ModernHero
        subtitle="加盟団体専用"
        title="ログイン"
        description="UNION加盟団体専用サービスにログインしてください"
      />

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ログインフォーム */}
            <AnimatedSection>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">加盟団体ログイン</h2>
                  <p className="text-gray-600 dark:text-gray-300">専用サービスにアクセスするにはログインが必要です</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your-organization@example.com"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      パスワード
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="パスワードを入力"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#066ff2] focus:ring-[#066ff2]"
                        disabled={loading}
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">ログイン状態を保持</span>
                    </label>
                    <Link
                      href="#"
                      className="text-sm text-[#066ff2] hover:text-[#ec4faf] transition-colors duration-200"
                    >
                      パスワードを忘れた方
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "ログイン中..." : "ログイン"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    まだ加盟団体ではありませんか？{" "}
                    <Link
                      href="/join/organization"
                      className="text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-200"
                    >
                      加盟申請はこちら
                    </Link>
                  </p>
                </div>

                {/* テスト用アカウント情報 */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">テスト用アカウント</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    メール: test@union.org<br />
                    パスワード: password123
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* 専用サービスの説明 */}
            <AnimatedSection delay={200}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">加盟団体専用サービス</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    ログイン後は、UNION加盟団体限定の各種サービスをご利用いただけます。
                    メンバー管理、イベント企画、他団体との連携など、団体運営をサポートする機能を提供しています。
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#066ff2] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">メンバー管理</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">団体メンバーの情報管理と権限設定</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#ec4faf] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">専用掲示板</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">加盟団体限定の情報共有スペース</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#f59e0b] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">イベント企画</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">他団体とのコラボレーション企画</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-2">セキュリティについて</h4>
                  <p className="text-sm opacity-90">
                    加盟団体の情報は適切に暗号化され、安全に管理されています。
                    ログイン情報は厳重に保護され、不正アクセスを防ぐためのセキュリティ対策を実施しています。
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ログインについて</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• 加盟団体の代表者または管理者アカウントが必要です</li>
                    <li>• 初回ログイン時はパスワードの変更をお願いします</li>
                    <li>• アカウント情報の変更はUNION事務局までご連絡ください</li>
                    <li>• セキュリティのため、定期的なパスワード変更を推奨します</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 