"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

// GLOBAL ANIMATIONS + EXTENSIONS
const scrollStyles = `
/* Scroll Animations */
.fade-up    { opacity: 0; transform: translateY(50px); transition: all 1s cubic-bezier(.17,.67,.38,1.2); }
.fade-left  { opacity: 0; transform: translateX(-50px); transition: all 1s cubic-bezier(.17,.67,.38,1.2); }
.fade-right { opacity: 0; transform: translateX(50px); transition: all 1s cubic-bezier(.17,.67,.38,1.2); }
.show       { opacity: 1 !important; transform: translate(0,0) !important; }

/* Floating Emojis */
.floating-emoji {
  position: absolute;
  animation: float 6s ease-in-out infinite;
  opacity: 0.5;
}
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* Glow Pulse */
.glow-pulse {
  animation: glow 3s ease-in-out infinite;
}
@keyframes glow {
  0% { filter: drop-shadow(0 0 0px #fbbf24); }
  50% { filter: drop-shadow(0 0 20px #fbbf24); }
 100% { filter: drop-shadow(0 0 0px #fbbf24); }
}

/* Wiggle */
.float-wiggle {
  animation: wiggle 5s ease-in-out infinite;
}
@keyframes wiggle {
  0% { transform: translateX(0); }
  50% { transform: translateX(25px); }
  100% { transform: translateX(0); }
}

/* Page Glow */
.page-glow {
  animation: pageglow 12s ease-in-out infinite;
}
@keyframes pageglow {
  0% { box-shadow: inset 0 0 0 rgba(255,255,255,0); }
  50% { box-shadow: inset 0 0 80px rgba(255,200,0,0.15); }
 100% { box-shadow: inset 0 0 0 rgba(255,255,255,0); }
}

/* Gradient Shift */
.gradient-shift {
  background: linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,215,0,0.05));
  background-size: 400% 400%;
  animation: gradientshift 12s ease infinite;
}
@keyframes gradientshift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
 100% { background-position: 0% 50%; }
}

/* Button Sweep */
.btn-sweep {
  position: relative;
  overflow: hidden;
}
.btn-sweep::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: sweep 2s infinite;
}
@keyframes sweep {
  0% { left: -100%; }
 100% { left: 200%; }
}
`;

export default function Home() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = scrollStyles;
    document.head.appendChild(styleTag);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        }),
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".fade-up, .fade-left, .fade-right")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden page-glow">
      {/* FLOATING EMOJIS */}
      <span className="floating-emoji text-6xl left-10 top-32">⚔️</span>
      <span className="floating-emoji text-5xl right-10 top-56">💎</span>
      <span className="floating-emoji text-7xl left-1/2 top-96">🔥</span>

      <Header />

      {/* HERO */}
      <section
        className="px-4 py-40 sm:px-6 lg:px-8 bg-cover bg-center relative fade-up gradient-shift"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,6,15,0.8), rgba(4,6,15,0.9)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border-2 border-amber-500/50 bg-amber-400/10 px-6 py-3 fade-up glow-pulse">
            <Zap className="h-6 w-6 text-amber-300 mr-3" />
            <span className="text-sm font-bold text-amber-300">
              Premium Gaming Marketplace ⚡
            </span>
          </div>

          <h1 className="mb-8 text-6xl font-black tracking-tight leading-tight sm:text-7xl fade-left">
            <span className="gradient-text block mb-3">🎮 Lords Hub</span>
            Level Up Your Game 🚀
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-slate-200 font-semibold fade-right">
            Buy & sell premium Lords Mobile accounts, gems, diamonds & bot
            services with confidence. 💎
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center fade-up">
            <Link href="/accounts">
              <Button size="lg" className="btn-game text-lg btn-sweep">
                Browse Accounts <ChevronRight className="ml-3" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="btn-secondary font-bold btn-sweep">
                Learn More 🌟
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="px-4 py-24 border-t border-blue-500/30 fade-up">
        <h2 className="text-5xl font-black gradient-text text-center mb-10 glow-pulse">
          Popular Categories 🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "🔥 High-End Accounts",
              img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
            },
            {
              title: "💎 Gems & Boosts",
              img: "https://images.unsplash.com/photo-1604079628040-94301bb21b46?w=800",
            },
            {
              title: "🤖 Bot Services",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group fade-up overflow-hidden rounded-xl border border-amber-500/30 bg-slate-800/70 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-700"
            >
              <img
                src={item.img}
                className="w-full h-52 object-cover group-hover:scale-110 transition-all duration-700"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold gradient-text">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 py-24 border-t border-blue-500/30 bg-slate-950 fade-right">
        <h2 className="text-5xl font-black gradient-text text-center mb-12 glow-pulse">
          Why Gamers Love Us 💛
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
              className="fade-up bg-slate-800/80 border border-amber-500/30 rounded-2xl hover:scale-105 transition-all duration-700 float-wiggle"
            >
              <CardContent className="p-8 text-center">
                <p className="text-6xl mb-4">{item.emoji}</p>
                <h3 className="text-2xl font-bold gradient-text mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* NEW SECTION: STATS */}
      <section className="px-4 py-24 border-t border-blue-500/30 fade-up gradient-shift">
        <h2 className="text-5xl font-black gradient-text text-center mb-14 glow-pulse">
          Community Stats 📊
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            { num: "12K+", label: "Accounts Sold" },
            { num: "4.9⭐", label: "Average Rating" },
            { num: "8K+", label: "Active Users" },
            { num: "99%", label: "Secure Trades" },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center bg-slate-800/80 border border-amber-500/30 rounded-2xl py-12 hover:scale-105 transition-all duration-700 float-wiggle"
            >
              <h3 className="text-5xl font-black gradient-text mb-2">
                {s.num}
              </h3>
              <p className="text-slate-300 text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION: HOW IT WORKS */}
      <section className="px-4 py-24 border-t border-blue-500/30 bg-slate-950 fade-left">
        <h2 className="text-5xl font-black gradient-text text-center mb-14 glow-pulse">
          How It Works ⚙️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
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
              className="bg-slate-800/80 border border-amber-500/30 rounded-xl p-10 text-center hover:scale-105 transition-all duration-700 float-wiggle"
            >
              <p className="text-6xl font-black text-amber-300 mb-4">
                {item.step}
              </p>
              <h3 className="text-2xl mb-2 gradient-text">{item.title}</h3>
              <p className="text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-24 border-t border-blue-500/30 bg-slate-900 fade-left">
        <h2 className="text-5xl font-black gradient-text text-center mb-10 glow-pulse">
          What Players Say 🎮
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              className="fade-up bg-slate-800/70 border border-amber-500/30 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              <img
                src={item.img}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-amber-400"
              />
              <h3 className="text-xl font-bold text-center">{item.name}</h3>
              <p className="text-slate-300 text-center">{item.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 py-32 border-t border-blue-500/30 text-center bg-cover bg-center fade-up gradient-shift"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(2,6,23,0.9), rgba(2,6,23,0.95)), url('https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <h2 className="text-5xl font-black gradient-text mb-6 glow-pulse">
          Ready to Level Up? 🚀
        </h2>
        <p className="text-xl text-slate-200 mb-10">
          Join the marketplace today!
        </p>

        <Link href="/accounts">
          <Button size="lg" className="btn-game text-xl px-8 btn-sweep">
            Start Shopping <ChevronRight className="ml-3" />
          </Button>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
