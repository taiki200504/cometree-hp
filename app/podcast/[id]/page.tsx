import { createServerSupabaseClient } from "@/lib/supabaseServer"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CalendarDays, Clock, PlayCircle } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Link from "next/link"

interface PodcastEpisode {
  id: string
  title: string
  description: string
  audio_url: string
  published_at: string
  show_name: string
  duration: number // seconds
}

const getPodcastImage = (showName: string) => {
  switch (showName) {
    case "ユニラジ":
      return "/images/podcast/yuniraji.jpg"
    case "ここみゆ":
      return "/images/podcast/cocomiyu.jpg"
    case "ジェネポリ":
      return "/images/podcast/genepoli.png"
    case "キャリアみっけ隊":
      return "/images/podcast/career.png"
    default:
      return "/placeholder.svg?height=200&width=200"
  }
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}分${remainingSeconds > 0 ? `${remainingSeconds}秒` : ""}`
}

export default async function PodcastDetailPage({ params }: { params: { id: string } }) {
  try {
  const supabase = createServerSupabaseClient()
  const { data: episode, error } = await supabase
    .from("podcast_episodes")
    .select("id, title, description, audio_url, published_at, show_name, duration")
    .eq("id", params.id)
    .single()

  if (error || !episode) {
    console.error("Error fetching podcast episode:", error)
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={getPodcastImage(episode.show_name) || "/placeholder.svg"}
              alt={episode.title}
              width={300}
              height={300}
              className="w-full h-64 object-cover md:w-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{episode.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{episode.show_name}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <CalendarDays className="w-4 h-4 mr-1" />
                {episode.published_at
                  ? format(new Date(episode.published_at), "yyyy年M月d日", { locale: ja })
                  : "日付不明"}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                {episode.duration ? formatDuration(episode.duration) : "時間不明"}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{episode.description}</p>
            </div>
            {episode.audio_url && (
              <div className="mt-auto">
                <audio controls className="w-full">
                  <source src={episode.audio_url} type="audio/mpeg" />
                  お使いのブラウザはオーディオ要素をサポートしていません。
                </audio>
                <Link
                  href={episode.audio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#066ff2] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  外部プレイヤーで再生
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  } catch (error) {
    console.error("Error in podcast detail page:", error)
    notFound()
  }
}
