'use client'

import { useState } from 'react'
import { AlertCircle, ShoppingCart, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function DiamondsPage() {
  const diamondRates = [
    { amount: 30, price: 50, discount: 0 },
    { amount: 60, price: 95, discount: 5 },
    { amount: 150, price: 220, discount: 8 },
    { amount: 300, price: 400, discount: 10 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/40 to-cyan-50/40">
      <Header />

      <section className="border-b-4 border-purple-200 px-4 py-20 sm:px-6 lg:px-8 section-gradient">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">Premium Diamonds</h1>
          <p className="text-xl text-slate-700 font-semibold">Power up your gameplay instantly</p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-purple-300 bg-gradient-to-r from-purple-100/60 to-purple-50/40 shadow-lg rounded-xl">
            <TrendingDown className="h-6 w-6 text-purple-600" />
            <AlertDescription className="text-purple-900 text-base font-bold ml-3">
              💰 Limited Time Alert: Diamonds get 20% cheaper during special events. Watch for rare discount periods!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-4xl font-black gradient-text text-center">Diamond Pricing</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diamondRates.map((rate) => (
              <Card 
                key={rate.amount}
                className={`card-lift border-3 hover:border-purple-400 group relative transition-all duration-500 shadow-lg bg-gradient-to-br from-white to-purple-50 ${
                  rate.discount > 0 ? 'ring-3 ring-purple-300' : ''
                }`}
              >
                {rate.discount > 0 && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg transform rotate-12">
                    -{rate.discount}%
                  </div>
                )}
                <CardContent className="pt-10">
                  <div className="mb-4 text-6xl font-black text-purple-600 group-hover:scale-125 transition-transform duration-500 inline-block animate-float-smooth">
                    ✨
                  </div>
                  <div className="text-5xl font-black text-purple-600 mb-2">{rate.amount}</div>
                  <p className="mb-8 text-base text-slate-600 font-bold">Diamonds</p>
                  <div className="text-4xl font-black gradient-text mb-8">${rate.price}</div>
                  <Link href="/chat" className="w-full">
                    <Button className="w-full btn-game text-white font-bold text-base">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Buy Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-4 border-cyan-200 px-4 py-16 sm:px-6 lg:px-8 section-gradient">
        <div className="mx-auto max-w-2xl">
          <Card className="border-3 border-cyan-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-3xl gradient-text">
                <AlertCircle className="h-8 w-8 text-cyan-600" />
                Why Buy From Lords Hub?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-lg text-slate-700">
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">✅</span> Instant delivery after payment confirmation</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">🔒</span> Secure payment processing with protection</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">👨‍💼</span> 24/7 customer support team</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">💎</span> Best rates in the market guaranteed</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">💰</span> Money-back guarantee if unsatisfied</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
