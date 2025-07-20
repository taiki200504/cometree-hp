"use client"

export interface FavoriteItem {
  id: number
  title: string
  category: string
  date: string
  author: string
}

export const getFavorites = (): FavoriteItem[] => {
  if (typeof window === "undefined") return []
  const favorites = localStorage.getItem("union-favorites")
  return favorites ? JSON.parse(favorites) : []
}

export const addToFavorites = (item: FavoriteItem): void => {
  if (typeof window === "undefined") return
  const favorites = getFavorites()
  const isAlreadyFavorite = favorites.some((fav) => fav.id === item.id)
  if (!isAlreadyFavorite) {
    const updatedFavorites = [...favorites, item]
    localStorage.setItem("union-favorites", JSON.stringify(updatedFavorites))
  }
}

export const removeFromFavorites = (id: number): void => {
  if (typeof window === "undefined") return
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter((fav) => fav.id !== id)
  localStorage.setItem("union-favorites", JSON.stringify(updatedFavorites))
}

export const isFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false
  const favorites = getFavorites()
  return favorites.some((fav) => fav.id === id)
}
