"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { hideOffersModal, checkIfSeenOffers } from "@/store/slices/offerSlice";
import { loadOffers, Offer } from "@/store/thunks/offerThunk";
import { toast } from "react-toastify";

export default function OffersModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    showModal,
    offers: firestoreOffers,
    loading,
  } = useAppSelector((state) => state.offers);

  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkIfSeenOffers());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(hideOffersModal());
  };

  const handleOfferClick = (productId: string) => {
    dispatch(hideOffersModal());
    toast.success("Redirecting to chat...");
    router.push(`/chat?source=offers&productId=${productId}`);
  };

  if (!showModal) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border-2 border-amber-500/30 max-w-4xl w-full max-h-[80vh] overflow-hidden">
          <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div className="h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-64" />
            
            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-700/50 rounded-lg p-4 space-y-3"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="h-32 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                  <div className="h-5 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                  <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-3/4" />
                  <div className="h-8 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (firestoreOffers.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-amber-500/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600 transition-colors cursor-pointer"
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
          {firestoreOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-700/50 rounded-lg overflow-hidden border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              {/* Media Display */}
              {offer.mediaUrl && (
                <div className="relative w-full h-64 bg-slate-800">
                  {offer.mediaType === "video" ? (
                    <video
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                      src={offer.mediaUrl}
                    >
                      <source src={offer.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={offer.mediaUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", offer.mediaUrl);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-slate-300 mb-4">{offer.description}</p>
                <button
                  onClick={() => handleOfferClick(offer.productId || offer.id)}
                  className="w-full sm:w-auto px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Chat Us
                </button>
              </div>
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
