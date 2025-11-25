"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideOffersModal, checkIfSeenOffers } from "@/store/offers/offersSlice";

export default function OffersModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { offers, showModal } = useAppSelector((state) => state.offers);

  // Check if user has seen offers on mount
  useEffect(() => {
    dispatch(checkIfSeenOffers());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(hideOffersModal());
  };

  const handleOfferClick = (link: string) => {
    dispatch(hideOffersModal());
    router.push(link);
  };

  if (!showModal || offers.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-amber-500/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-amber-500/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            🎁 Special Offers Just for You!
          </h2>
          <p className="text-slate-300 mt-2">
            Don't miss out on these exclusive deals
          </p>
        </div>

        {/* Offers List */}
        <div className="p-6 space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-700/50 rounded-lg p-5 border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              {offer.imageUrl && (
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-white mb-2">
                {offer.title}
              </h3>
              <p className="text-slate-300 mb-4">{offer.description}</p>
              {offer.validUntil && (
                <p className="text-xs text-amber-400 mb-3">
                  Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                </p>
              )}
              <button
                onClick={() => handleOfferClick(offer.ctaLink)}
                className="w-full sm:w-auto px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                {offer.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-amber-500/30 text-center">
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            I'll check these out later
          </button>
        </div>
      </div>
    </div>
  );
}
