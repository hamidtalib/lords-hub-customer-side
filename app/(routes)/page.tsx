"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

const scrollStyles = `
.fade-up    { opacity: 0; transform: translateY(40px); transition: all .8s ease; }
.fade-left  { opacity: 0; transform: translateX(-40px); transition: all .8s ease; }
.fade-right { opacity: 0; transform: translateX(40px); transition: all .8s ease; }
.show       { opacity: 1 !important; transform: translate(0,0) !important; }
`;

export default function Home() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = scrollStyles;
    document.head.appendChild(styleTag);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".fade-up, .fade-left, .fade-right")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* HERO */}
      <section
        className="px-4 py-32 sm:px-6 lg:px-8 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,6,15,0.85), rgba(4,6,15,0.95)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative mx-auto max-w-6xl text-center fade-up">
          <div className="mb-8 inline-flex items-center rounded-full border-2 border-amber-500/50 bg-amber-400/10 px-6 py-3">
            <Zap className="h-6 w-6 text-amber-300 mr-3" />
            <span className="text-sm font-bold text-amber-300">
              Premium Gaming Marketplace
            </span>
          </div>

          <h1 className="mb-8 text-6xl font-black tracking-tight leading-tight sm:text-7xl">
            <span className="gradient-text block mb-3">Lords Hub</span>
            Level Up Your Game
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-slate-200 font-semibold fade-up">
            Buy & sell premium Lords Mobile accounts, gems, diamonds & bot
            services with confidence.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center fade-up">
            <Link href="/accounts">
              <Button size="lg" className="btn-game text-lg">
                Browse Accounts <ChevronRight className="ml-3" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="btn-secondary font-bold">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="px-4 py-24 border-t border-blue-500/30 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(2,6,23,0.9), rgba(2,6,23,0.95)), url('https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-5xl font-black gradient-text text-center mb-12 fade-up">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Accounts",
                desc: "Explore thousands of premium listings.",
              },
              {
                step: "2",
                title: "Chat & Verify",
                desc: "100% safe verification through chat.",
              },
              {
                step: "3",
                title: "Instant Delivery",
                desc: "Fast, secure handover.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`fade-${
                  i % 2 ? "right" : "left"
                } p-8 bg-slate-800/80 border border-amber-500/30 rounded-xl`}
              >
                <p className="text-6xl font-black text-amber-400 mb-4">
                  {item.step}
                </p>
                <h3 className="text-2xl font-bold gradient-text mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY GUARANTEE */}
      <section
        className="px-4 py-24 border-t border-blue-500/30 bg-cover bg-center section-gradient"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(2,4,10,0.9), rgba(2,4,10,0.95)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <h2 className="text-5xl font-black gradient-text text-center mb-6 fade-left">
          Your Safety is Our Priority
        </h2>

        <p className="text-slate-200 text-xl text-center max-w-3xl mx-auto fade-right">
          Verified sellers • Secure payments • Fast disputes • 24/7 support
        </p>
      </section>

      {/* CTA */}
      <section
        className="px-4 py-32 border-t border-blue-500/30 text-center bg-cover bg-center fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(2,6,23,0.9), rgba(2,6,23,0.95)), url('https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <h2 className="text-5xl font-black gradient-text mb-6">
          Ready to Level Up?
        </h2>
        <p className="text-xl text-slate-200 mb-10">
          Explore our premium marketplace.
        </p>

        <Link href="/accounts">
          <Button size="lg" className="btn-game text-xl px-8">
            Start Shopping <ChevronRight className="ml-3" />
          </Button>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
