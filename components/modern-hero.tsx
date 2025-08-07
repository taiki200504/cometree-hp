"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronRight, Play, Lightbulb } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"

interface ModernHeroProps {
  title: string
  subtitle?: string
  description: string
  primaryAction?: {
    text: string
    href: string
    onClick?: () => void
  }
  secondaryAction?: {
    text: string
    href: string
    onClick?: () => void
  }
  backgroundImage?: string
  backgroundPattern?: boolean
  stats?: Array<{
    number: string
    label: string
    icon?: React.ReactNode
  }>
  features?: Array<{
    icon: React.ReactNode
    title: string
    description: string
  }>
  variant?: "default" | "gradient" | "minimal"
}

export function ModernHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  backgroundPattern = false,
  stats,
  features,
  variant = "default",
}: ModernHeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-[#066ff2] via-[#4f46e5] to-[#ec4faf]"
      case "minimal":
        return "bg-gray-50 dark:bg-gray-900"
      default:
        return "bg-white dark:bg-gray-900"
    }
  }

  return (
    <section className={`relative overflow-hidden ${getVariantClasses()}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Background Pattern */}
      {backgroundPattern && <div className="absolute inset-0 bg-grid-pattern opacity-5" />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection className="space-y-8">
            {subtitle && (
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${
                  variant === "gradient"
                    ? "bg-white/20 text-white backdrop-blur-sm"
                    : "bg-[#066ff2]/10 text-[#066ff2] dark:bg-[#066ff2]/20"
                }`}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {subtitle}
              </div>
            )}

            <div
              className={`transition-all duration-500 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                  variant === "gradient" ? "text-white" : "text-gray-900 dark:text-white"
                }`}
              >
                {title}
              </h1>
            </div>

            <div
              className={`transition-all duration-500 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p
                className={`text-lg sm:text-xl leading-relaxed ${
                  variant === "gradient" ? "text-white/90" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {description}
              </p>
            </div>

            {/* Action Buttons */}
            {(primaryAction || secondaryAction) && (
              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {primaryAction && (
                  primaryAction.onClick ? (
                    <button
                      onClick={primaryAction.onClick}
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        variant === "gradient"
                          ? "bg-white text-[#066ff2] hover:bg-gray-100"
                          : "bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white hover:opacity-90"
                      }`}
                    >
                      {primaryAction.text}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  ) : (
                    <Link
                      href={primaryAction.href}
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        variant === "gradient"
                          ? "bg-white text-[#066ff2] hover:bg-gray-100"
                          : "bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white hover:opacity-90"
                      }`}
                    >
                      {primaryAction.text}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  )
                )}

                {secondaryAction && (
                  secondaryAction.onClick ? (
                    <button
                      onClick={secondaryAction.onClick}
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105 ${
                        variant === "gradient"
                          ? "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#066ff2] hover:text-[#066ff2] dark:hover:border-[#066ff2] dark:hover:text-[#066ff2]"
                      }`}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      {secondaryAction.text}
                    </button>
                  ) : (
                    <Link
                      href={secondaryAction.href}
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 hover:scale-105 ${
                        variant === "gradient"
                          ? "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#066ff2] hover:text-[#066ff2] dark:hover:border-[#066ff2] dark:hover:text-[#066ff2]"
                      }`}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      {secondaryAction.text}
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Stats */}
            {stats && (
              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t transition-all duration-500 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${variant === "gradient" ? "border-white/20" : "border-gray-200 dark:border-gray-700"}`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    {stat.icon && (
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-2 ${
                          variant === "gradient" ? "bg-white/20 text-white" : "bg-[#066ff2]/10 text-[#066ff2]"
                        }`}
                      >
                        {stat.icon}
                      </div>
                    )}
                    <div
                      className={`text-2xl font-bold ${
                        variant === "gradient" ? "text-white" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className={`text-sm ${
                        variant === "gradient" ? "text-white/80" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Features or Visual Content */}
          {features && (
            <AnimatedSection className="space-y-6">
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                      variant === "gradient"
                        ? "bg-white/10 backdrop-blur-sm border border-white/20"
                        : "bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        variant === "gradient"
                          ? "bg-white/20 text-white"
                          : "bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          variant === "gradient" ? "text-white" : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className={`${variant === "gradient" ? "text-white/80" : "text-gray-600 dark:text-gray-300"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div
          className={`w-72 h-72 rounded-full opacity-20 ${
            variant === "gradient" ? "bg-white/10" : "bg-gradient-to-r from-[#066ff2] to-[#ec4faf]"
          }`}
        />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div
          className={`w-96 h-96 rounded-full opacity-10 ${
            variant === "gradient" ? "bg-white/10" : "bg-gradient-to-r from-[#ec4faf] to-[#066ff2]"
          }`}
        />
      </div>
    </section>
  )
}

export default ModernHero
