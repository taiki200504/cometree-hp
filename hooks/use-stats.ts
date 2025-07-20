"use client"

import { useState, useEffect } from 'react'

export interface StatsData {
  organizationCount: number
  memberCount: number
  eventCount: number
}

export function useStats(): StatsData | null {
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
  }, [])

  return stats
} 