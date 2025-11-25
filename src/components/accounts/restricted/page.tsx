"use client";

import { useState, useMemo } from "react";
import { Button } from "@/src/components/ui/button";
import { Select } from "@/src/components/ui/select";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/src/components/marketplace/data-table";
import { MarketplaceProduct } from "@/store/lib/types/products";
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
        id: "image",
        label: "Image",
        className: "text-center",
        render: (item) => (
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
        ),
      },
      {
        id: "Accounts",
        label: "Accounts",
        render: (item) => (
          <div>
            <p className="text-base font-black text-white whitespace-nowrap">{item.title}</p>
            <p className="text-xs text-slate-400 whitespace-nowrap">{item.description}</p>
          </div>
        ),
      },
      {
        id: "price",
        label: "Price",
        className: "text-center",
        render: (item) => (
          <p className="text-2xl font-black gradient-text text-center whitespace-nowrap">
            ${item.price}
          </p>
        ),
      },
      {
        id: "actions",
        label: "Action",
        className: "text-center",
        render: (item) => (
          <div className="flex gap-2 justify-center whitespace-nowrap">
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
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,7,15,0.90), rgba(4,7,15,0.98)), url('https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Shield className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center px-2">
            Restricted Kingdom Accounts
          </h1>
        </div>
        <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
          Premium accounts from protected kingdoms with established alliances
          and secure environments.
        </p>
      </section>

      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-lg bg-slate-700 text-white border-2 border-amber-500/50 focus:border-amber-400 text-sm"
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
              className="w-full sm:w-40 px-3 py-2 rounded-lg bg-slate-700 text-white border-2 border-amber-500/50 focus:border-amber-400 text-sm"
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
