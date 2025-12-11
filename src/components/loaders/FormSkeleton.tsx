"use client";

interface FormSkeletonProps {
  fields?: number;
  hasTextarea?: boolean;
  hasSubmitButton?: boolean;
}

export function FormSkeleton({ 
  fields = 4, 
  hasTextarea = true, 
  hasSubmitButton = true 
}: FormSkeletonProps) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Form fields */}
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2" style={{ animationDelay: `${i * 100}ms` }}>
          {/* Label skeleton */}
          <div className="h-4 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-24" />
          
          {/* Input skeleton */}
          <div className="h-12 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg border border-amber-500/20" />
        </div>
      ))}

      {/* Textarea skeleton */}
      {hasTextarea && (
        <div className="space-y-2" style={{ animationDelay: `${fields * 100}ms` }}>
          <div className="h-4 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-32" />
          <div className="h-32 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg border border-amber-500/20" />
        </div>
      )}

      {/* Submit button skeleton */}
      {hasSubmitButton && (
        <div className="pt-4" style={{ animationDelay: `${(fields + 1) * 100}ms` }}>
          <div className="h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg w-full sm:w-40" />
        </div>
      )}
    </div>
  );
}