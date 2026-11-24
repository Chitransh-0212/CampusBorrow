// src/components/ui/Badge.jsx

const VARIANTS = {
  default: 'bg-slate-100 text-slate-600',
  indigo: 'bg-indigo-100 text-indigo-700',
  violet: 'bg-violet-100 text-violet-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
  sky: 'bg-sky-100 text-sky-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-rose-100 text-rose-700',
  info: 'bg-indigo-100 text-indigo-700',
};

export default function Badge({ children, variant = 'default', className = '', dot = false }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
        ${VARIANTS[variant]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'emerald' || variant === 'success' ? 'bg-emerald-500' :
            variant === 'amber' || variant === 'warning' ? 'bg-amber-500' :
            variant === 'rose' || variant === 'error' ? 'bg-rose-500' :
            'bg-current'
          }`}
        />
      )}
      {children}
    </span>
  );
}

// Availability Badge — special component
export function AvailabilityBadge({ item, size = 'sm' }) {
  const { availabilityStatus, availableFrom } = item;

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const isNextDay = (dateStr) => {
    if (!dateStr) return false;
    const tomorrow = new Date('2026-09-14'); // day after today (Sept 13)
    const d = new Date(dateStr);
    return d.toDateString() === tomorrow.toDateString();
  };

  const sizeClass = size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-0.5';

  if (availabilityStatus === 'available') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClass} rounded-full bg-emerald-100 text-emerald-700 font-medium`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
        Available now
      </span>
    );
  }

  if (availabilityStatus === 'borrowed') {
    const label = availableFrom
      ? isNextDay(availableFrom)
        ? 'Available tomorrow'
        : `Available ${formatDate(availableFrom)}`
      : 'Currently borrowed';
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClass} rounded-full bg-rose-100 text-rose-700 font-medium`}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        {label}
      </span>
    );
  }

  if (availabilityStatus === 'reserved') {
    const label = availableFrom ? `Available ${formatDate(availableFrom)}` : 'Reserved';
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClass} rounded-full bg-amber-100 text-amber-700 font-medium`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {label}
      </span>
    );
  }

  return null;
}

export function ConditionBadge({ condition }) {
  const map = {
    'Like New': { variant: 'emerald', label: 'Like New' },
    'Good': { variant: 'sky', label: 'Good' },
    'Fair': { variant: 'amber', label: 'Fair' },
  };
  const { variant = 'default', label = condition } = map[condition] || {};
  return <Badge variant={variant}>{label}</Badge>;
}

export function VerifiedBadge({ size = 'sm' }) {
  return (
    <span className="inline-flex items-center gap-1 text-indigo-600 font-medium text-xs">
      <svg className="w-3.5 h-3.5 fill-indigo-600" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
      Verified Student
    </span>
  );
}
