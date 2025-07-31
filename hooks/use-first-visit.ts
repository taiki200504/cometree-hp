import { useState, useEffect } from 'react'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ローカルストレージから訪問履歴を確認
    const hasVisited = localStorage.getItem('union-has-visited')
    
    if (!hasVisited) {
      // 初回訪問の場合
      setIsFirstVisit(true)
      // 訪問履歴を記録
      localStorage.setItem('union-has-visited', 'true')
    } else {
      // 再訪問の場合
      setIsFirstVisit(false)
    }
    
    setIsLoading(false)
  }, [])

  return { isFirstVisit, isLoading }
} 