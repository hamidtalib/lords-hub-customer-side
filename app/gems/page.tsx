'use client'

import { useState } from 'react'
import { Calculator, ShoppingCart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function GemsPage() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [quantity, setQuantity] = useState(50)

  const gemRates = [
    { amount: 50, price: 100 },
    { amount: 100, price: 180 },
    { amount: 500, price: 800 },
    { amount: 1000, price: 1500 },
  ]

  const calculatePrice = (qty: number) => {
    return (qty / 50) * 100
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-cyan-50/40 to-purple-50/40">
      <Header />

      <section className="border-b-4 border-cyan-200 px-4 py-20 sm:px-6 lg:px-8 section-gradient">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">Premium Gems</h1>
          <p className="text-xl text-slate-700 font-semibold">Boost your gameplay with powerful gems</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-4xl font-black gradient-text text-center">Gem Pricing Tiers</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {gemRates.map((rate) => (
              <Card key={rate.amount} className="card-lift border-3 border-cyan-200 hover:border-cyan-400 group bg-gradient-to-br from-white to-cyan-50 shadow-lg">
                <CardContent className="pt-8">
                  <div className="mb-4 text-6xl font-black text-cyan-600 group-hover:scale-125 transition-transform duration-500 inline-block animate-float-smooth">
                    💎
                  </div>
                  <div className="text-5xl font-black text-cyan-600 mb-2">{rate.amount}</div>
                  <p className="mb-6 text-base text-slate-600 font-bold">Gems</p>
                  <div className="text-4xl font-black gradient-text mb-8">${rate.price}</div>
                  <Link href="/chat">
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
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-4xl font-black gradient-text">Gem Calculator</h2>
            <Button 
              onClick={() => setShowCalculator(!showCalculator)}
              className={`gap-2 text-base font-bold px-6 py-3 h-12 rounded-xl transition-all duration-500 ${showCalculator ? 'btn-game text-white' : 'border-2 border-purple-300 hover:border-purple-600 hover:bg-purple-100/50'}`}
            >
              <Calculator className="h-5 w-5" />
              {showCalculator ? 'Hide' : 'Show'} Calculator
            </Button>
          </div>

          {showCalculator && (
            <Card className="border-3 border-cyan-200 bg-gradient-to-br from-white via-cyan-50/30 to-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-3xl gradient-text">
                  <Sparkles className="h-8 w-8 text-cyan-600" />
                  Calculate Your Gem Cost
                </CardTitle>
                <CardDescription className="text-base font-semibold">
                  Enter the number of gems you need
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <label className="mb-4 block text-base font-bold text-slate-700">Quantity (Gems)</label>
                  <Input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(50, Number(e.target.value)))}
                    min="50"
                    step="50"
                    className="border-2 border-cyan-300 focus:border-cyan-600 bg-white h-14 text-lg font-bold rounded-xl shadow-lg"
                  />
                </div>

                <div className="rounded-xl bg-gradient-to-br from-cyan-100/60 to-purple-100/40 p-8 border-2 border-cyan-300">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-base text-slate-700 font-bold">Total Cost:</span>
                    <span className="text-5xl font-black gradient-text">${calculatePrice(quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-slate-600 font-semibold">Based on 50 gems = $100</p>
                </div>

                <div className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <p className="text-base text-slate-700 font-bold mb-3">📋 How it works:</p>
                  <p className="text-sm text-slate-600 font-semibold">1. Select your desired gem quantity</p>
                  <p className="text-sm text-slate-600 font-semibold">2. Click "Purchase Gems"</p>
                  <p className="text-sm text-slate-600 font-semibold">3. Chat with our team for payment</p>
                  <p className="text-sm text-slate-600 font-semibold">4. Receive gems instantly after payment</p>
                </div>

                <Link href="/chat" className="w-full">
                  <Button className="w-full btn-game text-white font-bold text-lg py-6 h-auto">
                    <ShoppingCart className="mr-3 h-6 w-6" />
                    Purchase {quantity} Gems
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
