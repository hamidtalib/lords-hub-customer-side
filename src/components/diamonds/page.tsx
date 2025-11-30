"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/src/components/ui/button";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { loadDiamonds } from "@/store/thunks/diamondThunk";

export default function DiamondsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { diamonds, loading, hasMore, lastDoc } = useSelector(
    (state: RootState) => state.diamonds
  );

  useEffect(() => {
    dispatch(loadDiamonds(null));
  }, [dispatch]);

  function loadMore() {
    if (!hasMore || loading) return;
    dispatch(loadDiamonds(lastDoc));
  }

  return (
    <>
      <ScrollAnimation />

      <section
        className="border-b-4 border-amber-500/30 px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(9,11,25,0.9), rgba(7,10,21,0.97)), url('https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-5xl font-black gradient-text">
            Premium Diamonds
          </h1>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl">
            Power up instantly with secure, verified top-ups.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="uppercase text-xs tracking-[0.4em] text-amber-300 font-semibold">
              Realtime Pricing
            </p>
            <h2 className="text-4xl font-black gradient-text mb-2">
              Diamond Catalog
            </h2>
          </div>

          {loading && diamonds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                Loading diamonds...
              </p>
            </div>
          ) : diamonds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No diamonds available
              </p>
              <p className="text-slate-400 mb-4">
                Check back later for new diamond packages.
              </p>
              <Link href="/chat">
                <Button className="btn-secondary font-bold cursor-pointer">
                  Contact Us
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {diamonds.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 overflow-hidden hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 p-6 text-center"
                >
                  <div className="mb-4">
                    <div className="text-5xl mb-3">💎</div>
                    <h3 className="text-xl font-black text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-3xl font-black gradient-text mb-4">
                      ${item.price}
                    </p>
                    <Link href={`/chat?productId=${item.productId}`}>
                      <Button size="sm" className="btn-game text-xs w-full">
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasMore && (
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
