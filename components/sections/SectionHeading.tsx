"use client"

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ label, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-10 md:mb-12 ${className}`}>
      {label && <p className="union-label">{label}</p>}
      <h2 className="union-heading-section mb-3">{title}</h2>
      {description && (
        <p className="union-body max-w-xl mx-auto">{description}</p>
      )}
    </div>
  )
}
