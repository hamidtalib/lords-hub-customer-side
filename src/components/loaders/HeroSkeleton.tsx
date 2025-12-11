"use client";

export function HeroSkeleton() {
  return (
    <section className="relative px-3 py-20 sm:px-4 sm:py-32 lg:px-8 lg:py-40 overflow-hidden animate-pulse">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 via-slate-700/50 to-slate-800/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto space-y-8">
        {/* Title skeleton */}
        <div className="space-y-4">
          <div className="h-16 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-2xl mx-auto w-96" />
          <div className="h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl mx-auto w-80" />
        </div>

        {/* Subtitle skeleton */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <div className="h-6 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
          <div className="h-6 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-4/5 mx-auto" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
          <div className="h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-full sm:w-40" />
          <div className="h-12 bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-blue-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-full sm:w-40" />
        </div>
      </div>
    </section>
  );
}