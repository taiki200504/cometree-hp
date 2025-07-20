import { useState, useEffect } from 'react'

export interface StatsData {
  organizationCount: number
  memberCount: number
  partnerCount: number
  prefectureCount: number
  mediaCount: number
}

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        // エラー時のフォールバックデータ
        setStats({
          organizationCount: 100,
          memberCount: 3000,
          partnerCount: 30,
          prefectureCount: 10,
          mediaCount: 4,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
} 