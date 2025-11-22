"use client";

import { Users, TrendingUp, Award, Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import Link from "next/link";
import { CountUp } from "@/src/components/count-up";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function AboutPage() {
  const stats = [
    { label: "Accounts Sold", value: "5000+", icon: Users },
    { label: "Happy Customers", value: "10000+", icon: Heart },
    { label: "Years Experience", value: "5+", icon: Award },
    { label: "Success Rate", value: "99.8%", icon: TrendingUp },
  ];

  const journey = [
    {
      year: "2020",
      title: "Foundation",
      description:
        "Lords Hub was founded with a mission to provide safe and reliable gaming account services.",
    },
    {
      year: "2021",
      title: "Expansion",
      description:
        "Launched gems, diamonds, and started offering bot services to our growing community.",
    },
    {
      year: "2022",
      title: "Global Reach",
      description:
        "Expanded to serve 5,000+ customers across multiple continents with localized support.",
    },
    {
      year: "2023",
      title: "Innovation",
      description:
        "Introduced real-time chat system, payment verification, and enhanced security measures.",
    },
    {
      year: "2024",
      title: "Premium Services",
      description:
        "Launched KvK war bots, advanced calculator tools, and dedicated account management.",
    },
    {
      year: "2025",
      title: "Market Leader",
      description:
        "Became the most trusted Lords Mobile marketplace with 10,000+ satisfied customers.",
    },
  ];

  const team = [
    {
      name: "Alex Crown",
      role: "Founder & CEO",
      expertise: "10+ years gaming industry",
    },
    {
      name: "Jordan Strike",
      role: "Head of Operations",
      expertise: "8+ years account management",
    },
    {
      name: "Morgan Shield",
      role: "Lead Developer",
      expertise: "Bot development specialist",
    },
    {
      name: "Casey Valor",
      role: "Customer Support Lead",
      expertise: "24/7 multilingual support",
    },
  ];

  return (
    <>
      <ScrollAnimation />
      
      {/* Hero Section */}
      <section className="border-b-4 border-amber-500/30 px-4 py-16 sm:px-6 lg:px-8 section-gradient text-center fade-up">
        <h1 className="mb-3 text-5xl font-black gradient-text">
          About Lords Hub
        </h1>
        <p className="text-xl text-slate-200 max-w-2xl mx-auto font-semibold">
          Your trusted marketplace for premium gaming since 2020
        </p>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="border border-amber-500/20 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-amber-500/30 transition-all p-6 card-hover"
              >
                <CardContent className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-600/20 group-hover:bg-amber-500/30 transition-all">
                    <Icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-sm text-slate-300 font-bold">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-black gradient-text mt-2 drop-shadow">
                    <CountUp end={stat.value} />
                  </p>
                </CardContent>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey Section */}
      <section className="border-t-4 border-amber-500/30 px-4 py-16 sm:px-6 lg:px-8 section-gradient fade-up">
        <div className="mx-auto max-w-6xl space-y-6">
          <h2 className="mb-12 text-4xl font-black text-center gradient-text">
            Our Journey
          </h2>
          {journey.map((event, idx) => (
            <div
              key={idx}
              className="flex gap-6 flex-col md:flex-row fade-up"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-slate-900 font-black text-lg shadow-lg">
                  {event.year.slice(2)}
                </div>
                {idx < journey.length - 1 && (
                  <div className="h-12 w-0.5 bg-gradient-to-b from-amber-500/50 to-transparent" />
                )}
              </div>
              <Card className="flex-1 border-2 border-amber-500/30 card-lift hover:border-amber-400 group bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-amber-400 transition-colors duration-300 text-slate-200">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-base font-bold text-slate-300">
                    {event.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t-4 border-amber-500/30 px-4 py-16 sm:px-6 lg:px-8 section-gradient fade-up">
        <h2 className="mb-6 text-4xl font-black text-center gradient-text">
          Our Team
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="fade-up">
              <Card className="card-lift border-2 border-amber-500/30 hover:border-amber-400 text-center group bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    👤
                  </div>
                  <CardTitle className="text-lg group-hover:text-amber-400 transition-colors duration-300 text-slate-200">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="mt-1 font-bold text-base text-slate-300">
                    {member.role}
                  </CardDescription>
                  <p className="mt-2 text-sm text-slate-400 font-semibold">
                    {member.expertise}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 section-gradient text-center fade-up">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-4xl font-black gradient-text">
            Ready to Join Our Community?
          </h2>
          <p className="mb-10 text-slate-200 text-lg leading-relaxed">
            Start browsing premium accounts or list your own today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/accounts">
              <Button size="lg" className="btn-game font-semibold text-lg">
                Browse Accounts
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/20 text-white transition-all duration-300 font-semibold cursor-pointer"
              >
                Chat US
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
