"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAccountsByType } from "@/store/thunks/accountsThunk";

import { Button } from "@/src/components/ui/button";
import { Select } from "@/src/components/ui/select";
import Link from "next/link";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Shield } from "lucide-react";
import { AccountCardSkeleton } from "@/src/components/loaders";

export default function RestrictedAccountsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { accountsByType, lastDocs, hasMore, loading } = useSelector(
    (state: RootState) => state.accounts
  );

  const accounts = accountsByType["restricted"] || [];

  const [priceRange, setPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Always fetch fresh data on mount
    dispatch(fetchAccountsByType({ type: "restricted" }));
  }, [dispatch]);

  function loadMore() {
    if (!hasMore["restricted"] || loading) return;

    dispatch(
      fetchAccountsByType({
        type: "restricted",
        lastDoc: lastDocs["restricted"] || null,
      })
    );
  }

  const filteredProducts = useMemo(() => {
    // Deduplicate accounts by ID
    const uniqueAccounts = accounts.reduce((acc, account) => {
      if (!acc.find((a) => a.id === account.id)) {
        acc.push(account);
      }
      return acc;
    }, [] as typeof accounts);

    let result = [...uniqueAccounts];

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

    return result;
  }, [accounts, priceRange, sortBy]);

  return (
    <>
      <ScrollAnimation />

      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 text-center bg-cover bg-center border-b border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,7,15,0.90), rgba(4,7,15,0.98)), url('https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="flex flex-col items-center gap-3 mb-4">
          <Shield className="h-12 w-12 text-amber-400" />
          <h1 className="text-3xl font-black gradient-text">
            Restricted Kingdom Accounts
          </h1>
        </div>
        <p className="text-lg text-slate-200 font-semibold max-w-2xl mx-auto px-4">
          Premium accounts from protected kingdoms with established alliances.
        </p>
      </section>

      <section className="px-3 sm:px-4 py-10 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full sm:w-40 bg-slate-700 text-white px-3 py-2 rounded-lg border-2 border-amber-500/50"
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
              className="w-full sm:w-40 bg-slate-700 text-white px-3 py-2 rounded-lg border-2 border-amber-500/50"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Select>
          </div>

          {loading && accounts.length === 0 ? (
            <AccountCardSkeleton count={6} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No restricted accounts found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/90 rounded-xl border-2 border-amber-500/30 hover:border-amber-400/50 transition-all flex flex-col"
                >
                  <img
                    src={item.images?.[0] || "/placeholder.jpg"}
                    className="h-48 w-full object-cover rounded-t-xl"
                  />

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-black text-white mb-1">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {item.description}
                    </p>

                    <div className="mt-auto">
                      <p className="text-2xl font-black gradient-text text-center my-4">
                        ${item.price}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/chat?source=accounts&productId=${item.productId || item.id}`}
                          className="flex-1"
                        >
                          <Button size="sm" className="btn-game text-xs w-full">
                            Chat
                          </Button>
                        </Link>

                        <Link href={`/accounts/${item.id}`} className="flex-1">
                          <Button size="sm" className="btn-game text-xs w-full">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasMore["restricted"] && !priceRange && sortBy === "newest" && (
            <div className="text-center mt-8">
              <Button
                onClick={loadMore}
                disabled={loading}
                className="btn-secondary font-bold"
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
