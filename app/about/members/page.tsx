import type { Metadata } from "next"
import Image from "next/image"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Users, Award, Heart, Lightbulb, Crown, MessageSquare, Quote, Star, Sparkles } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "運営メンバー紹介 | UNION 学生団体連合",
  description:
    "UNIONは多様なバックグラウンドを持つ学生メンバーで構成されています。情熱×専門性を武器に、学生の声を社会に届けます。",
}

interface Member {
  id: string
  name: string
  position: string
  university: string
  profile: string
  image_url?: string
  is_representative: boolean
  representative_message?: string
  category: 'core' | 'advisor' | 'staff'
  tags: string[]
  created_at: string
}

interface RepresentativeMessage {
  id: string
  title: string
  content: string
  author_name: string
  author_position: string
  author_image?: string
  created_at: string
}

async function getMembers(): Promise<Member[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/members`, {
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error('Failed to fetch members')
    }
    const data = await response.json()
    return data.members || []
  } catch (error) {
    console.error('Error fetching members:', error)
    return []
  }
}

async function getRepresentativeMessages(): Promise<RepresentativeMessage[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/representative-messages`, {
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error('Failed to fetch representative messages')
    }
    const data = await response.json()
    return data.messages || []
  } catch (error) {
    console.error('Error fetching representative messages:', error)
    return []
  }
}

export default async function MembersPage() {
  const members = await getMembers()
  const representativeMessages = await getRepresentativeMessages()

  const coreMembers = members.filter(member => member.category === 'core')
  const advisors = members.filter(member => member.category === 'advisor')
  const representatives = members.filter(member => member.is_representative)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <ModernHero
        subtitle="Our Team"
        title="運営メンバー紹介"
        description="UNIONは多様なバックグラウンドを持つ学生メンバーで構成されています。情熱×専門性を武器に、学生の声を社会に届けます。"
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 代表の声セクション */}
          {representativeMessages.length > 0 && (
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium mb-6 border border-red-100 dark:border-red-800">
                  <Crown className="w-4 h-4 mr-2" />
                  Representative&apos;s Message
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">代表の声</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  UNIONの代表から皆様へのメッセージ
                </p>
              </div>
            </AnimatedSection>
          )}

          {representativeMessages.map((message, index) => (
            <AnimatedSection key={message.id} delay={index * 0.2}>
              <div className="mb-20">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-12 border-2 border-red-200 dark:border-red-800">
                  <div className="flex items-start space-x-8">
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                        {message.author_image ? (
                          <Image
                            src={message.author_image}
                            alt={message.author_name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
                            <Crown className="h-12 w-12 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {message.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{message.author_name}</span>
                          <span>•</span>
                          <span>{message.author_position}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-red-400 opacity-50" />
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                          {message.content}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          代表メッセージ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* コアチーム */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
                <Users className="w-4 h-4 mr-2" />
                Core Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">コアチーム</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                UNIONの中核を担う学生メンバーたち
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {coreMembers.map((member, index) => (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:scale-105">
                  <div className="relative h-64">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <Users className="h-16 w-16 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm opacity-90">{member.position}</p>
                      {member.is_representative && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Crown className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400">代表</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#066ff2] dark:text-blue-400 font-medium mb-2">{member.university}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{member.profile}</p>
                    
                    {/* Tags */}
                    {member.tags && member.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {member.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 顧問・アドバイザー */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
                <Award className="w-4 h-4 mr-2" />
                Advisors
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">顧問・アドバイザー</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                UNIONの活動を支援してくださる経験豊富なアドバイザーの皆様
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {advisors.map((advisor, index) => (
              <AnimatedSection key={advisor.id} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      {advisor.image_url ? (
                        <Image
                          src={advisor.image_url}
                          alt={advisor.name}
                          width={120}
                          height={120}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-30 h-30 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <Award className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{advisor.name}</h3>
                      <p className="text-[#066ff2] dark:text-blue-400 font-medium mb-3">{advisor.position}</p>

                      {/* Tags */}
                      {advisor.tags && advisor.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {advisor.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            <Heart className="w-4 h-4 mr-2 text-[#ec4faf]" />
                            学生団体に期待すること
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {advisor.profile}
                          </p>
                        </div>

                        <div>
                          <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            <Lightbulb className="w-4 h-4 mr-2 text-[#066ff2]" />
                            経歴・大学
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {advisor.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 更新情報 */}
          <AnimatedSection>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#066ff2]" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  メンバー情報は随時更新されます。最新情報はCMS連携で自動反映。
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                最終更新: {new Date().toLocaleDateString('ja-JP')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
