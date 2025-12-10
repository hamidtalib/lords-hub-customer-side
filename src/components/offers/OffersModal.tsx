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
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border-2 border-amber-500/30">
          <p className="text-white text-lg">Loading offers...</p>
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
