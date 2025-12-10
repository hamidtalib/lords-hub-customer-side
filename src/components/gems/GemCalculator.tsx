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

// TYPES
interface GemItem {
  id: string;
  category: string;
  name: string;
  gemCost: number;
}

type CategoryKey = string;

const STORAGE_KEY = "lords-hub-gem-wishlist";

export function GemCalculator() {
  const [categories, setCategories] = useState<Record<CategoryKey, string>>({});
  const [itemsByCategory, setItemsByCategory] = useState<
    Record<CategoryKey, GemItem[]>
  >({});

  const [wishlist, setWishlist] = useState<
    Record<string, { item: GemItem; quantity: number }>
  >({});
  const [activeTab, setActiveTab] = useState<CategoryKey>("");

  // Fetch categories and items dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        // Replace this with your backend
        const res = await fetch("/api/gems/items");
        const data = await res.json();

        setCategories(data.categories);
        setItemsByCategory(data.items);

        // Set first category as active
        const keys = Object.keys(data.categories);
        if (keys.length > 0) setActiveTab(keys[0]);
      } catch (error) {
        console.error("Failed to load gem calculator data:", error);
      }
    };

    loadData();
  }, []);

  // Load wishlist from storage
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

  // Save wishlist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const updateQuantity = (item: GemItem, quantity: number) => {
    if (quantity <= 0) {
      const copy = { ...wishlist };
      delete copy[item.id];
      setWishlist(copy);
    } else {
      setWishlist({ ...wishlist, [item.id]: { item, quantity } });
    }
  };

  const getItemQuantity = (id: string) => wishlist[id]?.quantity || 0;

  const getTotalGems = () => {
    return Object.values(wishlist).reduce(
      (sum, { item, quantity }) => sum + item.gemCost * quantity * 3,
      0
    );
  };

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
        <CardContent className="p-4">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as CategoryKey)}
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 bg-slate-900/50 p-1 rounded-lg mb-4">
              {Object.entries(categories).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(itemsByCategory).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => {
                    const qty = getItemQuantity(item.id);

                    return (
                      <Card
                        key={item.id}
                        className={`border-2 ${
                          qty > 0
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-slate-600"
                        }`}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <h3 className="font-bold text-white">
                              {item.name}
                            </h3>
                            <p className="text-amber-400 font-black">
                              {item.gemCost.toLocaleString()} 💎
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item, qty - 1)}
                              disabled={qty === 0}
                            >
                              <Minus />
                            </Button>

                            <Input
                              type="number"
                              value={qty || ""}
                              onChange={(e) =>
                                updateQuantity(
                                  item,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="text-center font-bold bg-slate-700/50"
                            />

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item, qty + 1)}
                            >
                              <Plus />
                            </Button>
                          </div>

                          {qty > 0 && (
                            <p className="text-xs text-amber-300 text-center">
                              Total: {(item.gemCost * qty).toLocaleString()} 💎
                            </p>
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

      {/* Wishlist Summary */}
      {Object.keys(wishlist).length > 0 && (
        <Card className="border-amber-500 bg-amber-900/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-black text-white mb-4">
              Your Wishlist
            </h2>

            {Object.values(wishlist).map(({ item, quantity }) => (
              <div
                key={item.id}
                className="flex justify-between text-white mb-2"
              >
                <div>
                  {item.name} x {quantity}
                </div>
                <div>{(item.gemCost * quantity * 3).toLocaleString()} 💎</div>
              </div>
            ))}

            <div className="border-t border-amber-500 mt-4 pt-4 flex justify-between">
              <span className="font-bold text-white">Total Gems Required</span>
              <span className="text-amber-400 font-black text-xl">
                {getTotalGems().toLocaleString()} 💎
              </span>
            </div>

            <Button
              className="mt-4 w-full bg-amber-600"
              onClick={() =>
                (window.location.href = `/chat?source=gems&productId=gems&gems=${getTotalGems()}`)
              }
            >
              Purchase
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
