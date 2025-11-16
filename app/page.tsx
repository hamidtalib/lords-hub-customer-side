'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Star, Zap, Shield, Users, TrendingUp, MessageSquare, Sparkles, Crown, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const gameCategories = [
    { title: 'Accounts', icon: '🏰', href: '/accounts', desc: 'Premium gaming accounts', gradient: 'from-purple-600 to-indigo-600' },
    { title: 'Gems', icon: '💎', href: '/gems', desc: 'Power up your game', gradient: 'from-cyan-600 to-blue-600' },
    { title: 'Diamonds', icon: '✨', href: '/diamonds', desc: 'Boost gameplay instantly', gradient: 'from-purple-600 to-pink-600' },
    { title: 'Bot Services', icon: '🤖', href: '/bots', desc: 'Automate your gaming', gradient: 'from-indigo-600 to-purple-600' },
  ]

  const stats = [
    { label: 'Accounts Sold', value: '5,000+', icon: '📊' },
    { label: 'Happy Customers', value: '10,000+', icon: '😊' },
    { label: 'Total Revenue', value: '$500K+', icon: '💰' },
    { label: 'Uptime', value: '99.9%', icon: '✅' },
  ]

  const testimonials = [
    { name: 'Alex Hunter', account: '@AlexGamer', message: 'Bought my first account here. Amazing experience!', rating: 5 },
    { name: 'Jordan Vale', account: '@JordanLord', message: 'Best prices and fastest delivery I have ever seen!', rating: 5 },
    { name: 'Morgan Steel', account: '@MorganStrike', message: 'Customer support was incredibly helpful and responsive.', rating: 5 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/40 to-cyan-50/40">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full opacity-50">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-smooth" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float-smooth" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border-2 border-purple-300 bg-gradient-to-r from-purple-100/80 to-indigo-100/80 px-6 py-3 backdrop-blur-lg transition-all hover:border-purple-500 hover:shadow-2xl transform hover:scale-105">
            <Zap className="h-6 w-6 text-purple-600 mr-3 animate-pulse" />
            <span className="text-sm font-bold text-purple-900">🎮 Premium Gaming Marketplace</span>
          </div>

          <h1 className="mb-8 text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl leading-tight">
            <span className="gradient-text block mb-3">Lords Hub</span>
            <span className="text-slate-900">Level Up Your Game</span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl text-slate-700 leading-relaxed font-semibold">
            Join 10,000+ players worldwide. Buy and sell premium Lords Mobile accounts, gems, diamonds, and bot services with confidence. Secure transactions, instant delivery, 24/7 support.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
            <Link href="/accounts">
              <Button size="lg" className="btn-game w-full sm:w-auto text-lg">
                Browse Accounts <ChevronRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 border-2 border-purple-200 flex items-center justify-center card-lift">
            <div className="text-center">
              <div className="text-5xl mb-3">🏰</div>
              <p className="font-bold text-slate-700">Premium Accounts</p>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-br from-cyan-100 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200 flex items-center justify-center card-lift" style={{animationDelay: '0.5s'}}>
            <div className="text-center">
              <div className="text-5xl mb-3">⚡</div>
              <p className="font-bold text-slate-700">Instant Delivery</p>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 flex items-center justify-center card-lift" style={{animationDelay: '1s'}}>
            <div className="text-center">
              <div className="text-5xl mb-3">🔒</div>
              <p className="font-bold text-slate-700">100% Secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 section-gradient border-t-4 border-purple-200">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-black gradient-text">Why Choose Lords Hub?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={stat.label} className="card-lift border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/30 hover:border-purple-400 shadow-lg">
                <CardContent className="pt-8 text-center">
                  <div className="text-6xl mb-4 animate-float-smooth" style={{ animationDelay: `${i * 0.3}s` }}>
                    {stat.icon}
                  </div>
                  <p className="text-sm text-slate-600 font-bold mb-2">{stat.label}</p>
                  <p className="text-4xl font-black gradient-text">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-t-4 border-cyan-200">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-5xl font-black gradient-text">Our Services</h2>
            <p className="text-slate-700 text-lg font-semibold max-w-2xl mx-auto">Everything you need for your Lords Mobile gaming journey</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {gameCategories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card 
                  className={`relative overflow-hidden border-3 cursor-pointer card-lift group transition-all duration-500 h-full ${
                    hoveredCard === category.title ? 'border-purple-400 shadow-2xl' : 'border-purple-200/50 hover:border-purple-300'
                  }`}
                  onMouseEnter={() => setHoveredCard(category.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-500`} />
                  <CardContent className="relative pt-12 text-center h-full flex flex-col justify-center">
                    <div className="text-7xl mb-6 group-hover:scale-150 transition-transform duration-500 animate-float-smooth">{category.icon}</div>
                    <h3 className="text-2xl font-black mb-3 gradient-text">{category.title}</h3>
                    <p className="text-sm text-slate-600 font-semibold">{category.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Accounts */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 section-gradient border-t-4 border-indigo-200">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="mb-3 text-4xl font-black gradient-text">🔥 Featured Accounts</h2>
              <p className="text-slate-700 font-semibold text-lg">Handpicked premium listings</p>
            </div>
            <Link href="/accounts">
              <Button className="btn-secondary gap-2 text-lg font-bold">
                View All <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden card-lift border-2 border-purple-200 hover:border-purple-400 group bg-gradient-to-br from-white to-purple-50">
                <div className="relative h-56 bg-gradient-to-br from-purple-200/60 to-cyan-200/60 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl opacity-40 group-hover:scale-125 transition-transform duration-500">🏰</div>
                  <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-bold text-white pulse-glow">
                    <Flame className="h-4 w-4 mr-2" />
                    Hot Deal
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-2xl gradient-text">Account #{item}</CardTitle>
                    <Star className="h-6 w-6 fill-purple-600 text-purple-600" />
                  </div>
                  <CardDescription className="text-base font-semibold">50M Might • T5 Troops • Fully Built</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-3 text-sm bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-600">Heroes:</span>
                      <span className="text-cyan-600">Fully Built</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-600">Gems:</span>
                      <span className="text-cyan-600">50K+</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-600">Screenshots:</span>
                      <span className="text-cyan-600">8 images</span>
                    </div>
                  </div>
                  <div className="mb-6 flex items-baseline justify-between border-t border-purple-200 pt-4">
                    <span className="text-4xl font-black gradient-text">${1000 * item}</span>
                    <span className="text-sm text-slate-500 line-through font-bold">${Math.floor(1200 * item * 1.2)}</span>
                  </div>
                  <Link href="/accounts">
                    <Button className="w-full btn-game font-bold text-base">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-t-4 border-purple-200">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black gradient-text">What Our Players Say</h2>
            <p className="text-slate-700 text-lg font-semibold">Join thousands of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="card-lift border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-slate-700 mb-6 italic">"{t.message}"</p>
                  <div className="pt-4 border-t border-purple-200">
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-600">{t.account}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8 section-gradient border-t-4 border-cyan-200">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-float-smooth" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl animate-float-smooth" />
        </div>
        
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-5xl font-black gradient-text">Ready to Level Up?</h2>
          <p className="mb-12 text-xl text-slate-700 font-semibold leading-relaxed">
            Browse thousands of premium accounts, grab amazing deals, and join our thriving gaming community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/accounts">
              <Button size="lg" className="btn-game text-xl font-bold px-8">
                Start Shopping <ChevronRight className="ml-3 h-7 w-7" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" className="btn-secondary text-xl font-bold px-8">
                Chat with Us <MessageSquare className="ml-3 h-7 w-7" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
