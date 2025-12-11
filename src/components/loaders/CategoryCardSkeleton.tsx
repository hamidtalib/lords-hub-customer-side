"use client";

interface CategoryCardSkeletonProps {
  count?: number;
}

export function CategoryCardSkeleton({ count = 3 }: CategoryCardSkeletonProps) {
  return (
    <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 animate-pulse">
      {/* Title skeleton */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl mx-auto w-96" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-slate-800/70 border border-amber-500/30"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {/* Image skeleton */}
            <div className="w-full h-40 sm:h-48 lg:h-52 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer" />
            
            {/* Content skeleton */}
            <div className="p-4 sm:p-6 text-center">
              <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto w-40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}