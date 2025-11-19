"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function BotsPage() {
  // Dummy bot products
  const botProducts: MarketplaceProduct[] = [
    {
      id: "bot1",
      title: "Auto-Farm Bot",
      description: "Automated farming with anti-detection logic",
      tier: "Premium",
      highlights: ["24/7 uptime", "Anti-ban shield", "Adaptive routes"],
      price: 29,
      stock: 10,
      category: "bots",
    },
    {
      id: "bot2",
      title: "Dungeon Runner",
      description: "Clears dungeons automatically with safe mode",
      tier: "Elite",
      highlights: ["Smart pathing", "Party sync", "Low resource usage"],
      price: 49,
      stock: 5,
      category: "bots",
    },
    {
      id: "bot3",
      title: "AFK Helper",
      description: "Lightweight helper for AFK sessions",
      tier: "Basic",
      highlights: ["Resource tracker", "Notification alerts"],
      price: 12,
      stock: 25,
      category: "bots",
    },
  ];

  const tableColumns = useMemo<TableColumn<MarketplaceProduct>[]>(
    () => [
      {
        id: "service",
        label: "Service",
        render: (item) => (
          <div>
            <p className="text-base font-black text-white">{item.title}</p>
            <p className="text-xs text-slate-300 line-clamp-1">
              {item.description}
            </p>
          </div>
        ),
      },
      {
        id: "tier",
        label: "Tier",
        render: (item) => (
          <span className="inline-flex rounded-full border border-blue-400/40 px-3 py-1 text-xs font-semibold text-blue-200">
            {item.tier}
          </span>
        ),
      },
      {
        id: "highlights",
        label: "Highlights",
        render: (item) => (
          <ul className="text-xs text-slate-300 list-disc list-inside">
            {item.highlights?.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ),
      },
      {
        id: "price",
        label: "Price",
        className: "text-right",
        render: (item) => (
          <p className="text-2xl font-black gradient-text">${item.price}</p>
        ),
      },
      {
        id: "action",
        label: "Action",
        className: "text-right",
        render: (item) => (
          <Link href={`/chat?productId=${item.id}`}>
            <Button size="sm" className="btn-game text-xs">
              Chat
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

      {/* Hero Section */}
      <section
        className="px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center border-b-4 border-blue-500/30"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-5xl font-black gradient-text mb-4">
            Bot Services
          </h1>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Automate your gameplay instantly with premium bot services.
          </p>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-blue-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-base font-bold">
              ⚡ Special Bots: Premium bots come with advanced automation and
              anti-detection features!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Table Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
          <MarketplaceDataTable
            data={botProducts}
            columns={tableColumns}
            isLoading={false}
            emptyTitle="No bot services"
            emptySubtitle="Add some bot items to display them here."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
