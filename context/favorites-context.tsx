"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getFavorites, addToFavorites, removeFromFavorites, isFavorite } from "@/lib/favorites"

interface FavoriteItem {
  id: number
  title: string
  category: string
  date: string
  author: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: number) => void
  isItemFavorite: (id: number) => boolean
  refreshFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    // 初期化時にローカルストレージからお気に入りを読み込み
    const loadFavorites = () => {
      try {
        const storedFavorites = getFavorites()
        setFavorites(storedFavorites)
      } catch (error) {
        console.error("お気に入りの読み込みに失敗しました:", error)
      }
    }

    loadFavorites()
  }, [])

  const addFavorite = (item: FavoriteItem) => {
    try {
      addToFavorites(item)
      setFavorites(prev => [...prev, item])
    } catch (error) {
      console.error("お気に入りの追加に失敗しました:", error)
    }
  }

  const removeFavorite = (id: number) => {
    try {
      removeFromFavorites(id)
      setFavorites(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error("お気に入りの削除に失敗しました:", error)
    }
  }

  const isItemFavorite = (id: string) => {
    try {
      return isFavorite(id)
    } catch (error) {
      console.error("お気に入り状態の確認に失敗しました:", error)
      return false
    }
  }

  const refreshFavorites = () => {
    try {
      const storedFavorites = getFavorites()
      setFavorites(storedFavorites)
    } catch (error) {
      console.error("お気に入りの更新に失敗しました:", error)
    }
  }

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isItemFavorite,
    refreshFavorites,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
} 