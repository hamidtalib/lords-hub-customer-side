"use client";

import Link from "next/link";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { Button } from "@/src/components/ui/button";
import { MarketplaceProduct } from "@/store/lib/types/products";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Trophy } from "lucide-react";

export default function KVKBots() {
  const botProducts: MarketplaceProduct[] = [
    {
      id: "kvkbot1",
      title: "Basic KVK Bot",
      description: "Essential KVK automation for event participation",
      tier: "Basic",
      highlights: ["Auto event join", "Point farming", "Basic alerts"],
      price: 10,
      stock: 12,
      category: "bots",
    },
    {
      id: "kvkbot2",
      title: "Advanced KVK Bot",
      description: "Complete KVK automation with strategic coordination",
      tier: "Premium",
      highlights: [
        "Smart event targeting",
        "Alliance coordination",
        "Real-time notifications",
        "Auto resource collection",
      ],
      price: 15,
      stock: 8,
      category: "bots",
    },
    {
      id: "kvkbot3",
      title: "Elite KVK Bot",
      description: "Professional KVK domination with AI-powered strategies",
      tier: "Elite",
      highlights: [
        "AI strategy optimization",
        "Multi-account management",
        "Priority support 24/7",
        "Custom event scripts",
        "Advanced analytics",
      ],
      price: 20,
      stock: 5,
      category: "bots",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <ScrollAnimation />

      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 lg:px-8 bg-cover bg-center border-b-4 border-purple-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Trophy className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">
              KVK Bots
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
            Dominate Kingdom vs Kingdom events with automated participation and
            strategic point farming.
          </p>
        </div>
      </section>

      <section className="px-3 sm:px-4 py-4 sm:py-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-purple-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-xs sm:text-sm lg:text-base font-bold">
              🏆 KVK Bots: Automated event participation, point optimization,
              and alliance coordination for maximum rewards!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-7xl">
          {botProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No KVK bots available
              </p>
              <p className="text-slate-400">
                Check back soon for new KVK bot services.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {botProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-purple-500/30 overflow-hidden hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 p-6 flex flex-col"
                >
                  <div className="flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-black text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 font-semibold mb-2">
                        Features:
                      </p>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {item.highlights?.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2"
                          >
                            <span className="text-purple-400">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-700 mt-auto">
                    <p className="text-2xl font-black gradient-text text-center mb-3">
                      ${item.price}
                      <span className="text-sm text-slate-400">/month</span>
                    </p>
                    <Link href={`/chat?productId=${item.id}`}>
                      <Button size="sm" className="btn-game text-xs w-full">
                        Subscribe
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
