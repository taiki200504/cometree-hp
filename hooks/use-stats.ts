"use client"

import { useState, useEffect } from 'react'

export interface StatsData {
  organizationCount: number
  memberCount: number
  eventCount: number
  partnerCount?: number
  prefectureCount?: number
  mediaCount?: number
}

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch stats:', error)
        setStats(null)
        setLoading(false)
      })
  }, [])

  return {
    stats: stats || {
      organizationCount: 0,
      memberCount: 0,
      eventCount: 0,
      partnerCount: 0,
      prefectureCount: 0
    },
    loading
  }
} 