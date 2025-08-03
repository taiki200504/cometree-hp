"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  TestTube,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AdminTest() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (!isAuthenticated) {
      return
    }
  }, [requireAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])

    const tests = [
      {
        name: '認証テスト',
        test: async () => {
          return user ? 'PASS' : 'FAIL'
        }
      },
      {
        name: '統計APIテスト',
        test: async () => {
          try {
            const response = await fetch('/api/admin/stats')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: 'ニュース作成ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/news/create')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: 'イベント作成ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/events/create')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: '掲示板管理ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/board')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: '掲示板作成ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/board/create')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: '加盟団体管理ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/organizations')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: '提携団体管理ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/partners')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      },
      {
        name: '運営メンバー管理ページテスト',
        test: async () => {
          try {
            const response = await fetch('/admin/members')
            return response.ok ? 'PASS' : 'FAIL'
          } catch {
            return 'FAIL'
          }
        }
      }
    ]

    for (const test of tests) {
      try {
        const result = await test.test()
        setTestResults(prev => [...prev, { name: test.name, result }])
      } catch (error) {
        setTestResults(prev => [...prev, { name: test.name, result: 'ERROR' }])
      }
    }

    setIsRunning(false)
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'PASS':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'FAIL':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'PASS':
        return 'text-green-600'
      case 'FAIL':
        return 'text-red-600'
      default:
        return 'text-yellow-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <TestTube className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">動作確認テスト</h1>
              </div>
            </div>
            <Button onClick={runTests} disabled={isRunning}>
              {isRunning ? 'テスト実行中...' : 'テスト実行'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>管理画面機能テスト</CardTitle>
            <CardDescription>
              各機能の動作確認を行います
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testResults.length === 0 ? (
              <div className="text-center py-8">
                <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">「テスト実行」ボタンをクリックしてテストを開始してください</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">{test.name}</span>
                    <div className="flex items-center space-x-2">
                      {getResultIcon(test.result)}
                      <span className={`font-medium ${getResultColor(test.result)}`}>
                        {test.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 