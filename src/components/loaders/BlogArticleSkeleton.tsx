"use client";

export function BlogArticleSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation Bar Skeleton */}
      <section className="px-4 py-6 border-b border-slate-700/50 animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-32" />
        </div>
      </section>

      {/* Hero Section Skeleton */}
      <section className="relative px-4 py-12 overflow-hidden animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Category Badge */}
              <div className="h-8 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-full w-32" />

              {/* Title */}
              <div className="space-y-3">
                <div className="h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                <div className="h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-4/5" />
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
                  <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
                  <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-24" />
                </div>
              </div>

              {/* Share Button */}
              <div className="h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl w-40" />
            </div>

            {/* Image Side */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Skeleton */}
      <section className="relative px-4 py-16 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 overflow-hidden animate-pulse">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-amber-500/30 space-y-6">
            {/* Content paragraphs */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-5/6" />
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-4/5" />
              </div>
            ))}
          </div>

          {/* Article Footer Skeleton */}
          <div className="mt-12 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-xl p-6 border border-slate-600/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-24" />
                  <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-20" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-12 bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-blue-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl w-24" />
                <div className="h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section Skeleton */}
      <section className="px-4 py-16 border-t border-slate-700/50 animate-pulse">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="h-10 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto w-64" />
          <div className="h-6 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-96" />
          <div className="h-14 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl mx-auto w-48" />
        </div>
      </section>
    </main>
  );
}