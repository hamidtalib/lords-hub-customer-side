"use client";

import { Button } from "@/src/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import Link from "next/link";

interface AccountDetailsHeaderProps {
  name: string;
  description: string[];
  price: number;
  accountId: string;
}

export function AccountDetailsHeader({
  name,
  description,
  price,
  accountId,
}: AccountDetailsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">{name}</h1>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-amber-400">
            ${price}
          </span>
          <span className="text-slate-400 text-sm">USD</span>
        </div>
      </div>

      {/* Description as Bullet Points */}
      <div className="bg-slate-800/50 rounded-xl p-6 border-2 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Account Features</h2>
        <ul className="space-y-3">
          {description.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buy Button */}
      <Link href={`/chat?productId=${accountId}&price=${price}`} className="block">
        <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-4 text-lg">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Buy This Account
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl mb-1">🔒</div>
          <div className="text-xs text-slate-400 font-semibold">Secure Transfer</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl mb-1">✅</div>
          <div className="text-xs text-slate-400 font-semibold">Verified Account</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs text-slate-400 font-semibold">Fast Delivery</div>
        </div>
      </div>
    </div>
  );
}
