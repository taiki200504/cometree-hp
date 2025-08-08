"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  Settings,
  Save,
  Globe,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Key
} from 'lucide-react'
import Link from 'next/link'
import AdminHeading from '@/components/admin/AdminHeading'

export default function AdminSettings() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [settings, setSettings] = useState({
    site: {
      name: 'UNIÓN',
      description: '学生団体連合UNIÓNの公式サイト',
      url: 'https://gakusei-union-6dcmvhfeb-union-022b7003.vercel.app',
      contactEmail: 'gakusei.union226@gmail.com'
    },
    notifications: {
      emailNotifications: true,
      adminNotifications: true,
      weeklyReports: false,
      errorAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      loginAttempts: 5
    },
    appearance: {
      theme: 'auto',
      primaryColor: '#066ff2',
      logoUrl: '/images/header-logo.png'
    }
  })

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (!isAuthenticated) {
      return
    }
    // load settings from server
    fetch('/api/admin/settings')
      .then(async (res) => {
        if (!res.ok) return
        const data = await res.json()
        if (data?.settings) setSettings(data.settings)
      })
      .catch(() => {})
  }, [requireAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const handleSave = async () => {
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings })
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AdminHeading
        title="設定"
        actions={(
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />保存
          </Button>
        )}
      />
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-6">
          {/* Site Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>サイト設定</span>
              </CardTitle>
              <CardDescription>
                サイトの基本情報とメタデータを設定します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">サイト名</Label>
                  <Input
                    id="siteName"
                    value={settings.site.name}
                    onChange={(e) => setSettings({
                      ...settings,
                      site: { ...settings.site, name: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">サイトURL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.site.url}
                    onChange={(e) => setSettings({
                      ...settings,
                      site: { ...settings.site, url: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">サイト説明</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.site.description}
                  onChange={(e) => setSettings({
                    ...settings,
                    site: { ...settings.site, description: e.target.value }
                  })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">連絡先メール</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.site.contactEmail}
                  onChange={(e) => setSettings({
                    ...settings,
                    site: { ...settings.site, contactEmail: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>通知設定</span>
              </CardTitle>
              <CardDescription>
                メール通知とアラートの設定を管理します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">メール通知</Label>
                  <p className="text-sm text-gray-500">重要なイベントのメール通知</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailNotifications: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adminNotifications">管理者通知</Label>
                  <p className="text-sm text-gray-500">管理者向けの特別な通知</p>
                </div>
                <Switch
                  id="adminNotifications"
                  checked={settings.notifications.adminNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, adminNotifications: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReports">週次レポート</Label>
                  <p className="text-sm text-gray-500">週次統計レポートの自動送信</p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyReports: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="errorAlerts">エラーアラート</Label>
                  <p className="text-sm text-gray-500">システムエラーの即座通知</p>
                </div>
                <Switch
                  id="errorAlerts"
                  checked={settings.notifications.errorAlerts}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, errorAlerts: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>セキュリティ設定</span>
              </CardTitle>
              <CardDescription>
                セキュリティとアクセス制御の設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">二要素認証</Label>
                  <p className="text-sm text-gray-500">管理者アカウントの二要素認証</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: checked }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">セッションタイムアウト（分）</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  min="5"
                  max="1440"
                />
              </div>
              <div>
                <Label htmlFor="passwordPolicy">パスワードポリシー</Label>
                <select
                  id="passwordPolicy"
                  value={settings.security.passwordPolicy}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, passwordPolicy: e.target.value }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="weak">弱い（8文字以上）</option>
                  <option value="medium">中程度（10文字以上、記号含む）</option>
                  <option value="strong">強い（12文字以上、大文字小文字数字記号）</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>外観設定</span>
              </CardTitle>
              <CardDescription>
                サイトのテーマとカラーの設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">テーマ</Label>
                <select
                  id="theme"
                  value={settings.appearance.theme}
                  onChange={(e) => setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, theme: e.target.value }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="light">ライト</option>
                  <option value="dark">ダーク</option>
                  <option value="auto">自動</option>
                </select>
              </div>
              <div>
                <Label htmlFor="primaryColor">プライマリカラー</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, primaryColor: e.target.value }
                    })}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.appearance.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, primaryColor: e.target.value }
                    })}
                    placeholder="#066ff2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>データベース設定</span>
              </CardTitle>
              <CardDescription>
                データベースの管理とバックアップ設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>自動バックアップ</Label>
                  <p className="text-sm text-gray-500">日次データベースバックアップ</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  手動バックアップ
                </Button>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  データエクスポート
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 