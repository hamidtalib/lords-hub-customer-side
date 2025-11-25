"use client";

import { useMemo } from "react";
import Link from "next/link";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { Button } from "@/src/components/ui/button";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/src/components/marketplace/data-table";
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

  const tableColumns = useMemo<TableColumn<MarketplaceProduct>[]>(
    () => [
      {
        id: "service",
        label: "Service",
        className: "text-center",
        render: (item) => (
          <div className="text-center">
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
        className: "text-center",

        render: (item) => (
          <span className="inline-flex rounded-full border border-purple-400/40 px-3 py-1 text-xs font-semibold text-purple-200 text-center">
            {item.tier}
          </span>
        ),
      },
      {
        id: "highlights",
        label: "Features",
        className: "text-center",

        render: (item) => (
          <ul className="text-xs text-slate-300 list-disc list-inside text-center">
            {item.highlights?.slice(0, 3).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ),
      },
      {
        id: "price",
        label: "Price/Month",
        className: "text-center",
        render: (item) => (
          <p className="text-2xl font-black gradient-text text-center">
            ${item.price}
          </p>
        ),
      },
      {
        id: "action",
        label: "Action",
        className: "text-center",
        render: (item) => (
          <div className="text-center">
            <Link href={`/chat?productId=${item.id}`}>
              <Button size="sm" className="btn-game text-xs cursor-pointer">
                Subscribe
              </Button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      <section
        className="px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center border-b-4 border-purple-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-purple-400" />
            <h1 className="text-5xl font-black gradient-text">KVK Bots</h1>
          </div>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Dominate Kingdom vs Kingdom events with automated participation and
            strategic point farming.
          </p>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-purple-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-base font-bold">
              🏆 KVK Bots: Automated event participation, point optimization,
              and alliance coordination for maximum rewards!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
          <MarketplaceDataTable
            data={botProducts}
            columns={tableColumns}
            isLoading={false}
            emptyTitle="No KVK bots available"
            emptySubtitle="Check back soon for new KVK bot services."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
