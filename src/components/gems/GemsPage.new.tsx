"use client";

import Image from "next/image";
import { Calculator } from "lucide-react";
import { GemCalculator } from "./GemCalculator";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function GemsPageNew() {
  return (
    <>
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,10,25,0.92), rgba(8,10,25,0.96)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-2">
          <Calculator className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">Gem Calculator</h1>
        </div>
        <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
          Plan your purchases and calculate exactly how many gems you need
        </p>
      </section>

      {/* Gem Rates Image Section */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl p-4 sm:p-6 border-2 border-amber-500/30 shadow-2xl">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-amber-400">💎</span>
              Gem Rates & Packages
            </h2>
            <div className="relative w-full aspect-video bg-slate-900/50 rounded-lg overflow-hidden border-2 border-slate-700">
              {/* Placeholder for Gem Rates Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl">💎</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Gem Rates</h3>
                  <p className="text-slate-400 max-w-md text-xs sm:text-sm lg:text-base px-4">
                    Replace this section with your actual gem rates image.
                    <br />
                    Recommended size: 1200x675px (16:9 ratio)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 text-xs sm:text-sm px-4">
                    <div className="bg-slate-800 p-3 sm:p-4 rounded-lg">
                      <p className="text-amber-400 font-bold text-xs sm:text-sm">Starter Pack</p>
                      <p className="text-white text-lg sm:text-xl font-black">1,000 💎</p>
                      <p className="text-slate-400 text-xs sm:text-sm">$9.99</p>
                    </div>
                    <div className="bg-slate-800 p-3 sm:p-4 rounded-lg">
                      <p className="text-amber-400 font-bold text-xs sm:text-sm">Pro Pack</p>
                      <p className="text-white text-lg sm:text-xl font-black">5,000 💎</p>
                      <p className="text-slate-400 text-xs sm:text-sm">$44.99</p>
                    </div>
                    <div className="bg-slate-800 p-3 sm:p-4 rounded-lg">
                      <p className="text-amber-400 font-bold text-xs sm:text-sm">Elite Pack</p>
                      <p className="text-white text-lg sm:text-xl font-black">10,000 💎</p>
                      <p className="text-slate-400 text-xs sm:text-sm">$79.99</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Uncomment and use this when you have the actual image */}
              {/* <Image
                src="/images/gem-rates.png"
                alt="Lords Mobile Gem Rates"
                fill
                className="object-contain"
                priority
              /> */}
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              * Prices and packages may vary. Check in-game for current rates.
            </p>
          </div>
        </div>
      </section>

      {/* Gem Calculator Section */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-8 px-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Calculate Your Gem Needs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Select items from different categories and build your wishlist
            </p>
          </div>
          
          <GemCalculator />
        </div>
      </section>

      {/* Info Section */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-800/90 rounded-xl p-5 sm:p-6 lg:p-8 border-2 border-blue-500/30">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              💡 How to Use the Calculator
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">1.</span>
                <span>Browse through the tabs to find items you need</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span>Use +/- buttons or type quantity directly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Your wishlist updates automatically as you add items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">4.</span>
                <span>See total gems required at the bottom</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">5.</span>
                <span>Your wishlist is saved automatically - refresh anytime!</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
