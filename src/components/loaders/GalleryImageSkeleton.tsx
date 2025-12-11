"use client";

interface GalleryImageSkeletonProps {
  count?: number;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export function GalleryImageSkeleton({ 
  count = 6, 
  aspectRatio = "square" 
}: GalleryImageSkeletonProps) {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case "landscape":
        return "aspect-video";
      case "portrait":
        return "aspect-[3/4]";
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${getAspectClass()} bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg border border-amber-500/20 overflow-hidden relative`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent" />
          
          {/* Play button placeholder for videos */}
          {i % 4 === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}