"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryImageSkeleton } from "@/src/components/loaders";

interface AccountDetailsGalleryProps {
  mainImage: string;
  galleryImages: string[];
  accountName: string;
  loading?: boolean;
}

export function AccountDetailsGallery({
  mainImage,
  galleryImages,
  accountName,
  loading = false,
}: AccountDetailsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image Skeleton */}
        <div className="relative w-full aspect-square bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-xl border-2 border-amber-500/30" />
        
        {/* Thumbnail Gallery Skeleton */}
        <GalleryImageSkeleton count={4} aspectRatio="square" />
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-slate-900/50 rounded-xl overflow-hidden border-2 border-amber-500/30">
        <Image
          src={selectedImage}
          alt={accountName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === image
                ? "border-amber-500 scale-105"
                : "border-slate-600 hover:border-amber-400"
            }`}
          >
            <Image
              src={image}
              alt={`${accountName} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
