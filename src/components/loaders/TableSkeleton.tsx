"use client";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-amber-500/30 bg-slate-900/60 shadow-2xl animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-amber-500/20">
          {/* Header Skeleton */}
          <thead className="bg-gradient-to-r from-amber-500/20 to-blue-500/20">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th
                  key={i}
                  className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center"
                >
                  <div className="h-4 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-20" />
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body Skeleton */}
          <tbody className="divide-y divide-amber-500/10">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors duration-300"
                style={{ animationDelay: `${rowIndex * 100}ms` }}
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center"
                  >
                    {colIndex === 0 ? (
                      // First column - image placeholder
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto" />
                    ) : colIndex === columns - 1 ? (
                      // Last column - button placeholder
                      <div className="h-8 bg-gradient-to-r from-amber-600/30 via-amber-500/30 to-amber-600/30 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-20" />
                    ) : (
                      // Middle columns - text placeholder
                      <div className="h-4 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-16" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}