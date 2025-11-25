"use client";

import { Gift } from "lucide-react";
import { useOffers } from "@/lib/hooks/useOffers";

export function FloatingOffersButton() {
  const { openOffersModal, offers } = useOffers();

  // Don't show if no offers available
  if (offers.length === 0) {
    return null;
  }

  return (
    <button
      onClick={openOffersModal}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 pulse-glow"
      aria-label="View special offers"
    >
      <Gift className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  );
}
