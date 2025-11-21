"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/public/images/lords-hub-logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Accounts", href: "/accounts" },
    { label: "Gems", href: "/gems" },
    { label: "Diamonds", href: "/diamonds" },
    { label: "Bot Services", href: "/bots" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-amber-500/30 bg-gradient-to-r from-slate-800/95 via-slate-800/95 to-slate-800/95 backdrop-blur-xl shadow-2xl">
      <nav className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group hover:opacity-80 transition-all duration-300"
          >
            <div className="relative h-20 w-20">
              <Image
                src={logo}
                alt="Lords Hub"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-black gradient-text hidden sm:inline">
              LORDS HUB
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="text-slate-200 font-bold hover:text-amber-400 hover:bg-amber-500/20 transition-all duration-300 rounded-lg"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/chat">
              <Button
                size="sm"
                className="hidden sm:flex gap-2 btn-game font-bold"
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-amber-400 font-bold" />
              ) : (
                <Menu className="h-6 w-6 text-slate-200" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 space-y-2 md:hidden animate-in fade-in duration-300">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-200 font-bold hover:text-amber-400 hover:bg-amber-500/20 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/chat" className="w-full">
              <Button className="w-full gap-2 btn-game font-bold">
                <MessageCircle className="h-4 w-4" />
                Chat with Us
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
