"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { MarketplaceProduct } from "@/store/lib/types/products";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Users } from "lucide-react";

export default function ReinBotsPage() {
  const botProducts: MarketplaceProduct[] = [
    {
      id: "rbot1",
      title: "Basic Rein Bot",
      description: "Automated reinforcement sending and management",
      tier: "Basic",
      highlights: ["Auto-send reins", "Troop recall", "Alliance coordination"],
      price: 10,
      stock: 12,
      category: "bots",
    },
    {
      id: "rbot2",
      title: "Pro Rein Bot",
      description: "Advanced reinforcement with smart troop allocation",
      tier: "Premium",
      highlights: [
        "Smart allocation",
        "Multi-target support",
        "Priority system",
        "24/7 monitoring",
      ],
      price: 15,
      stock: 7,
      category: "bots",
    },
    {
      id: "rbot3",
      title: "Elite Rein Bot",
      description: "Professional reinforcement bot with AI optimization",
      tier: "Elite",
      highlights: [
        "AI optimization",
        "Guild coordination",
        "Custom rules",
        "Instant alerts",
      ],
      price: 20,
      stock: 4,
      category: "bots",
    },
  ];

  return (
    <>
      <ScrollAnimation />

      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 lg:px-8 bg-cover bg-center border-b-4 border-green-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-green-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">
              Rein Bots
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
            Automated reinforcement management to support your alliance members
            24/7.
          </p>
        </div>
      </section>

      <section className="px-3 sm:px-4 py-4 sm:py-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-green-500/50 bg-gradient-to-r from-green-500/20 to-green-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-xs sm:text-sm lg:text-base font-bold">
              🛡️ Rein Bots: Never miss a reinforcement request with automated
              troop deployment and smart allocation!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-7xl">
          {botProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No rein bots available
              </p>
              <p className="text-slate-400">
                Check back soon for new reinforcement bot services.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {botProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-green-500/30 overflow-hidden hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 p-6 flex flex-col"
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
                            <span className="text-green-400">•</span>
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
    </>
  );
}
