"use client";

interface StatsSkeletonProps {
  count?: number;
}

export function StatsSkeleton({ count = 4 }: StatsSkeletonProps) {
  return (
    <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 animate-pulse">
      {/* Title skeleton */}
      <div className="text-center mb-8 sm:mb-14">
        <div className="h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl mx-auto w-80" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 max-w-6xl mx-auto">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="text-center bg-slate-800/80 border border-amber-500/30 rounded-xl sm:rounded-2xl py-6 sm:py-10 lg:py-12 space-y-4"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Number skeleton */}
            <div className="h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto w-24" />
            
            {/* Label skeleton */}
            <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}