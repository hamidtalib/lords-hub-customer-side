"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Tag } from "lucide-react";
import { OfferCardSkeleton } from "@/src/components/loaders";
import { loadOffers, Offer } from "@/store/thunks/offerThunk";
import { useAppDispatch } from "@/store/store";

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  return (
    <>
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="border-b-4 border-amber-500/30 px-4 py-24 sm:px-6 lg:px-8 bg-cover bg-center fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(9,11,25,0.9), rgba(7,10,21,0.97)), url('https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <Tag className="h-12 w-12 text-amber-400" />
            <h1 className="text-5xl font-black gradient-text">
              Special Offers
            </h1>
          </div>
          <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Exclusive deals and promotions just for you
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <OfferCardSkeleton count={6} />
          ) : offers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white mb-2">
                No offers available
              </p>
              <p className="text-slate-400 mb-4">
                Check back later for exclusive deals and promotions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 overflow-hidden hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 flex flex-col"
                >
                  {/* Media Section */}
                  <div className="relative w-full h-56 bg-slate-900">
                    {offer.mediaType === "image" ? (
                      <img
                        src={offer.mediaUrl}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    ) : offer.mediaType === "video" ? (
                      <video
                        controls
                        className="w-full h-full object-contain bg-black"
                        preload="metadata"
                      >
                        <source src={offer.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-black text-white mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 flex-grow">
                      {offer.description}
                    </p>

                    {/* CTA Button */}
                    <Link href={`/chat?source=offers&productId=${offer.productId}`}>
                      <Button className="w-full btn-game text-sm">
                        View Offer
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
