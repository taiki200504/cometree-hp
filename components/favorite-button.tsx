"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { addToFavorites, removeFromFavorites, isFavorite, type FavoriteItem } from "@/lib/favorites"

interface FavoriteButtonProps {
  item: FavoriteItem
  className?: string
}

const FavoriteButton = ({ item, className = "" }: FavoriteButtonProps) => {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    setFavorited(isFavorite(item.id))
  }, [item.id])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorited) {
      removeFromFavorites(item.id)
      setFavorited(false)
    } else {
      addToFavorites(item)
      setFavorited(true)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 ${
        favorited
          ? "text-red-500 bg-red-50 hover:bg-red-100"
          : "text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500"
      } ${className}`}
      title={favorited ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart className={`h-5 w-5 ${favorited ? "fill-current" : ""}`} />
    </button>
  )
}

export default FavoriteButton
