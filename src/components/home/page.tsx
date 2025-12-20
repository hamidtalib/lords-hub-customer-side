"use client";

import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import {
  HeroSkeleton,
  CategoryCardSkeleton,
  StatsSkeleton,
  TestimonialSkeleton,
} from "@/src/components/loaders";

export default function HomePage() {
  return (
    <>
      <ScrollAnimation />
      {/* HERO with VIDEO BACKGROUND */}
      <section className="relative px-3 py-10 sm:px-4 sm:py-20 lg:px-8 lg:py-24 min-h-[75vh] overflow-hidden flex items-end">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto pb-10 w-full">
          <h1 className="mb-6 sm:mb-8 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight fade-up text-hover px-2">
            <span className="block mb-2 sm:mb-3">🎮 Lords Hub</span>
            Level Up Your Game 🚀
          </h1>

          <p className="mx-auto mb-8 sm:mb-10 max-w-3xl text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold fade-up text-hover px-4">
            Buy & sell premium Lords Mobile accounts, gems, diamonds & bot
            services with confidence. 💎
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center fade-up px-4">
            <Link href="/chat" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="gap-2 font-bold cursor-pointer text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 text-white"
              >
                Chat Us <ChevronRight className="ml-2 sm:ml-3" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="gap-2 font-bold cursor-pointer text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 text-white"
              >
                Learn More <Zap className="ml-2 sm:ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* POPULAR CATEGORIES */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 fade-up">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-10 text-hover px-2">
          Popular Categories 🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto fade-up">
          {[
            {
              title: "🔥 High-End Accounts",
              img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            },
            {
              title: "💎 Gems & Boosts",
              img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            },
            {
              title: "🤖 Bot Services",
              img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-slate-800/70 border border-amber-500/30 card-hover transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 sm:h-48 lg:h-52 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-hover transition-all duration-300">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* WHY CHOOSE US */}
      <section className="relative px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 fade-up overflow-hidden">
        {/* Gaming Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-12 text-hover px-2">
            Why Gamers Love Us 💛
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto fade-up">
            {[
              { emoji: "⚡", title: "Fast Delivery", desc: "Instant orders!" },
              {
                emoji: "🛡",
                title: "Secure Payments",
                desc: "You're protected.",
              },
              { emoji: "💬", title: "24/7 Support", desc: "Real humans." },
              {
                emoji: "🌟",
                title: "Top Rated",
                desc: "Trusted by thousands.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-slate-800/80 border border-amber-500/30 rounded-2xl card-hover transition-all duration-500 backdrop-blur-sm"
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <p className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 transition-transform duration-300 hover:scale-125 inline-block">
                    {item.emoji}
                  </p>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-hover transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base transition-all duration-300">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 fade-up">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-14 text-hover px-2">
          Community Stats 📊
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 max-w-6xl mx-auto fade-up">
          {[
            { num: "12000", label: "Accounts Sold", suffix: "+" },
            { num: "4.9", label: "Average Rating", suffix: "⭐" },
            { num: "8000", label: "Active Users", suffix: "+" },
            { num: "99", label: "Secure Trades", suffix: "%" },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center bg-slate-800/80 border border-amber-500/30 rounded-xl sm:rounded-2xl py-6 sm:py-10 lg:py-12 card-hover"
            >
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 text-hover">
                {s.num}
                {s.suffix}
              </h3>
              <p className="text-slate-300 text-xs sm:text-base lg:text-lg px-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="relative px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 fade-up overflow-hidden">
        {/* Gaming Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-14 text-hover px-2">
            How It Works ⚙
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto fade-up">
            {[
              {
                icon: "🔍",
                title: "Browse",
                desc: "Pick the perfect account or service.",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "Encrypted, safe, no stress.",
              },
              {
                icon: "⚡",
                title: "Delivered Fast",
                desc: "Your items arrive instantly.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800/80 border border-amber-500/30 rounded-xl p-6 sm:p-8 lg:p-10 text-center card-hover transition-all duration-500 backdrop-blur-sm"
              >
                <p className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 transition-transform duration-300 hover:scale-125 inline-block">
                  {item.icon}
                </p>
                <h3 className="text-xl sm:text-2xl mb-2 text-hover font-bold transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base transition-all duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 bg-slate-900 fade-up">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-6 sm:mb-10 text-hover px-2">
          What Players Say 🎮
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto fade-up">
          {[
            {
              name: "Aiden",
              comment: "Insane service! Got my T5 account instantly. 🔥",
              img: "https://randomuser.me/api/portraits/men/11.jpg",
            },
            {
              name: "Lana",
              comment: "Professional seller, smooth experience. 💎",
              img: "https://randomuser.me/api/portraits/women/21.jpg",
            },
            {
              name: "Rex",
              comment: "Best marketplace for gamers. 10/10 💯",
              img: "https://randomuser.me/api/portraits/men/31.jpg",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/70 border border-amber-500/30 rounded-xl p-5 sm:p-6 lg:p-8 shadow-lg card-hover"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 border-2 border-amber-400"
              />
              <h3 className="text-lg sm:text-xl font-bold text-center text-hover">
                {item.name}
              </h3>
              <p className="text-slate-300 text-center text-sm sm:text-base">
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* CTA with GAMING BACKGROUND */}
      <section className="relative px-3 sm:px-4 py-16 sm:py-24 lg:py-32 border-t border-blue-500/30 text-center fade-up overflow-hidden">
        {/* Gaming Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/90"></div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-hover px-2 transition-all duration-300">
            Ready to Level Up? 🚀
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-6 sm:mb-10 text-hover px-4 transition-all duration-300">
            Join the marketplace today!
          </p>

          <Link href="/accounts/open" className="inline-block">
            <Button
              size="lg"
              className="gap-2 btn-game font-bold cursor-pointer text-xs sm:text-sm transition-all duration-500"
            >
              Start Shopping <ChevronRight className="ml-2 sm:ml-3" />
            </Button>
          </Link>
        </div>
      </section>
          
    </>
  );
}
