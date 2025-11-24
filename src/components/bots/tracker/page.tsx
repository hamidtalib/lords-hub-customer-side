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
import { Radar } from "lucide-react";

export default function TrackerBotsPage() {
  const botProducts: MarketplaceProduct[] = [
    {
      id: "tbot1",
      title: "Basic Tracker Bot",
      description: "Monitor enemy movements and resource gathering",
      tier: "Basic",
      highlights: ["Enemy tracking", "Resource alerts", "Scout reports"],
      price: 7,
      stock: 20,
      category: "bots",
    },
    {
      id: "tbot2",
      title: "Advanced Tracker Bot",
      description: "Comprehensive kingdom monitoring with analytics",
      tier: "Premium",
      highlights: [
        "Real-time tracking",
        "Threat analysis",
        "Alliance intel",
        "Custom alerts",
      ],
      price: 12,
      stock: 10,
      category: "bots",
    },
    {
      id: "tbot3",
      title: "Elite Tracker Bot",
      description: "Professional intelligence gathering with AI predictions",
      tier: "Elite",
      highlights: [
        "AI predictions",
        "Multi-kingdom tracking",
        "Detailed reports",
        "Priority alerts",
      ],
      price: 18,
      stock: 6,
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
          <span className="inline-flex rounded-full border border-purple-400/40 px-3 py-1 text-xs font-semibold text-purple-200">
            {item.tier}
          </span>
        ),
      },
      {
        id: "highlights",
        label: "Features",
        render: (item) => (
          <ul className="text-xs text-slate-300 list-disc list-inside">
            {item.highlights?.slice(0, 3).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ),
      },
      {
        id: "price",
        label: "Price/Month",
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
            <Button size="sm" className="btn-game text-xs cursor-pointer">
              Subscribe
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <>
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
            <Radar className="h-12 w-12 text-purple-400" />
            <h1 className="text-5xl font-black gradient-text">Tracker Bots</h1>
          </div>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Advanced intelligence gathering and enemy monitoring for strategic
            advantage.
          </p>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-purple-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-base font-bold">
              🎯 Tracker Bots: Stay ahead with real-time enemy tracking,
              resource monitoring, and threat analysis!
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
            emptyTitle="No tracker bots available"
            emptySubtitle="Check back soon for new tracker bot services."
          />
        </div>
      </section>
    </>
  );
}
