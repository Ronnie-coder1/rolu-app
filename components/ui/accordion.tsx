"use client"

import { useState } from "react"

export function Accordion({ children }: any) {
  return <div className="space-y-2">{children}</div>
}

export function AccordionItem({ children }: any) {
  return <div className="border rounded-md">{children}</div>
}

export function AccordionTrigger({ children }: any) {
  const [open, setOpen] = useState(false)

  return (
    <button
      className="w-full text-left p-4 font-medium"
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  )
}

export function AccordionContent({ children }: any) {
  return (
    <div className="p-4 text-sm text-gray-600 transition-all duration-300">
      {children}
    </div>
  )
}