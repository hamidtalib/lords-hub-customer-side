"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBotsByType } from "@/store/thunks/botsThunk";

import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { Button } from "@/src/components/ui/button";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Wheat } from "lucide-react";

export default function FarmBots() {
  const dispatch = useDispatch<AppDispatch>();

  const { botsByType, lastDocs, hasMore, loading } = useSelector(
    (state: RootState) => state.bots
  );

  const bots = botsByType["farm"] || [];
  const lastDoc = lastDocs["farm"] || null;
  const moreAvailable = hasMore["farm"] || false;

  useEffect(() => {
    // Load first page only once
    if (!bots.length) {
      dispatch(fetchBotsByType({ type: "farm" }));
    }
  }, []);

  function loadMore() {
    if (!moreAvailable || loading) return;
    dispatch(fetchBotsByType({ type: "farm", lastDoc }));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <ScrollAnimation />

      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 lg:px-8 bg-cover bg-center border-b-4 border-green-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,9,20,0.85), rgba(6,9,20,0.95)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Wheat className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-green-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">
              Farm/Bank Bots
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
            Automate your resource farming empire with intelligent multi-account
            management and bank coordination.
          </p>
        </div>
      </section>

      <section className="px-4 py-4 sm:py-6 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <Alert className="border-2 border-green-500/50 bg-gradient-to-r from-green-500/20 to-green-400/10 shadow-lg rounded-xl">
            <AlertDescription className="text-slate-200 text-xs sm:text-sm lg:text-base font-bold">
              Farm/Bank Bots: Automated resource gathering, multi-account
              management, and smart resource routing to your main account.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          {loading && bots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                Loading farm bots...
              </p>
            </div>
          ) : bots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No farm bots available
              </p>
              <p className="text-slate-400">
                Check back soon for new farm bot services.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {bots.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-green-500/30 overflow-hidden hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 p-6 flex flex-col h-full"
                  >
                    <div className="flex-grow flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-black text-white mb-2 min-h-[3.5rem] flex items-center">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-400 min-h-[2.5rem]">
                          {item.description}
                        </p>
                      </div>

                      <div className="mb-4 flex-grow">
                        <p className="text-xs text-slate-500 font-semibold mb-2">
                          Features:
                        </p>

                        <ul className="text-xs text-slate-300 space-y-1">
                          {item.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-400 flex-shrink-0">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700 mt-auto">
                      <p className="text-2xl font-black gradient-text text-center mb-3">
                        ${item.price}
                        <span className="text-sm text-slate-400">/month</span>
                      </p>

                      <Link href={`/chat?source=farm-bots&productId=${item.productId}&formUrl=${encodeURIComponent("https://docs.google.com/forms/d/e/1FAIpQLSfgSHUoSSFxxQ9HJKtUGhcocqAtf0a7VJy8gXgYHm20BFCjeQ/viewform?usp=dialog")}`}>
                        <Button size="sm" className="btn-game text-xs w-full">
                          Subscribe
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {moreAvailable && (
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
            </>
          )}
        </div>
      </section>
    </main>
  );
}
