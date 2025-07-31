import { useState, useEffect } from 'react'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ページリロード時は常にアニメーションを表示
    setIsFirstVisit(true)
    setIsLoading(false)
  }, [])

  return { isFirstVisit, isLoading }
} 