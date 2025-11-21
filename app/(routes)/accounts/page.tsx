"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function AccountsPage() {
  // Price filter state
  const [priceRange, setPriceRange] = useState<
    "1-99" | "100-199" | "200-300" | "300+" | ""
  >("");
  const [sortBy, setSortBy] = useState("newest");

  const products: MarketplaceProduct[] = [
    {
      id: "acc1",
      title: "Starter Account",
      description: "Level 10, basic troops",
      tier: "Basic",
      price: 15,
      originalPrice: 20,
      might: "1200",
      troops: "500",
      heroes: "2",
      gems: 100,
      category: "accounts",
    },
    {
      id: "acc2",
      title: "Pro Account",
      description: "Level 25, advanced troops",
      tier: "Premium",
      price: 60,
      originalPrice: 80,
      might: "5000",
      troops: "2000",
      heroes: "5",
      gems: 500,
      category: "accounts",
    },
    {
      id: "acc3",
      title: "Elite Account",
      description: "Level 50, max troops",
      tier: "Elite",
      price: 120,
      might: "12000",
      troops: "5000",
      heroes: "10",
      gems: 2000,
      category: "accounts",
    },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply price range filtering
    if (priceRange === "1-99")
      result = result.filter((p) => p.price >= 1 && p.price <= 99);
    else if (priceRange === "100-199")
      result = result.filter((p) => p.price >= 100 && p.price <= 199);
    else if (priceRange === "200-300")
      result = result.filter((p) => p.price >= 200 && p.price <= 300);
    else if (priceRange === "300+")
      result = result.filter((p) => p.price > 300);

    // Sorting
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
          <>
            <Link href={`/chat?productId=${item.id}`}>
              <Button size="sm" className="btn-game text-xs">
                Chat
              </Button>
            </Link>
            <Link href={``}>
              <Button size="sm" className="btn-game text-xs mx-2">
                View Details
              </Button>
            </Link>
          </>
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
        className="px-4 py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,7,15,0.90), rgba(4,7,15,0.98)), url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <h1 className="text-5xl font-black gradient-text mb-4">
          Premium Accounts
        </h1>
        <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
          Discover quality Lords Mobile accounts with guaranteed authenticity
          and instant verification.
        </p>
      </section>

      {/* Price Filter + Sort */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 flex-wrap">
            {/* Price Dropdown */}
            <select
              className="px-4 py-1 rounded-lg bg-slate-700 text-white border-2 border-amber-500/50 focus:border-amber-400"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
            >
              <option value="">All Prices</option>
              <option value="1-99">1 - 99</option>
              <option value="100-199">100 - 199</option>
              <option value="200-300">200 - 300</option>
              <option value="300+">300+</option>
            </select>

            {/* Sort Button */}
            <Button
              className="border-2 px-4 py-4 border-amber-500/50 text-white rounded-lg"
              onClick={() =>
                setSortBy(
                  sortBy === "newest"
                    ? "price-low"
                    : sortBy === "price-low"
                    ? "price-high"
                    : sortBy === "price-high"
                    ? "mighty"
                    : "newest"
                )
              }
            >
              Sort:{" "}
              {sortBy === "newest"
                ? "Newest"
                : sortBy === "price-low"
                ? "Price Low-High"
                : sortBy === "price-high"
                ? "Price High-Low"
                : "By Might"}
            </Button>
          </div>

          {/* Table */}
          <MarketplaceDataTable
            data={filteredProducts}
            columns={tableColumns}
            isLoading={false}
            emptyTitle="No accounts found"
            emptySubtitle="Try adjusting your price filter or check back later for new listings."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
