"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import {
  MarketplaceDataTable,
  TableColumn,
} from "@/components/marketplace/data-table";
import { MarketplaceProduct } from "@/lib/types/products";

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Dummy account data
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
      status: "available",
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
      status: "available",
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
      status: "sold_out",
      category: "accounts",
    },
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.might?.toString().includes(searchTerm)
    );

    if (sortBy === "price-low")
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === "price-high")
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortBy === "mighty")
      result.sort((a, b) => (Number(b.might) || 0) - (Number(a.might) || 0));
    else result = result; // newest default

    return result;
  }, [searchTerm, sortBy]);

  const tableColumns = useMemo<TableColumn<MarketplaceProduct>[]>(
    () => [
      {
        id: "listing",
        label: "Listing",
        render: (item) => (
          <div>
            <p className="text-base font-black text-white">{item.title}</p>
            <p className="text-xs text-slate-400">{item.description}</p>
          </div>
        ),
      },
      {
        id: "power",
        label: "Power",
        render: (item) => (
          <div className="flex flex-col gap-1 text-xs uppercase text-slate-300">
            {item.might && <span>⚔️ Might: {item.might}</span>}
            {item.troops && <span>🛡️ Troops: {item.troops}</span>}
          </div>
        ),
      },
      {
        id: "price",
        label: "Price",
        className: "text-right",
        render: (item) => (
          <div className="text-right">
            <p className="text-2xl font-black gradient-text">${item.price}</p>
            {item.originalPrice && (
              <p className="text-xs text-slate-400 line-through">
                ${item.originalPrice}
              </p>
            )}
          </div>
        ),
      },
      {
        id: "status",
        label: "Status",
        render: (item) => (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
              item.status === "sold_out"
                ? "bg-red-600/30 text-red-400"
                : "bg-green-600/30 text-green-400"
            }`}
          >
            {item.status === "sold_out" ? "Sold Out" : "Available"}
          </span>
        ),
      },
      {
        id: "actions",
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

      {/* Search + Sort */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Input
              placeholder="Search by name or might..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 h-12 rounded-xl bg-slate-700/50 border-2 border-amber-500/50 text-white placeholder:text-slate-400"
            />
            <Button
              className="border-2 border-amber-500/50 text-white rounded-xl"
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
            emptySubtitle="Try adjusting your search or check back later for new listings."
          />

          {/* Card view */}
          {filteredProducts.length > 0 && (
            <div>
              <h3 className="text-3xl font-black gradient-text mb-6">
                Featured Accounts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="border-2 border-amber-500/30 card-lift hover:border-amber-400 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl rounded-xl"
                  >
                    <CardHeader>
                      <CardTitle className="gradient-text text-2xl">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm text-slate-200">
                        <span>Might:</span>
                        <span>{product.might}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-200">
                        <span>Troops:</span>
                        <span>{product.troops}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-200">
                        <span>Gems:</span>
                        <span>{product.gems}</span>
                      </div>
                      <div className="flex justify-between items-baseline mt-3 border-t-2 border-amber-500/30 pt-3">
                        <span className="text-2xl font-black gradient-text">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Link href={`/chat?productId=${product.id}`}>
                        <Button className="w-full btn-game mt-3 font-bold">
                          Chat Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
