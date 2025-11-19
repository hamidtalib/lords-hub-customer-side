"use client";

import { useMemo } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";

export default function DiamondsPage() {
  // Stable dummy data for now
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

  const tableColumns = useMemo<TableColumn<MarketplaceProduct>[]>(
    () => [
      {
        id: "bundle",
        label: "Bundle",
        render: (item) => (
          <div>
            <p className="text-base font-black text-white">{item.title}</p>
            <p className="text-xs text-slate-300 line-clamp-1">
              {item.description || item.highlights?.[0] || "Fast top-up"}
            </p>
          </div>
        ),
      },
      {
        id: "tier",
        label: "Tier",
        render: (item) => (
          <span className="inline-flex rounded-full border border-amber-400/40 px-3 py-1 text-xs font-semibold text-amber-200">
            {item.tier || "Standard"}
          </span>
        ),
      },
      {
        id: "stock",
        label: "Slots",
        render: (item) => (
          <span className="text-sm font-bold text-slate-200">
            {typeof item.stock === "number" ? `${item.stock} available` : "∞"}
          </span>
        ),
      },
      {
        id: "price",
        label: "Price",
        className: "text-right",
        render: (item) => (
          <div className="text-right">
            <p className="text-2xl font-black gradient-text">
              {item.price ? `$${item.price}` : "Chat"}
            </p>
            {item.originalPrice && (
              <p className="text-xs text-slate-400 line-through">
                ${item.originalPrice}
              </p>
            )}
          </div>
        ),
      },
      {
        id: "action",
        label: "Action",
        className: "text-right",
        render: (item) => (
          <Link href={`/chat?productId=${item.id}`}>
            <Button size="sm" className="btn-game text-xs">
              Order
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />

      {/* Hero */}
      <section
        className="border-b-4 border-amber-500/30 px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center"
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

      {/* Table */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="uppercase text-xs tracking-[0.4em] text-amber-300 font-semibold">
              Realtime Pricing
            </p>
            <h2 className="text-4xl font-black gradient-text mb-2">
              Diamond Catalog
            </h2>
          </div>

          <MarketplaceDataTable
            data={diamondProducts}
            columns={tableColumns}
            emptyTitle="No diamonds added yet"
            emptySubtitle="Once your admin uploads products, they will appear here."
            emptyCta={
              <Link href="/chat">
                <Button className="btn-secondary font-bold">
                  Request Drop
                </Button>
              </Link>
            }
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
