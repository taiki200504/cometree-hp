"use client"

import React from 'react'

interface Props {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminHeading({ title, subtitle, actions }: Props) {
  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}


