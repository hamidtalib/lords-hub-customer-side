"use client";

export function AccountDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Breadcrumb Skeleton */}
      <section className="px-3 sm:px-4 py-4 sm:py-6 lg:px-8 animate-pulse">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-48" />
        </div>
      </section>

      {/* Account Details Skeleton */}
      <section className="px-3 sm:px-4 py-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Image Gallery Skeleton */}
            <div className="space-y-3 sm:space-y-4 animate-pulse">
              {/* Main Image Skeleton */}
              <div className="relative w-full aspect-square bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-xl border-2 border-amber-500/30" />
              
              {/* Thumbnail Gallery Skeleton */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative aspect-square bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg border-2 border-slate-600"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Account Details Skeleton */}
            <div className="space-y-6 animate-pulse">
              {/* Title */}
              <div className="h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
              
              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-4/5" />
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-3/5" />
              </div>

              {/* Price */}
              <div className="h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-xl" />

              {/* Buttons */}
              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
                <div className="flex-1 h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
              </div>

              {/* Additional Info */}
              <div className="space-y-4 pt-6 border-t border-slate-700">
                <div className="h-5 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-32" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Skeleton */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 animate-pulse">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-800/90 rounded-xl p-5 sm:p-6 lg:p-8 border-2 border-blue-500/30 space-y-4">
            <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-48" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}