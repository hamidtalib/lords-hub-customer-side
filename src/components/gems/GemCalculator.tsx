"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import {
  GEM_ITEMS,
  CATEGORIES,
  CategoryKey,
  GemItem,
} from "@/src/data/gemItems";

interface WishlistItem {
  item: GemItem;
  quantity: number;
}

const STORAGE_KEY = "lords-hub-gem-wishlist";

export function GemCalculator() {
  const [wishlist, setWishlist] = useState<Record<string, WishlistItem>>({});
  const [activeTab, setActiveTab] = useState<CategoryKey>("speedups");

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlist]);

  const updateQuantity = (item: GemItem, quantity: number) => {
    if (quantity <= 0) {
      // Remove from wishlist
      const newWishlist = { ...wishlist };
      delete newWishlist[item.id];
      setWishlist(newWishlist);
    } else {
      // Add or update in wishlist
      setWishlist({
        ...wishlist,
        [item.id]: { item, quantity },
      });
    }
  };

  const incrementQuantity = (item: GemItem) => {
    const current = wishlist[item.id]?.quantity || 0;
    updateQuantity(item, current + 1);
  };

  const decrementQuantity = (item: GemItem) => {
    const current = wishlist[item.id]?.quantity || 0;
    if (current > 0) {
      updateQuantity(item, current - 1);
    }
  };

  const setQuantityDirect = (item: GemItem, value: string) => {
    const quantity = parseInt(value) || 0;
    updateQuantity(item, quantity);
  };

  const clearWishlist = () => {
    setWishlist({});
  };

  const getTotalGems = () => {
    return Object.values(wishlist).reduce(
      (total, { item, quantity }) => total + item.gemCost * quantity * 3, // Multiply by 3
      0
    );
  };

  const getItemQuantity = (itemId: string) => {
    return wishlist[itemId]?.quantity || 0;
  };

  return (
    <div className="space-y-8">
      {/* Calculator Tabs */}
      <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={(v: string) => setActiveTab(v as CategoryKey)}
          >
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-900/50 p-1 rounded-lg mb-6 gap-1">
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-semibold text-xs lg:text-sm rounded-md transition-all px-2 py-2"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(GEM_ITEMS).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <Card
                        key={item.id}
                        className={`border-2 transition-all ${
                          quantity > 0
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-slate-600 bg-slate-800/50"
                        }`}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <h3 className="font-bold text-white text-sm">
                              {item.name}
                            </h3>
                            <p className="text-amber-400 font-black text-lg">
                              {item.gemCost.toLocaleString()} 💎
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => decrementQuantity(item)}
                              disabled={quantity === 0}
                              className="h-8 w-8 p-0 border-amber-500/50 hover:bg-amber-500/20"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <Input
                              type="number"
                              min="0"
                              value={quantity || ""}
                              onChange={(e) =>
                                setQuantityDirect(item, e.target.value)
                              }
                              placeholder="0"
                              className="h-8 text-center font-bold bg-slate-700/50 border-slate-600 text-white"
                            />

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => incrementQuantity(item)}
                              className="h-8 w-8 p-0 border-amber-500/50 hover:bg-amber-500/20"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {quantity > 0 && (
                            <div className="text-xs text-amber-300 font-semibold text-center">
                              Total:{" "}
                              {(item.gemCost * quantity).toLocaleString()} 💎
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Wishlist Section */}
      {Object.keys(wishlist).length > 0 && (
        <Card className="border-2 border-amber-500 bg-gradient-to-br from-amber-900/20 to-slate-800/90">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-amber-400" />
                Your Wishlist
              </h2>
              <Button
                variant="destructive"
                size="sm"
                onClick={clearWishlist}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {Object.values(wishlist).map(({ item, quantity }) => (
                <Card
                  key={item.id}
                  className="border border-amber-500/30 bg-slate-800/50"
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-slate-400">
                        {item.gemCost.toLocaleString()} 💎 {quantity} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-amber-400">
                        {(item.gemCost * quantity * 3).toLocaleString()} 💎
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t-2 border-amber-500/50 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">
                  Total Gems Required:
                </span>
                <span className="text-3xl font-black text-amber-400">
                  {getTotalGems().toLocaleString()} 💎
                </span>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-3 text-lg"
                onClick={() => {
                  // Navigate to chat or purchase page
                  window.location.href = `/chat?productId=gems&gems=${getTotalGems()}`;
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Purchase {getTotalGems().toLocaleString()} Gems
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(wishlist).length === 0 && (
        <Card className="border-2 border-slate-600 bg-slate-800/50">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-slate-500">
              Add items from the tabs above to calculate total gems needed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
