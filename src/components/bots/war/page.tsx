"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/src/components/marketplace/data-table";
import { MarketplaceProduct } from "@/store/lib/types/products";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Swords } from "lucide-react";

export default function WarBotsPage() {
  const botProducts: MarketplaceProduct[] = [
    {
      id: "wbot1",
      title: "Basic War Bot",
      description: "Automated rally participation and troop management",
      tier: "Basic",
      highlights: ["Auto-rally join", "Troop healing", "Shield management"],
      price: 8,
      stock: 15,
      category: "bots",
    },
    {
      id: "wbot2",
      title: "Advanced War Bot",
      description: "Full KvK automation with strategic targeting",
      tier: "Premium",
      highlights: [
        "Smart targeting",
        "Rally coordination",
        "Real-time alerts",
        "Anti-detection",
      ],
      price: 12,
      stock: 8,
      category: "bots",
    },
    {
      id: "wbot3",
      title: "Elite War Bot",
      description: "Professional-grade war automation with AI tactics",
      tier: "Elite",
      highlights: [
        "AI-powered tactics",
        "Multi-account sync",
        "Priority support",
        "Custom strategies",
      ],
      price: 15,
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
            <p className="text-base font-black text-white whitespace-nowrap">{item.title}</p>
            <p className="text-xs text-slate-300 whitespace-nowrap">
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
          <span className="inline-flex rounded-full border border-blue-400/40 px-3 py-1 text-xs font-semibold text-blue-200 text-center whitespace-nowrap">
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
              <li key={highlight} className="whitespace-nowrap">{highlight}</li>
            ))}
          </ul>
        ),
      },
      {
        id: "price",
        label: "Price/Month",
        className: "text-center",
        render: (item) => (
          <p className="text-2xl font-black gradient-text text-center whitespace-nowrap">
            ${item.price}
          </p>
        ),
      },
      {
        id: "action",
        label: "Action",
        className: "text-center",
        render: (item) => (
          <div className="text-center whitespace-nowrap">
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
    <>
      <ScrollAnimation />

      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 lg:px-8 bg-cover bg-center border-b-4 border-blue-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Swords className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-red-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">War Bots</h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
            Dominate Kingdom vs Kingdom battles with automated war strategies
            and rally coordination.
          </p>
        </div>
      </section>

      <section className="px-3 sm:px-4 py-4 sm:py-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-red-500/50 bg-gradient-to-r from-red-500/20 to-red-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-xs sm:text-sm lg:text-base font-bold">
              ⚔️ War Bots: Automated rally participation, strategic targeting,
              and real-time battle coordination!
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 shadow-2xl">
          <MarketplaceDataTable
            data={botProducts}
            columns={tableColumns}
            isLoading={false}
            emptyTitle="No war bots available"
            emptySubtitle="Check back soon for new war bot services."
          />
        </div>
      </section>
    </>
  );
}
