'use client'

import { useState } from 'react'
import { Star, Shield, TrendingUp, ChevronDown, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const accounts = [
    {
      id: '1',
      title: 'T5 Castle - 60M Might',
      castle: '⭐⭐⭐⭐⭐',
      might: '60M',
      troops: 'T5',
      price: 3500,
      originalPrice: 4200,
      gems: '50K+',
      heroes: 'Fully Built',
      images: 8,
    },
    {
      id: '2',
      title: 'Powerful War Account - 45M',
      castle: '⭐⭐⭐⭐',
      might: '45M',
      troops: 'T4',
      price: 2200,
      originalPrice: 2800,
      gems: '30K+',
      heroes: 'Mostly Built',
      images: 6,
    },
    {
      id: '3',
      title: 'Starter Account - 20M',
      castle: '⭐⭐⭐',
      might: '20M',
      troops: 'T3',
      price: 800,
      originalPrice: 1000,
      gems: '10K+',
      heroes: 'Partially Built',
      images: 5,
    },
    {
      id: '4',
      title: 'Elite Knight Account - 75M',
      castle: '⭐⭐⭐⭐⭐',
      might: '75M',
      troops: 'T5',
      price: 4500,
      originalPrice: 5500,
      gems: '80K+',
      heroes: 'Fully Maxed',
      images: 10,
    },
  ]

  const filteredAccounts = accounts
    .filter(acc => 
      acc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.might.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'newest') return b.id.localeCompare(a.id)
      if (sortBy === 'mighty') return parseInt(b.might) - parseInt(a.might)
      return 0
    })

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/40 to-cyan-50/40">
      <Header />

      <section className="border-b-4 border-purple-200 px-4 py-20 sm:px-6 lg:px-8 section-gradient">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">Premium Accounts</h1>
          <p className="text-xl text-slate-700 font-semibold">Discover quality Lords Mobile accounts with guaranteed authenticity</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input 
                placeholder="Search by name or might level..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 border-2 border-purple-300 focus:border-purple-600 bg-white h-12 text-base font-semibold transition-all duration-300 rounded-xl shadow-lg"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-2 border-purple-300 hover:border-purple-600 hover:bg-purple-100/50 transition-all duration-300 font-bold rounded-xl h-12 px-6 text-base"
              onClick={() => setSortBy(sortBy === 'newest' ? 'price-low' : sortBy === 'price-low' ? 'price-high' : sortBy === 'price-high' ? 'mighty' : 'newest')}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'price-low' ? 'Price: Low-High' : sortBy === 'price-high' ? 'Price: High-Low' : 'By Might'}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {filteredAccounts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAccounts.map((account) => (
                <Card 
                  key={account.id}
                  className="overflow-hidden border-3 border-purple-200 card-lift hover:border-purple-400 transition-all duration-500 cursor-pointer group bg-gradient-to-br from-white to-purple-50 shadow-lg"
                >
                  <div className="relative h-52 bg-gradient-to-br from-purple-200/60 to-cyan-200/60 flex items-center justify-center overflow-hidden">
                    <div className="text-8xl opacity-40 group-hover:scale-125 transition-transform duration-500">🏰</div>
                    <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white pulse-glow">
                      📊 {account.might}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-2 gradient-text text-2xl mb-1">{account.title}</CardTitle>
                        <CardDescription className="font-semibold text-slate-600 text-base">{account.castle}</CardDescription>
                      </div>
                      <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6 space-y-3 text-sm bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-700">Troops:</span>
                        <span className="text-cyan-600">{account.troops}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-700">Gems:</span>
                        <span className="text-cyan-600">{account.gems}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-700">Heroes:</span>
                        <span className="text-cyan-600">{account.heroes}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-700">Media:</span>
                        <span className="text-slate-700">{account.images} screenshots</span>
                      </div>
                    </div>

                    <div className="mb-6 flex items-baseline justify-between border-t-2 border-purple-200 pt-4">
                      <div>
                        <span className="text-3xl font-black gradient-text">${account.price}</span>
                        <span className="ml-3 text-sm text-slate-500 line-through font-bold">${account.originalPrice}</span>
                      </div>
                      <span className="text-xs font-bold text-cyan-600">Save ${account.originalPrice - account.price}</span>
                    </div>

                    <div className="flex gap-3">
                      <Link href="/accounts" className="flex-1">
                        <Button className="w-full btn-game font-bold text-base">
                          View Details
                        </Button>
                      </Link>
                      <Link href="/chat" className="flex-1">
                        <Button className="w-full border-2 border-cyan-600 bg-white text-cyan-600 hover:bg-cyan-50 font-bold transition-all duration-300 rounded-xl hover:scale-105">
                          Chat
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No accounts found</h3>
              <p className="text-slate-600 font-semibold mb-6">Try adjusting your search criteria</p>
              <Button className="btn-game font-bold" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
