"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: number
  name: string
  logo: string
  description?: string
}

interface CarouselProps {
  items: CarouselItem[]
  title: string
}

const Carousel = memo(({ items, title }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  // レスポンシブ対応
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3)
      } else {
        setItemsPerPage(4)
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, items.length - itemsPerPage)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }, [items.length, itemsPerPage])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, items.length - itemsPerPage)
      return prev === 0 ? maxIndex : prev - 1
    })
  }, [items.length, itemsPerPage])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage)
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const currentPage = Math.floor(currentIndex / itemsPerPage)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            disabled={items.length <= itemsPerPage}
            aria-label="前へ"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            disabled={items.length <= itemsPerPage}
            aria-label="次へ"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {visibleItems.map((item) => (
          <div key={item.id} className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                {item.name.slice(0, 2)}
              </span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm mb-1">{item.name}</h4>
            {item.description && <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentPage === index ? "bg-[#066ff2]" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`ページ ${index + 1} に移動`}
            />
          ))}
        </div>
      )}
    </div>
  )
})

Carousel.displayName = "Carousel"

export default Carousel
