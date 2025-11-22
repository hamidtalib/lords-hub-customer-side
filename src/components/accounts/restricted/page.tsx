"use client";

import { useState, useMemo } from "react";
import { Button } from "@/src/components/ui/button";
import { Select } from "@/src/components/ui/select";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/src/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";
import Link from "next/link";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Shield } from "lucide-react";

export default function RestrictedAccountsPage() {
  const [priceRange, setPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState("newest");

  const products: MarketplaceProduct[] = [
    {
      id: "racc1",
      title: "Elite Restricted Account",
      description: "K450 - Castle 25, 50M Might",
      tier: "Elite",
      price: 250,
      originalPrice: 300,
      might: "50000000",
      troops: "15000",
      heroes: "15",
      gems: 5000,
      category: "accounts",
    },
    {
      id: "racc2",
      title: "Premium Restricted Account",
      description: "K320 - Castle 24, 35M Might",
      tier: "Premium",
      price: 180,
      originalPrice: 220,
      might: "35000000",
      troops: "10000",
      heroes: "12",
      gems: 3000,
      category: "accounts",
    },
    {
      id: "racc3",
      title: "Advanced Restricted Account",
      description: "K280 - Castle 23, 25M Might",
      tier: "Premium",
      price: 120,
      might: "25000000",
      troops: "8000",
      heroes: "10",
      gems: 2000,
      category: "accounts",
    },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (priceRange === "1-99")
      result = result.filter((p) => p.price >= 1 && p.price <= 99);
    else if (priceRange === "100-199")
      result = result.filter((p) => p.price >= 100 && p.price <= 199);
    else if (priceRange === "200-300")
      result = result.filter((p) => p.price >= 200 && p.price <= 300);
    else if (priceRange === "300+")
      result = result.filter((p) => p.price > 300);

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "mighty")
      result.sort((a, b) => Number(b.might) - Number(a.might));

    return result;
  }, [priceRange, sortBy]);

  const tableColumns = useMemo<TableColumn<MarketplaceProduct>[]>(
    () => [
      {
        id: "Accounts",
        label: "Accounts",
        render: (item) => (
          <div>
            <p className="text-base font-black text-white">{item.title}</p>
            <p className="text-xs text-slate-400">{item.description}</p>
          </div>
        ),
      },
      {
        id: "price",
        label: "Price",
        className: "text-center",
        render: (item) => (
          <p className="text-2xl font-black gradient-text text-center">
            ${item.price}
          </p>
        ),
      },
      {
        id: "actions",
        label: "Action",
        className: "text-center",
        render: (item) => (
          <div className="flex gap-2 justify-center">
            <Link href={`/chat?productId=${item.id}`}>
              <Button size="sm" className="btn-game text-xs cursor-pointer">
                Chat
              </Button>
            </Link>
            <Link href={`/accounts/${item.id}`}>
              <Button size="sm" className="btn-game text-xs cursor-pointer">
                View Details
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
        className="px-4 py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,7,15,0.90), rgba(4,7,15,0.98)), url('https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="h-12 w-12 text-amber-400" />
          <h1 className="text-5xl font-black gradient-text">
            Restricted Kingdom Accounts
          </h1>
        </div>
        <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
          Premium accounts from protected kingdoms with established alliances
          and secure environments.
        </p>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex justify-end gap-4 flex-wrap">
            <Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-36 px-3 py-1 rounded-lg bg-slate-700 text-white border-2 border-amber-500/50 focus:border-amber-400"
            >
              <option value="">All Prices</option>
              <option value="1-99">$1 - $99</option>
              <option value="100-199">$100 - $199</option>
              <option value="200-300">$200 - $300</option>
              <option value="300+">$300+</option>
            </Select>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-36 px-3 py-1 rounded-lg bg-slate-700 text-white border-2 border-amber-500/50 focus:border-amber-400"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="mighty">By Might</option>
            </Select>
          </div>

          <MarketplaceDataTable
            data={filteredProducts}
            columns={tableColumns}
            isLoading={false}
            emptyTitle="No restricted accounts found"
            emptySubtitle="Try adjusting your price filter or check back later for new listings."
          />
        </div>
      </section>
    </>
  );
}
