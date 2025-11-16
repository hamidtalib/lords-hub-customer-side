'use client'

import { useState } from 'react'
import { ChevronDown, ShoppingCart, Zap, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function BotsPage() {
  const botServices = [
    {
      id: 'bank',
      name: 'Bank Bots',
      description: 'Automated resource banking and management',
      pricing: [
        { period: 'Monthly', price: 3, duration: '1 Month' },
        { period: 'Yearly', price: 30, duration: '1 Year (Save 17%)', highlight: true },
      ],
      features: ['24/7 Banking', 'Auto Feeding', 'Resource Protection', 'Manual Control Available'],
    },
    {
      id: 'war',
      name: 'War Bots',
      description: 'Advanced bot solutions for war gameplay',
      isExpandable: true,
      subServices: [
        {
          name: 'Simple War Bots',
          description: 'Basic war automation',
          price: 8,
          features: ['Scout Management', 'Basic Attacks', 'Resource Tracking'],
        },
        {
          name: 'KvK War Bots',
          description: '⚠️ Requires 2-day advance notice',
          price: 15,
          note: 'Must order before offer period ends',
          features: ['Advanced Tactics', 'Cross-Kingdom Optimization', 'Real-time Adjustments'],
        },
      ],
    },
    {
      id: 'rein',
      name: 'Rein War Bots',
      description: 'Reinforcement and conquest strategy bot',
      pricing: [
        { period: 'Monthly', price: 10, duration: '1 Month / 1 Account' },
      ],
      features: ['Smart Reinforcement', 'Conquest Automation', 'Troop Management'],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/40">
      <Header />

      <section className="border-b-4 border-indigo-200 px-4 py-20 sm:px-6 lg:px-8 section-gradient">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">Bot Services</h1>
          <p className="text-xl text-slate-700 font-semibold">Automate your gameplay with premium bots</p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-indigo-300 bg-gradient-to-r from-indigo-100/60 to-indigo-50/40 shadow-lg rounded-xl">
            <AlertCircle className="h-6 w-6 text-indigo-600" />
            <AlertDescription className="text-indigo-900 text-base font-bold ml-3">
              💡 Our bot services are designed to enhance gameplay. Always review the game's Terms of Service before use.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {botServices.map((bot) => (
              <Card key={bot.id} className="border-3 border-indigo-200 card-lift hover:border-indigo-400 group overflow-hidden shadow-lg bg-gradient-to-br from-white to-indigo-50">
                <CardHeader className="bg-gradient-to-br from-indigo-100/60 to-purple-100/40 group-hover:from-indigo-150 group-hover:to-purple-150 transition-all duration-500 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl gradient-text">
                    <Zap className="h-7 w-7 text-indigo-600" />
                    {bot.name}
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-slate-600">{bot.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-8">
                  {bot.isExpandable ? (
                    <Accordion type="single" collapsible className="w-full">
                      {bot.subServices?.map((sub, idx) => (
                        <AccordionItem key={idx} value={sub.name} className="border-indigo-200">
                          <AccordionTrigger className="hover:text-indigo-600 transition-colors duration-300 font-bold text-base py-3">{sub.name}</AccordionTrigger>
                          <AccordionContent className="space-y-4 pb-4">
                            <p className="text-base text-slate-600 font-semibold">{sub.description}</p>
                            {sub.note && (
                              <Alert className="border-2 border-yellow-300 bg-yellow-50">
                                <AlertCircle className="h-5 w-5 text-yellow-700" />
                                <AlertDescription className="text-yellow-800 text-sm font-semibold ml-2">{sub.note}</AlertDescription>
                              </Alert>
                            )}
                            <div className="text-4xl font-black gradient-text">${sub.price}</div>
                            <ul className="space-y-2 text-base">
                              {sub.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3 font-semibold text-slate-700">
                                  <span className="text-lg text-indigo-600">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Link href="/chat" className="w-full block">
                              <Button className="w-full btn-game text-white font-bold text-base mt-4">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Select Service
                              </Button>
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <>
                      <div className="mb-8 space-y-4">
                        {bot.pricing?.map((price) => (
                          <div key={price.duration} className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                            price.highlight 
                              ? 'border-indigo-400 bg-gradient-to-r from-indigo-100/80 to-indigo-50/40 ring-2 ring-indigo-300' 
                              : 'border-indigo-200 bg-indigo-50/40 hover:bg-indigo-100/40'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-base text-slate-700">{price.duration}</span>
                              <span className="text-3xl font-black gradient-text">${price.price}</span>
                            </div>
                            {price.highlight && (
                              <p className="text-sm text-indigo-700 font-bold">💰 Best Value</p>
                            )}
                          </div>
                        ))}
                      </div>

                      <ul className="mb-8 space-y-3 text-base">
                        {bot.features?.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 font-semibold text-slate-700">
                            <span className="text-lg text-indigo-600">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Accordion type="single" collapsible className="w-full mb-6">
                        <AccordionItem value="details" className="border-indigo-200">
                          <AccordionTrigger className="text-base hover:text-indigo-600 font-semibold transition-colors duration-300 py-3">
                            How It Works
                          </AccordionTrigger>
                          <AccordionContent className="text-base text-slate-600 space-y-2 pb-4">
                            <p className="font-semibold">1. Subscribe to the bot service</p>
                            <p className="font-semibold">2. Provide account details securely</p>
                            <p className="font-semibold">3. Bot activation within 24 hours</p>
                            <p className="font-semibold">4. Enjoy 24/7 support and monitoring</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Link href="/chat" className="w-full block">
                        <Button className="w-full btn-game text-white font-bold text-base">
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Get {bot.name}
                        </Button>
                      </Link>
                    </>
                  )}
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
                <AlertCircle className="h-8 w-8" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-lg text-slate-700">
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">🔒</span> Encrypted account information storage</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">🛡️</span> No account compromise - secure API connections</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">📝</span> Full account access remains with you</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">✅</span> Monitoring for suspicious activities</p>
              <p className="font-bold flex items-center gap-2"><span className="text-2xl">🚨</span> Instant alert system for account changes</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
