"use client"

import type React from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"

interface ModernHeroProps {
  title: string
  subtitle?: string
  description: string
  primaryAction?: { text: string; href: string; onClick?: () => void }
  secondaryAction?: { text: string; href: string; onClick?: () => void }
  variant?: "default" | "minimal"
}

export function ModernHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
}: ModernHeroProps) {
  const isMinimal = variant === "minimal"
  const bgClass = isMinimal
    ? "bg-[var(--union-section-bg)]"
    : "bg-[var(--union-section-alt)]"

  return (
    <section className={`union-section border-b border-[var(--union-border)] ${bgClass}`}>
      <div className="union-container">
        <AnimatedSection className="max-w-3xl">
          {subtitle && <p className="union-label">{subtitle}</p>}
          <h1 className="union-heading-section text-3xl sm:text-4xl lg:text-5xl mb-4">
            {title}
          </h1>
          <p className="union-body-lg mb-8">{description}</p>
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-3">
              {primaryAction &&
                (primaryAction.onClick ? (
                  <button
                    onClick={primaryAction.onClick}
                    className="union-btn-primary"
                  >
                    {primaryAction.text}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <Link href={primaryAction.href} className="union-btn-primary">
                    {primaryAction.text}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                ))}
              {secondaryAction &&
                (secondaryAction.onClick ? (
                  <button
                    onClick={secondaryAction.onClick}
                    className="union-btn-secondary"
                  >
                    {secondaryAction.text}
                  </button>
                ) : (
                  <Link href={secondaryAction.href} className="union-btn-secondary">
                    {secondaryAction.text}
                  </Link>
                ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}

export default ModernHero
