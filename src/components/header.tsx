"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  MessageCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/src/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loadSocialMediaLinks } from "@/store/thunks/socialMediaThunk";
import {
  getSocialMediaUrl,
  SOCIAL_PLATFORMS,
} from "@/store/lib/utils/socialMediaUtils";
import logo from "@/public/images/lords-hub-logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountsDropdown, setAccountsDropdown] = useState(false);
  const [botsDropdown, setBotsDropdown] = useState(false);
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const { links } = useAppSelector((state) => state.socialMedia);

  useEffect(() => {
    dispatch(loadSocialMediaLinks());
  }, [dispatch]);

  const telegramUrl = getSocialMediaUrl(links, SOCIAL_PLATFORMS.TELEGRAM);

  const handleTelegramClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!telegramUrl) {
      e.preventDefault();
      toast.error("Telegram link not added by admin yet");
    }
  };

  const navLinks = [
    {
      label: "Accounts",
      dropdown: [
        { label: "Restricted Kingdom Accounts", href: "/accounts/restricted" },
        { label: "Open Kingdom Accounts", href: "/accounts/open" },
        { label: "Selling Accounts", href: "/accounts/selling" },
      ],
    },
    { label: "Gems", href: "/gems" },
    { label: "Diamonds", href: "/diamonds" },
    {
      label: "Bot Services",
      dropdown: [
        { label: "War Bots", href: "/bots/war" },
        { label: "Rein Bots", href: "/bots/rein" },
        { label: "KVK Bots", href: "/bots/kvk" },
        { label: "Farm/Bank Bots", href: "/bots/farm" },
      ],
    },
    { label: "Reviews", href: "/reviews" },
  ];

  const isActive = (href?: string, dropdown?: any[]) => {
    if (href === "/") return pathname === "/";
    if (dropdown) return dropdown.some((item) => pathname === item.href);
    if (href) return pathname === href;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-amber-500/30 bg-gradient-to-r from-slate-800/95 via-slate-800/95 to-slate-800/95 backdrop-blur-xl shadow-2xl">
      <nav className="mx-auto max-w-7xl px-2 py-2 sm:px-4 lg:px-8">
        {/* NEW FIXED 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-3 items-center relative">
          {/* LEFT — LOGO */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group hover:opacity-80 transition-all duration-300"
            >
              <div className="relative h-14 w-14 sm:h-20 sm:w-20">
                <Image
                  src={logo}
                  alt="Lords Hub"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm sm:text-base lg:text-xl font-black gradient-text inline">
                LORDS HUB
              </span>
            </Link>
          </div>

          {/* CENTER — NAV LINKS */}
          <div className="hidden lg:flex items-center justify-center gap-1 lg:gap-2">
            {navLinks.map((link, index) => (
              <div key={link.label + index} className="relative group">
                {link.dropdown ? (
                  <>
                    <Button
                      variant="ghost"
                      className={`text-slate-200 font-bold hover:text-amber-400 hover:bg-amber-500/20 transition-all duration-300 rounded-lg cursor-pointer flex items-center gap-1 text-xs lg:text-sm px-2 lg:px-3 whitespace-nowrap ${
                        isActive(undefined, link.dropdown)
                          ? "text-amber-400 bg-amber-500/20 border-b-2 border-amber-400"
                          : ""
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
                    </Button>

                    {/* Dropdown */}
                    <div className="absolute left-0 top-full mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-slate-800/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-lg shadow-2xl py-2">
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href}>
                            <button
                              className={`w-full text-left px-4 py-2 text-sm font-bold transition-all duration-200 ${
                                pathname === item.href
                                  ? "text-amber-400 bg-amber-500/20"
                                  : "text-slate-200 hover:text-amber-400 hover:bg-amber-500/10"
                              }`}
                            >
                              {item.label}
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      className={`text-slate-200 font-bold hover:text-amber-400 hover:bg-amber-500/20 transition-all duration-300 rounded-lg cursor-pointer text-xs lg:text-sm px-2 lg:px-3 whitespace-nowrap ${
                        isActive(link.href)
                          ? "text-amber-400 bg-amber-500/20 border-b-2 border-amber-400"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — TELEGRAM + CHAT */}
          <div className="hidden lg:flex justify-end items-center gap-2">
            <a
              href={telegramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTelegramClick}
            >
              <Button
                size="sm"
                className="gap-2 btn-secondary font-bold cursor-pointer text-xs sm:text-sm"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Telegram</span>
              </Button>
            </a>

            <Link href="/chat?source=navbar">
              <Button
                size="sm"
                className="gap-2 btn-game font-bold cursor-pointer text-xs sm:text-sm"
              >
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden lg:inline">Chat</span>
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE (absolute to avoid layout shift) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute right-2 p-1.5 sm:p-2 rounded-lg hover:bg-amber-100 transition-all duration-300 cursor-pointer"
          >
            {isOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 font-bold" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-slate-200" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="mt-4 space-y-3 lg:hidden animate-in fade-in duration-300">
            {navLinks.map((link, index) => (
              <div key={link.label + index}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => {
                        if (link.label === "Accounts")
                          setAccountsDropdown(!accountsDropdown);
                        if (link.label === "Bot Services")
                          setBotsDropdown(!botsDropdown);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-slate-200 font-bold hover:text-amber-400 hover:bg-amber-500/20 transition-all duration-300 rounded-lg cursor-pointer ${
                        isActive(undefined, link.dropdown)
                          ? "text-amber-400 bg-amber-500/20"
                          : ""
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          (link.label === "Accounts" && accountsDropdown) ||
                          (link.label === "Bot Services" && botsDropdown)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {((link.label === "Accounts" && accountsDropdown) ||
                      (link.label === "Bot Services" && botsDropdown)) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href}>
                            <button
                              className={`w-full text-left px-4 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                                pathname === item.href
                                  ? "text-amber-400 bg-amber-500/20"
                                  : "text-slate-300 hover:text-amber-400 hover:bg-amber-500/10"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-slate-200 font-bold hover:text-amber-400 hover:bg-amber-500/20 transition-all duration-300 cursor-pointer ${
                        isActive(link.href)
                          ? "text-amber-400 bg-amber-500/20"
                          : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}

            {/* MOBILE BUTTONS */}
            <a
              href={telegramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTelegramClick}
              className="w-full block"
            >
              <Button
                size="sm"
                className="w-full gap-2 btn-secondary font-bold cursor-pointer justify-start"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Telegram</span>
              </Button>
            </a>

            <Link href="/chat?source=navbar" className="w-full">
              <Button
                size="sm"
                className="w-full gap-2 btn-game font-bold cursor-pointer justify-start"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Us</span>
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
