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
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <Tabs
            value={activeTab}
            onValueChange={(v: string) => setActiveTab(v as CategoryKey)}
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 bg-slate-900/50 p-1 rounded-lg mb-4 sm:mb-6 gap-1">
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-semibold text-[10px] sm:text-xs lg:text-sm rounded-md transition-all px-1 sm:px-2 py-1.5 sm:py-2"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(GEM_ITEMS).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                          <div>
                            <h3 className="font-bold text-white text-xs sm:text-sm">
                              {item.name}
                            </h3>
                            <p className="text-amber-400 font-black text-base sm:text-lg">
                              {item.gemCost.toLocaleString()} 💎
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => decrementQuantity(item)}
                              disabled={quantity === 0}
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-amber-500/50 hover:bg-amber-500/20"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>

                            <Input
                              type="number"
                              min="0"
                              value={quantity || ""}
                              onChange={(e) =>
                                setQuantityDirect(item, e.target.value)
                              }
                              placeholder="0"
                              className="h-7 sm:h-8 text-center font-bold bg-slate-700/50 border-slate-600 text-white text-xs sm:text-sm"
                            />

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => incrementQuantity(item)}
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-amber-500/50 hover:bg-amber-500/20"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>

                          {quantity > 0 && (
                            <div className="text-[10px] sm:text-xs text-amber-300 font-semibold text-center">
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
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                <span className="hidden xs:inline">Your Wishlist</span>
                <span className="xs:hidden">Wishlist</span>
              </h2>
              <Button
                variant="destructive"
                size="sm"
                onClick={clearWishlist}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {Object.values(wishlist).map(({ item, quantity }) => (
                <Card
                  key={item.id}
                  className="border border-amber-500/30 bg-slate-800/50"
                >
                  <CardContent className="p-3 sm:p-4 flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-xs sm:text-sm truncate">{item.name}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        {item.gemCost.toLocaleString()} 💎 × {quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base sm:text-lg lg:text-xl font-black text-amber-400">
                        {(item.gemCost * quantity * 3).toLocaleString()} 💎
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t-2 border-amber-500/50 pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 gap-2">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white text-center sm:text-left">
                  Total Gems Required:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  {getTotalGems().toLocaleString()} 💎
                </span>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg"
                onClick={() => {
                  // Navigate to chat or purchase page
                  window.location.href = `/chat?productId=gems&gems=${getTotalGems()}`;
                }}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Purchase {getTotalGems().toLocaleString()} Gems
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(wishlist).length === 0 && (
        <Card className="border-2 border-slate-600 bg-slate-800/50">
          <CardContent className="p-8 sm:p-12 text-center">
            <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-slate-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-400 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-slate-500 text-sm sm:text-base px-4">
              Add items from the tabs above to calculate total gems needed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
