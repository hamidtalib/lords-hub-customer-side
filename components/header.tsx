'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Accounts', href: '/accounts' },
    { label: 'Gems', href: '/gems' },
    { label: 'Diamonds', href: '/diamonds' },
    { label: 'Bot Services', href: '/bots' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b-2 border-purple-200/50 bg-gradient-to-r from-white via-blue-50/30 to-white backdrop-blur-lg shadow-md">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-all duration-300">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 p-1 shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_%28LORDS%20HUB%20Favicon%20%28512%20x%20512%20px%29-qHfSQagDV1ofwET0q3ugp9CmOTCjJp.png"
                alt="Lords Hub"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-black gradient-text hidden sm:inline">
              LORDS HUB
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" className="text-slate-700 font-bold hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300 rounded-lg">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/chat">
              <Button size="sm" className="hidden sm:flex gap-2 btn-game font-bold">
                <MessageCircle className="h-4 w-4" />
                Chat
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-purple-100 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6 text-purple-600 font-bold" /> : <Menu className="h-6 w-6 text-slate-700" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 space-y-2 md:hidden animate-in fade-in duration-300">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-slate-700 font-bold hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/chat" className="w-full">
              <Button className="w-full gap-2 btn-game font-bold">
                <MessageCircle className="h-4 w-4" />
                Chat with Us
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
