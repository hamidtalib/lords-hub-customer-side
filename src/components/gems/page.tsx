"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Calculator } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/src/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function GemsPage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [quantity, setQuantity] = useState(50);

  const gemProducts: MarketplaceProduct[] = [
    {
      id: "gem1",
      title: "Starter Pack",
      description: "1000 Gems",
      tier: "Basic",
      highlights: ["Instant delivery", "Safe purchase"],
      price: 10,
      stock: 100,
      category: "gems",
      gems: 1000,
    },
    {
      id: "gem2",
      title: "Pro Pack",
      description: "5000 Gems",
      tier: "Premium",
      highlights: ["Best value", "Fast delivery"],
      price: 45,
      stock: 50,
      category: "gems",
      gems: 5000,
    },
    {
      id: "gem3",
      title: "Elite Pack",
      description: "10000 Gems",
      tier: "Elite",
      highlights: ["Huge savings", "Priority support"],
      price: 80,
      stock: 20,
      category: "gems",
      gems: 10000,
    },
  ];

  const basePackSize = gemProducts[0]?.gems ?? 1000;
  const basePackPrice = gemProducts[0]?.price ?? 10;
  const unitPrice = basePackPrice / basePackSize;

  const calculatePrice = (qty: number) => {
    return parseFloat((qty * unitPrice).toFixed(2));
  };

  const tableColumns = useMemo<TableColumn<MarketplaceProduct>[]>(
    () => [
      {
        id: "pack",
        label: "Pack",
        render: (item) => (
          <div>
            <p className="text-base font-black text-white">{item.title}</p>
            <p className="text-xs text-slate-300">{item.description}</p>
          </div>
        ),
      },
      {
        id: "tier",
        label: "Tier",
        render: (item) => (
          <span className="inline-flex rounded-full border border-amber-400/40 px-3 py-1 text-xs font-semibold text-amber-200">
            {item.tier}
          </span>
        ),
      },
      {
        id: "highlights",
        label: "Highlights",
        render: (item) => (
          <ul className="text-xs text-slate-300 list-disc list-inside">
            {item.highlights?.map((h) => (
              <li key={h}>{h}</li>
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
        id: "actions",
        label: "Action",
        className: "text-right",
        render: (item) => (
          <div className="flex gap-2 justify-end">
            <Link href={`/chat?productId=${item.id}`}>
              <Button
                size="sm"
                className="btn-game text-xs flex items-center gap-1 cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" /> Buy
              </Button>
            </Link>
            <Button
              size="sm"
              className="btn-secondary text-xs flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setQuantity(item.gems ?? 50);
                setShowCalculator(true);
              }}
            >
              <Calculator className="h-4 w-4" /> Calculator
            </Button>
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
        className="px-4 py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,10,25,0.92), rgba(8,10,25,0.96)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <h1 className="text-5xl font-black gradient-text mb-4">Premium Gems</h1>
        <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
          Boost your gameplay with gems from Lords Hub.
        </p>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
          <MarketplaceDataTable
            data={gemProducts}
            columns={tableColumns}
            isLoading={false}
            emptyTitle="No gem packs available"
            emptySubtitle="Add some gem packs to display them here."
          />
        </div>
      </section>

      {showCalculator && (
        <section className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <Card className="w-full max-w-md p-6 rounded-xl shadow-2xl bg-gradient-to-br from-slate-800/90 to-slate-700/90">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                <Calculator className="h-6 w-6" /> Gem Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-200">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 w-full h-12 text-lg font-bold text-white rounded-xl bg-slate-700/50 border-2 border-amber-500/50"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200">Total Price:</span>
                <span className="text-2xl font-black gradient-text">
                  ${calculatePrice(quantity)}
                </span>
              </div>
              <Link
                href={`/chat?productId=calculator&quantity=${quantity}&price=${calculatePrice(
                  quantity
                )}`}
              >
                <Button className="w-full btn-game font-bold py-3 flex items-center justify-center gap-2 cursor-pointer">
                  <ShoppingCart className="h-5 w-5" /> Purchase Gems
                </Button>
              </Link>
              <Button
                className="w-full btn-secondary mt-2 cursor-pointer"
                onClick={() => setShowCalculator(false)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}
