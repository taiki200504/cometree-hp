import { useState, useEffect, useRef } from 'react'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // 一度だけ初期化する
    if (!hasInitialized.current) {
      setIsFirstVisit(true)
      setIsLoading(false)
      hasInitialized.current = true
    }
  }, [])

  return { isFirstVisit, isLoading }
} 