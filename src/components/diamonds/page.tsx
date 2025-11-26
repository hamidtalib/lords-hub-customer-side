"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { MarketplaceProduct } from "@/store/lib/types/products";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function DiamondsPage() {
  const diamondProducts: MarketplaceProduct[] = [
    {
      id: "d1",
      title: "86 Diamonds",
      description: "Fast top-up direct to game ID",
      highlights: ["Instant", "0% fee"],
      tier: "Basic",
      category: "diamonds",
      stock: 12,
      price: 0.99,
    },
    {
      id: "d2",
      title: "172 Diamonds",
      description: "Best selling package",
      highlights: ["Top seller"],
      tier: "Standard",
      category: "diamonds",
      stock: 5,
      price: 1.89,
      originalPrice: 2.2,
    },
    {
      id: "d3",
      title: "344 Diamonds",
      description: "Great value bundle",
      highlights: ["5% bonus"],
      tier: "Pro",
      category: "diamonds",
      stock: 9,
      price: 3.59,
    },
    {
      id: "d4",
      title: "706 Diamonds",
      description: "High-tier purchase",
      highlights: ["7% bonus"],
      tier: "Elite",
      category: "diamonds",
      stock: 2,
      price: 7.19,
    },
  ];

  return (
    <>
      <ScrollAnimation />

      <section
        className="border-b-4 border-amber-500/30 px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(9,11,25,0.9), rgba(7,10,21,0.97)), url('https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">
            Premium Diamonds
          </h1>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl">
            Power up instantly with secure, verified top-ups.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="uppercase text-xs tracking-[0.4em] text-amber-300 font-semibold">
              Realtime Pricing
            </p>
            <h2 className="text-4xl font-black gradient-text mb-2">
              Diamond Catalog
            </h2>
          </div>

          {diamondProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No diamonds added yet
              </p>
              <p className="text-slate-400 mb-4">
                Once your admin uploads products, they will appear here.
              </p>
              <Link href="/chat">
                <Button className="btn-secondary font-bold cursor-pointer">
                  Request Drop
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {diamondProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 overflow-hidden hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 p-6 text-center"
                >
                  <div className="mb-4">
                    <div className="text-5xl mb-3">💎</div>
                    <h3 className="text-xl font-black text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {item.description ||
                        item.highlights?.[0] ||
                        "Fast top-up"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-3xl font-black gradient-text mb-4">
                      ${item.price}
                    </p>
                    <Link href={`/chat?productId=${item.id}`}>
                      <Button size="sm" className="btn-game text-xs w-full">
                        Order Now
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
