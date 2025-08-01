import { useState, useEffect, useRef } from 'react'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // 一度だけ初期化する
    if (!hasInitialized.current) {
      // Check if this is the first visit by checking localStorage
      const hasVisited = localStorage.getItem('union-has-visited')
      if (!hasVisited) {
        setIsFirstVisit(true)
        // Mark as visited
        localStorage.setItem('union-has-visited', 'true')
      } else {
        setIsFirstVisit(false)
      }
      setIsLoading(false)
      hasInitialized.current = true
    }
  }, [])

  return { isFirstVisit, isLoading }
} 