"use client";

import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import Link from "next/link";

interface AccountDetailsHeaderProps {
  name: string;
  description: string | string[];
  price: number;
  accountId: string;
}

export function AccountDetailsHeader({
  name,
  description,
  price,
  accountId,
}: AccountDetailsHeaderProps) {
  // Convert description to array if it's a string
  const descriptionArray = Array.isArray(description)
    ? description
    : description.split("\n").filter((line) => line.trim());

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
          {name}
        </h1>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-amber-400">
            ${price}
          </span>
          <span className="text-slate-400 text-xs sm:text-sm">USD</span>
        </div>
      </div>

      {/* Description as Bullet Points */}
      <div className="bg-slate-800/50 rounded-xl p-4 sm:p-6 border-2 border-slate-700">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
          Account Features
        </h2>
        <ul className="space-y-2 sm:space-y-3">
          {descriptionArray.map((item, index) => (
            <li key={index} className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buy Button */}
      <Link
        href={`/chat?productId=${accountId}&price=${price}`}
        className="block"
      >
        <Button className="w-full bg-gradient-to-r cursor-pointer from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-3 sm:py-4 text-base sm:text-lg">
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Buy This Account
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700">
          <div className="text-xl sm:text-2xl mb-1">🔒</div>
          <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">
            Secure Transfer
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700">
          <div className="text-xl sm:text-2xl mb-1">✅</div>
          <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">
            Verified Account
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700">
          <div className="text-xl sm:text-2xl mb-1">⚡</div>
          <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">
            Fast Delivery
          </div>
        </div>
      </div>
    </div>
  );
}
