"use client";

interface BlogCardSkeletonProps {
  count?: number;
}

export function BlogCardSkeleton({ count = 6 }: BlogCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 border-2 border-amber-500/30 overflow-hidden rounded-xl animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {/* Image Skeleton */}
          <div className="relative h-48 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
              <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-5/6" />
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-2/3" />
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
                <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-16" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
                <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-20" />
              </div>
            </div>

            {/* Button */}
            <div className="h-10 bg-gradient-to-r from-amber-600/30 via-amber-500/30 to-amber-600/30 bg-[length:200%_100%] animate-shimmer rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}