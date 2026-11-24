// src/components/ui/LoadingSkeleton.jsx

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
      <div className="skeleton h-48 w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex gap-2 mt-1">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>
        <div className="flex justify-between mt-2">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
