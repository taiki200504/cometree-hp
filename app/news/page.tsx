import { listNews, type NewsRecord } from '@/lib/news'
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { Calendar } from "lucide-react"
import Link from "next/link"

async function getNews(): Promise<NewsRecord[]> {
  const { items } = await listNews({ status: 'published', limit: 60 })
  return items
}

export default async function News() {
  const newsItems = await getNews()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Latest News"
        title="ニュース"
        description="UNIONの最新ニュース・お知らせ・プレスリリースをお届けします"
      />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {newsItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30"></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
                      {item.category ?? 'general'}
                    </span>
                    {item.published_at && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(item.published_at).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1 line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-flex items-center text-[#066ff2] dark:text-blue-400 hover:text-[#ec4faf] dark:hover:text-pink-400 text-sm font-medium mt-auto"
                  >
                    詳細を読む
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">記事がありません</h3>
            <p className="text-gray-600 dark:text-gray-300">現在公開されているお知らせはありません。</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
