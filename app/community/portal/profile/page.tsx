"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  Globe,
  Edit,
  Save,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface OrganizationProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  website: string
  description: string
  memberCount: number
  establishedDate: string
  category: string
  status: "active" | "inactive"
  lastUpdated: string
}

const mockProfile: OrganizationProfile = {
  id: "1",
  name: "テスト学生団体",
  email: "test@union.org",
  phone: "03-1234-5678",
  address: "東京都渋谷区○○○",
  website: "https://example.com",
  description: "学生の社会貢献活動を推進する団体です。地域との連携を重視し、実践的な活動を行っています。",
  memberCount: 25,
  establishedDate: "2020-04-01",
  category: "社会貢献",
  status: "active",
  lastUpdated: "2024-01-15",
}

const organizationCategories = [
  "社会貢献",
  "文化・芸術",
  "スポーツ",
  "学術・研究",
  "国際交流",
  "環境・サステナビリティ",
  "起業・ビジネス",
  "メディア・広報",
  "その他",
]

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<OrganizationProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")
    
    try {
      // 実際の実装ではAPIを呼び出してプロフィールを更新
      await new Promise(resolve => setTimeout(resolve, 1000)) // モック遅延
      
      setSaveStatus("success")
      setIsEditing(false)
      
      // 3秒後に成功メッセージを消す
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setProfile(mockProfile) // 元のデータに戻す
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleInputChange = (field: keyof OrganizationProfile, value: string | number) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#066ff2] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="加盟団体専用"
        title="プロフィール管理"
        description="団体情報の更新と管理を行えます"
        primaryAction={{
          text: "ポータルに戻る",
          href: "/community/portal",
        }}
        secondaryAction={{
          text: "お問い合わせ",
          href: "https://chlorinated-handspring-b13.notion.site/12be5094912580878799d04c56c963a6?pvs=105",
        }}
      />

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 保存ステータス */}
          {saveStatus === "success" && (
            <AnimatedSection animation="fadeInUp" className="mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    プロフィールが正常に更新されました
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {saveStatus === "error" && (
            <AnimatedSection animation="fadeInUp" className="mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    プロフィールの更新に失敗しました。再度お試しください。
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* プロフィール情報 */}
          <AnimatedSection animation="fadeInUp" className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">団体情報</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300">基本情報の管理</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={profile.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                      {profile.status === "active" ? "アクティブ" : "非アクティブ"}
                    </Badge>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        編集
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 団体名 */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4" />
                      団体名
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="団体名を入力"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium">{profile.name}</p>
                    )}
                  </div>

                  {/* メールアドレス */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      メールアドレス
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="メールアドレスを入力"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.email}</p>
                    )}
                  </div>

                  {/* 電話番号 */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4" />
                      電話番号
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="電話番号を入力"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.phone}</p>
                    )}
                  </div>

                  {/* 住所 */}
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      住所
                    </Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="住所を入力"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.address}</p>
                    )}
                  </div>

                  {/* ウェブサイト */}
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4" />
                      ウェブサイト
                    </Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="ウェブサイトURLを入力"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.website}</p>
                    )}
                  </div>

                  {/* カテゴリ */}
                  <div>
                    <Label htmlFor="category" className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      カテゴリ
                    </Label>
                    {isEditing ? (
                      <Select value={profile.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="カテゴリを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.category}</p>
                    )}
                  </div>

                  {/* メンバー数 */}
                  <div>
                    <Label htmlFor="memberCount" className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      メンバー数
                    </Label>
                    {isEditing ? (
                      <Input
                        id="memberCount"
                        type="number"
                        value={profile.memberCount}
                        onChange={(e) => handleInputChange("memberCount", parseInt(e.target.value))}
                        placeholder="メンバー数を入力"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.memberCount}名</p>
                    )}
                  </div>

                  {/* 設立日 */}
                  <div>
                    <Label htmlFor="establishedDate" className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      設立日
                    </Label>
                    {isEditing ? (
                      <Input
                        id="establishedDate"
                        type="date"
                        value={profile.establishedDate}
                        onChange={(e) => handleInputChange("establishedDate", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.establishedDate}</p>
                    )}
                  </div>
                </div>

                {/* 団体説明 */}
                <div className="mt-6">
                  <Label htmlFor="description" className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    団体説明
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={profile.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="団体の活動内容や特徴を入力"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{profile.description}</p>
                  )}
                </div>

                {/* 編集ボタン */}
                {isEditing && (
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white hover:opacity-90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "保存中..." : "保存"}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      disabled={isSaving}
                    >
                      キャンセル
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* 更新履歴 */}
          <AnimatedSection animation="fadeInUp" className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  更新履歴
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">プロフィール情報更新</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">団体説明とメンバー数を更新</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{profile.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">連絡先情報更新</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">電話番号と住所を更新</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024-01-10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* セキュリティ情報 */}
          <AnimatedSection animation="fadeInUp">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  セキュリティ情報
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">アカウント情報</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      ログイン情報やパスワードの変更は、UNION事務局までご連絡ください。
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">データ保護</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      団体情報は適切に暗号化され、安全に管理されています。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
} 