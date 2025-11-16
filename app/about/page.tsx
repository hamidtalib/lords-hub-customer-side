'use client'

import { useState } from 'react'
import { Users, TrendingUp, Award, Zap, Globe, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function AboutPage() {
  const stats = [
    { label: 'Accounts Sold', value: '5,000+', icon: Users },
    { label: 'Happy Customers', value: '10,000+', icon: Heart },
    { label: 'Years Experience', value: '5+', icon: Award },
    { label: 'Success Rate', value: '99.8%', icon: TrendingUp },
  ]

  const journey = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Lords Hub was founded with a mission to provide safe and reliable gaming account services.',
    },
    {
      year: '2021',
      title: 'Expansion',
      description: 'Launched gems, diamonds, and started offering bot services to our growing community.',
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Expanded to serve 5,000+ customers across multiple continents with localized support.',
    },
    {
      year: '2023',
      title: 'Innovation',
      description: 'Introduced real-time chat system, payment verification, and enhanced security measures.',
    },
    {
      year: '2024',
      title: 'Premium Services',
      description: 'Launched KvK war bots, advanced calculator tools, and dedicated account management.',
    },
    {
      year: '2025',
      title: 'Market Leader',
      description: 'Became the most trusted Lords Mobile marketplace with 10,000+ satisfied customers.',
    },
  ]

  const team = [
    { name: 'Alex Crown', role: 'Founder & CEO', expertise: '10+ years gaming industry' },
    { name: 'Jordan Strike', role: 'Head of Operations', expertise: '8+ years account management' },
    { name: 'Morgan Shield', role: 'Lead Developer', expertise: 'Bot development specialist' },
    { name: 'Casey Valor', role: 'Customer Support Lead', expertise: '24/7 multilingual support' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-primary/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-4xl font-black neon-text">About Lords Hub</h1>
          <p className="text-lg text-muted-foreground">Your trusted marketplace for premium gaming since 2020</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="card-lift border-primary/20 hover:border-secondary group">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm text-muted-foreground font-bold">{stat.label}</p>
                    <p className="text-4xl font-black text-accent mt-2">{stat.value}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 neon-text">Our Mission</h2>
              <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                At Lords Hub, we believe every player deserves access to premium gaming accounts and services. Our mission is to provide a safe, transparent, and reliable marketplace where gamers can buy, sell, and enhance their Lords Mobile experience.
              </p>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                We're committed to building trust through secure transactions, 24/7 customer support, and cutting-edge technology that protects both buyers and sellers.
              </p>
              <Button className="btn-game text-white font-semibold text-lg">
                Get Started
              </Button>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center border border-primary/30 group card-lift">
              <div className="text-8xl opacity-30 group-hover:scale-125 transition-transform duration-300">👑</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-primary/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-4xl font-black text-center neon-text">Our Journey</h2>
          <div className="space-y-6">
            {journey.map((event, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg">
                    {event.year.slice(2)}
                  </div>
                  {idx < journey.length - 1 && (
                    <div className="h-12 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>
                <Card className="flex-1 border-primary/20 card-lift hover:border-secondary group">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-secondary transition-colors duration-300">{event.title}</CardTitle>
                    <CardDescription className="text-base font-bold">{event.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-4xl font-black text-center neon-text">Our Team</h2>
          <p className="mb-16 text-center text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Meet the dedicated team behind Lords Hub, working 24/7 to ensure your gaming experience is seamless.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="card-lift border-primary/20 hover:border-secondary text-center group">
                <CardContent className="pt-6">
                  <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    👤
                  </div>
                  <CardTitle className="text-lg group-hover:text-secondary transition-colors duration-300">{member.name}</CardTitle>
                  <CardDescription className="mt-1 font-bold text-base">{member.role}</CardDescription>
                  <p className="mt-2 text-sm text-muted-foreground font-semibold">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-4xl font-black text-center neon-text">Why Choose Lords Hub?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔒', title: 'Secure Transactions', desc: 'Encrypted and verified payments with fraud protection' },
              { icon: '⚡', title: 'Instant Support', desc: '24/7 customer support in multiple languages' },
              { icon: '✅', title: 'Verified Sellers', desc: 'All accounts verified and tested before listing' },
              { icon: '💎', title: 'Premium Quality', desc: 'Only the best accounts and services listed' },
              { icon: '🌍', title: 'Global Reach', desc: 'Serving players from all across the world' },
              { icon: '🎯', title: 'Best Prices', desc: 'Competitive pricing with regular discounts' },
            ].map((item) => (
              <Card key={item.title} className="card-lift border-primary/20 hover:border-secondary group">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                  <CardTitle className="text-lg mb-2 group-hover:text-secondary transition-colors duration-300">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-black neon-text">Ready to Join Our Community?</h2>
          <p className="mb-10 text-muted-foreground text-lg leading-relaxed">Start browsing premium accounts or list your own today.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="btn-game text-white font-semibold text-lg">
              Browse Accounts
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 font-semibold">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
