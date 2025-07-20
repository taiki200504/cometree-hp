"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { useFavorites } from "@/context/favorites-context"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  itemId: string
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function FavoriteButton({ itemId, className, size = "md", showText = false }: FavoriteButtonProps) {
  const { isFavorite = () => false, addFavorite = () => {}, removeFavorite = () => {} } = useFavorites() || {};
  const favorited = isFavorite(itemId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorited) {
      removeFavorite(itemId)
    } else {
      addFavorite(itemId)
    }
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const buttonSizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110",
        "bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800",
        "border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500",
        "shadow-sm hover:shadow-md",
        buttonSizeClasses[size],
        className,
      )}
      aria-label={favorited ? "お気に入りから削除" : "お気に入りに追加"}
      title={favorited ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          "transition-colors duration-200",
          favorited ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500",
        )}
      />
      {showText && (
        <span
          className={cn("ml-1 text-sm font-medium", favorited ? "text-red-500" : "text-gray-600 dark:text-gray-300")}
        >
          {favorited ? "お気に入り済み" : "お気に入り"}
        </span>
      )}
    </button>
  )
}
