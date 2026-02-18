"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function JoinRedirect() {
  const router = useRouter()

  useEffect(() => {
    // 学生向けトップページにリダイレクト
    router.replace("/for-students")
  }, [router])

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="union-body">リダイレクト中...</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
