import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="h-8 w-8 text-[#066ff2] animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">読み込み中...</h2>
        <p className="text-gray-600 dark:text-gray-300">しばらくお待ちください</p>
      </div>
    </div>
  )
}
