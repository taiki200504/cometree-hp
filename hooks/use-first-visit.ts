import { useState, useEffect } from 'react'

const FIRST_VISIT_KEY = 'union_first_visit_done'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const done = sessionStorage.getItem(FIRST_VISIT_KEY)
      setIsFirstVisit(!done)
    } catch {
      setIsFirstVisit(false)
    }
  }, [])

  const isLoading = isFirstVisit === null
  return { isFirstVisit: isFirstVisit === true, isLoading }
} 