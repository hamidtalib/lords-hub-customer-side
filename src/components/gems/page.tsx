"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadGems } from "@/store/thunks/gemsThunk";
import { ShoppingCart, Trash2, Gem, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CategoryCardSkeleton, FormSkeleton } from "@/src/components/loaders";

interface WishlistItem {
  id: string;
  name: string;
  gemCost: number;
  quantity: number;
  tab: string;
  imageUrl?: string;
}

export default function GemsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { tabs, itemsByTab, loading } = useSelector(
    (state: RootState) => state.gems
  );

  const [activeTab, setActiveTab] = useState<string>("");
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const gemImageUrl = require("@/public/images/gems.png").default.src;
  const bgImgUrl = require("@/public/images/gems_bg.jpeg").default.src;

  useEffect(() => {
    dispatch(loadGems());
  }, [dispatch]);

  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  const handleQuantityChange = (itemId: string, value: string) => {
    const qty = parseInt(value) || 0;
    setQuantities((prev) => ({ ...prev, [itemId]: qty }));
  };

  const handleAddToWishlist = (
    itemId: string,
    itemName: string,
    gemCost: number,
    tab: string,
    imageUrl?: string
  ) => {
    const quantity = quantities[itemId] || 0;
    if (quantity <= 0) {
      toast.error("Please enter a quantity");
      return;
    }

    const existingIndex = wishlist.findIndex((item) => item.id === itemId);

    if (existingIndex >= 0) {
      // Update existing item
      const updated = [...wishlist];
      updated[existingIndex].quantity = quantity;
      setWishlist(updated);
      toast.success(`Updated ${itemName} quantity to ${quantity}`);
    } else {
      // Add new item
      setWishlist([
        ...wishlist,
        { id: itemId, name: itemName, gemCost, quantity, tab, imageUrl },
      ]);
      toast.success(`Added ${itemName} to wishlist`);
    }

    // Reset quantity input
    setQuantities((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    const item = wishlist.find((i) => i.id === itemId);
    setWishlist(wishlist.filter((item) => item.id !== itemId));
    if (item) {
      toast.info(`Removed ${item.name} from wishlist`);
    }
  };

  const totalGems = wishlist.reduce(
    (sum, item) => sum + item.gemCost * item.quantity,
    0
  );

  const handlePurchase = () => {
    if (wishlist.length === 0) {
      toast.error("Your wishlist is empty");
      return;
    }
    const wishlistData = encodeURIComponent(JSON.stringify(wishlist));
    toast.success("Redirecting to chat...");
    router.push(
      `/chat?source=gems&gems=true&wishlist=${wishlistData}&total=${totalGems}`
    );
  };

  const currentItems = itemsByTab[activeTab] || [];

  return (
    <>
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="border-b-4 border-amber-500/30 px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center fade-up"
        style={{
          backgroundImage: `url(${bgImgUrl})`,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">
            Gems Calculator
          </h1>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl">
            Calculate your gem needs and build your custom wishlist.
          </p>
        </div>
      </section>

      {/* Gems Rate Image Section */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 bg-slate-900/50 fade-up">
        <div className="mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl p-6 border-2 border-amber-500/30">
            <img
              src="https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&w=1200&q=80"
              alt="Gems Rate"
              className="w-full max-w-2xl mx-auto h-64 sm:h-80 rounded-lg object-cover"
            />
            <p className="text-sm text-slate-400 mt-3 text-center font-semibold">
              Current Gems Rate Chart
            </p>
          </div>
        </div>
      </section>

      {/* Tabs and Items Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Section Header */}
          <div className="text-center">
            <p className="uppercase text-xs tracking-[0.4em] text-amber-300 font-semibold">
              Item Categories
            </p>
            <h2 className="text-4xl font-black gradient-text mb-2">
              Select Items
            </h2>
          </div>

          {/* Tabs Navigation */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    console.log("Tab clicked:", tab);
                    setActiveTab(tab);
                  }}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          {loading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 p-4 animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                          <div className="h-4 bg-gradient-to-r from-amber-600/30 via-amber-500/30 to-amber-600/30 bg-[length:200%_100%] animate-shimmer rounded-sm w-24" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
                        <div className="w-24 h-10 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                        <div className="w-16 h-8 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No items in {activeTab}
              </p>
              <p className="text-slate-400">Check other tabs for items.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover border border-amber-500/30"
                          />
                        ) : (
                          <Gem className="h-10 w-10 text-amber-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-amber-400 font-bold">
                          {item.gemCost.toLocaleString()} Gems
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
                      <Input
                        type="number"
                        min="0"
                        placeholder="Quantity"
                        value={quantities[item.id] || ""}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="bg-slate-700/50 border-slate-600 text-white text-sm text-center w-24"
                      />
                      <Button
                        onClick={() =>
                          handleAddToWishlist(
                            item.id,
                            item.name,
                            item.gemCost,
                            activeTab,
                            item.imageUrl
                          )
                        }
                        disabled={
                          !quantities[item.id] || quantities[item.id] <= 0
                        }
                        className="btn-game text-xs cursor-pointer px-3 py-2 w-full lg:w-auto"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Wishlist Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-900/50 fade-up">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Section Header */}
          <div className="text-center">
            <p className="uppercase text-xs tracking-[0.4em] text-amber-300 font-semibold">
              Your Selection
            </p>
            <h2 className="text-4xl font-black gradient-text mb-2">Wishlist</h2>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl font-bold text-white mb-2">
                Your wishlist is empty
              </p>
              <p className="text-slate-400">
                Add items from the categories above to get started
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-amber-500/20 hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover border border-amber-500/30"
                          />
                        ) : (
                          <Gem className="h-10 w-10 text-amber-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          <span className="text-amber-400 font-semibold">
                            {item.tab}
                          </span>{" "}
                          • {item.gemCost.toLocaleString()} gems ×{" "}
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-black gradient-text">
                        <img
                          src={gemImageUrl}
                          alt="Gem"
                          className="h-11 w-11 inline mr-1 rounded object-cover"
                        />
                        {(item.gemCost * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-900/20 rounded-lg cursor-pointer"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total and Purchase */}
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl p-6 sm:p-8 border-2 border-amber-500/30 shadow-xl shadow-amber-500/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <span className="text-2xl font-black text-white">
                    Total Gems:
                  </span>
                  <span className="text-4xl font-black gradient-text">
                    <img
                      src={gemImageUrl}
                      alt="Gem"
                      className="h-11 w-11 inline mr-1 rounded object-cover"
                    />
                    {totalGems.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={handlePurchase}
                  className="w-full btn-game font-bold py-4 text-lg cursor-pointer"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Purchase Now ({totalGems.toLocaleString()} Gems)
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
