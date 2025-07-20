"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "slideInLeft" | "slideInRight"
  delay?: number
  className?: string
}

export default function AnimatedSection({
  children,
  animation = "fadeInUp",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1000 ease-out"

    if (!isVisible) {
      switch (animation) {
        case "fadeIn":
          return `${baseClass} opacity-0`
        case "fadeInUp":
          return `${baseClass} opacity-0 translate-y-8`
        case "fadeInLeft":
          return `${baseClass} opacity-0 -translate-x-8`
        case "fadeInRight":
          return `${baseClass} opacity-0 translate-x-8`
        case "slideInLeft":
          return `${baseClass} opacity-0 -translate-x-full`
        case "slideInRight":
          return `${baseClass} opacity-0 translate-x-full`
        default:
          return `${baseClass} opacity-0 translate-y-8`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0`
  }

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}

export { AnimatedSection }
