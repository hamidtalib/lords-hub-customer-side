"use client";

import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function HomePage() {
  return (
    <>
      <ScrollAnimation />

      {/* HERO with FIXED BACKGROUND */}
      <section
        className="px-3 py-20 sm:px-4 sm:py-32 lg:px-8 lg:py-40 bg-cover bg-center fade-up"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage:
            "linear-gradient(180deg, rgba(4,6,15,0.85), rgba(4,6,15,0.9)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8 inline-flex items-center rounded-full border-2 border-amber-500/50 bg-amber-400/10 px-3 py-2 sm:px-6 sm:py-3 fade-up">
            <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-amber-300 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm font-bold text-amber-300 text-hover">
              Premium Gaming Marketplace ⚡
            </span>
          </div>

          <h1 className="mb-6 sm:mb-8 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight fade-up text-hover px-2">
            <span className="block mb-2 sm:mb-3">🎮 Lords Hub</span>
            Level Up Your Game 🚀
          </h1>

          <p className="mx-auto mb-8 sm:mb-10 max-w-3xl text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold fade-up text-hover px-4">
            Buy & sell premium Lords Mobile accounts, gems, diamonds & bot
            services with confidence. 💎
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center fade-up px-4">
            <Link href="/accounts" className="w-full sm:w-auto">
              <Button size="lg" className="text-base sm:text-lg btn-sweep w-full sm:w-auto">
                Browse Accounts <ChevronRight className="ml-2 sm:ml-3" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button size="lg" className="font-bold btn-sweep w-full sm:w-auto text-base sm:text-lg">
                Learn More 🌟
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
              img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
            },
            {
              title: "💎 Gems & Boosts",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
            },
            {
              title: "🤖 Bot Services",
              img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-slate-800/70 border border-amber-500/30 card-hover"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 sm:h-48 lg:h-52 object-cover"
              />
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-hover">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 bg-slate-950 fade-up">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-12 text-hover px-2">
          Why Gamers Love Us 💛
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto fade-up">
          {[
            { emoji: "⚡", title: "Fast Delivery", desc: "Instant orders!" },
            {
              emoji: "🛡️",
              title: "Secure Payments",
              desc: "You're protected.",
            },
            { emoji: "💬", title: "24/7 Support", desc: "Real humans." },
            { emoji: "🌟", title: "Top Rated", desc: "Trusted by thousands." },
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-slate-800/80 border border-amber-500/30 rounded-2xl card-hover"
            >
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <p className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{item.emoji}</p>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-hover">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
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
              <p className="text-slate-300 text-xs sm:text-base lg:text-lg px-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 bg-slate-950 fade-up">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-14 text-hover px-2">
          How It Works ⚙️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto fade-up">
          {[
            {
              step: "1",
              title: "Browse",
              desc: "Pick the perfect account or service.",
            },
            {
              step: "2",
              title: "Secure Payment",
              desc: "Encrypted, safe, no stress.",
            },
            {
              step: "3",
              title: "Delivered Fast",
              desc: "Your items arrive instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/80 border border-amber-500/30 rounded-xl p-6 sm:p-8 lg:p-10 text-center card-hover"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-300 mb-3 sm:mb-4">
                {item.step}
              </p>
              <h3 className="text-xl sm:text-2xl mb-2 text-hover">{item.title}</h3>
              <p className="text-slate-300 text-sm sm:text-base">{item.desc}</p>
            </div>
          ))}
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
              <p className="text-slate-300 text-center text-sm sm:text-base">{item.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA with FIXED BACKGROUND */}
      <section
        className="px-3 sm:px-4 py-16 sm:py-24 lg:py-32 border-t border-blue-500/30 text-center bg-cover bg-center fade-up"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage:
            "linear-gradient(180deg, rgba(2,6,23,0.9), rgba(2,6,23,0.95)), url('https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-hover px-2">
          Ready to Level Up? 🚀
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-6 sm:mb-10 text-hover px-4">
          Join the marketplace today!
        </p>

        <Link href="/accounts" className="inline-block">
          <Button size="lg" className="text-base sm:text-lg lg:text-xl px-6 sm:px-8 btn-sweep">
            Start Shopping <ChevronRight className="ml-2 sm:ml-3" />
          </Button>
        </Link>
      </section>
    </>
  );
}
