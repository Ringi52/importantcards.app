"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          ImportantCards.app
        </Link>
      </div>
    </header>
  )
}
