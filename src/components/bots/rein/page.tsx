"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/src/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";
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
      highlights: ["Smart allocation", "Multi-target support", "Priority system", "24/7 monitoring"],
      price: 15,
      stock: 7,
      category: "bots",
    },
    {
      id: "rbot3",
      title: "Elite Rein Bot",
      description: "Professional reinforcement bot with AI optimization",
      tier: "Elite",
      highlights: ["AI optimization", "Guild coordination", "Custom rules", "Instant alerts"],
      price: 20,
      stock: 4,
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
          <span className="inline-flex rounded-full border border-green-400/40 px-3 py-1 text-xs font-semibold text-green-200">
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
        className="px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center border-b-4 border-green-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-12 w-12 text-green-400" />
            <h1 className="text-5xl font-black gradient-text">
              Rein Bots
            </h1>
          </div>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Automated reinforcement management to support your alliance members 24/7.
          </p>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-green-500/50 bg-gradient-to-r from-green-500/20 to-green-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-base font-bold">
              🛡️ Rein Bots: Never miss a reinforcement request with automated troop deployment and smart allocation!
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
            emptyTitle="No rein bots available"
            emptySubtitle="Check back soon for new reinforcement bot services."
          />
        </div>
      </section>
    </>
  );
}
