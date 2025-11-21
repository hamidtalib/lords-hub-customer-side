import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/public/images/lords-hub-logo.png";

export default function Footer() {
  return (
    <footer className="border-t-2 border-amber-500/30 bg-gradient-to-b from-slate-800/90 to-slate-900/90">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 text-center md:text-left">
          {/* LOGO ONLY */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={logo}
              alt="Lords Hub Logo"
              width={70}
              height={70}
              className="mb-2"
            />
            <p className="mt-3 text-sm text-slate-300 leading-relaxed font-semibold">
              Your trusted marketplace for premium Lords Mobile accounts and
              services.
            </p>

            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <Link
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-200 mb-4">Products</h4>
            <ul className="space-y-3 text-sm">
              {["Accounts", "Gems", "Diamonds", "Bot Services"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 transform inline-block font-semibold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-200 mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "FAQ", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 transform inline-block font-semibold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-200 mb-4">Subscribe</h4>
            <p className="text-sm text-slate-300 mb-4 font-semibold text-center md:text-left">
              Get updates on new accounts and deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Input
                type="email"
                placeholder="Email"
                className="border-2 border-amber-500/50 focus:border-amber-400 bg-slate-700/50 text-white placeholder:text-slate-400 text-sm font-semibold transition-all duration-300 flex-1"
              />
              <Button
                size="sm"
                className="btn-secondary font-bold w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-amber-500/30 pt-8 text-center text-sm text-slate-400 font-semibold">
          <p>
            &copy; 2025 Lords Hub. All rights reserved. | Premium Gaming
            Marketplace
          </p>
        </div>
      </div>
    </footer>
  );
}
