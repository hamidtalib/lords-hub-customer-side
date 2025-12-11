"use client";

interface TestimonialSkeletonProps {
  count?: number;
}

export function TestimonialSkeleton({ count = 3 }: TestimonialSkeletonProps) {
  return (
    <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 border-t border-blue-500/30 bg-slate-900 animate-pulse">
      {/* Title skeleton */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl mx-auto w-80" />
      </div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/70 border border-amber-500/30 rounded-xl p-5 sm:p-6 lg:p-8 shadow-lg space-y-4"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Avatar skeleton */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer border-2 border-amber-400/30" />
            
            {/* Name skeleton */}
            <div className="h-5 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-24" />
            
            {/* Comment skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-4/5 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}