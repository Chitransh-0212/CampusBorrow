// src/components/ui/RatingStars.jsx
import { Star } from 'lucide-react';

export default function RatingStars({ rating, count, size = 'sm', showCount = true }) {
  const starSize = size === 'lg' ? 16 : 13;

  return (
    <span className="inline-flex items-center gap-1">
      <Star
        size={starSize}
        className="fill-amber-400 text-amber-400"
      />
      <span className={`font-semibold text-slate-700 ${size === 'lg' ? 'text-base' : 'text-xs'}`}>
        {typeof rating === 'number' ? rating.toFixed(1) : rating}
      </span>
      {showCount && count !== undefined && (
        <span className={`text-slate-400 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          ({count})
        </span>
      )}
    </span>
  );
}

export function TrustScore({ user, compact = false }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
        <Star size={12} className="fill-amber-400 text-amber-400" />
        <span className="font-medium text-slate-700">{user.rating?.toFixed(1) || '—'}</span>
        <span>·</span>
        <span>{user.successfulRentals || 0} rentals</span>
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={16}
              className={
                s <= Math.floor(user.rating || 0)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-200 fill-slate-200'
              }
            />
          ))}
        </div>
        <span className="font-bold text-lg text-slate-900">{user.rating?.toFixed(1) || '—'}</span>
      </div>
      <div className="flex gap-4 text-sm text-slate-500">
        <span><span className="font-semibold text-slate-700">{user.successfulRentals || 0}</span> rentals</span>
        <span><span className="font-semibold text-slate-700">{user.onTimeReturns || 0}%</span> on-time</span>
      </div>
    </div>
  );
}
