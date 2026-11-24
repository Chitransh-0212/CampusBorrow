// src/components/ui/Input.jsx

export default function Input({
  label,
  error,
  hint,
  icon,
  iconRight,
  className = '',
  wrapperClass = '',
  textarea = false,
  rows = 3,
  ...props
}) {
  const base = `
    w-full px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400
    bg-white border rounded-xl transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
    disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
    ${error ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-400' : 'border-slate-200'}
    ${icon ? 'pl-10' : ''}
    ${iconRight ? 'pr-10' : ''}
    ${className}
  `;

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClass}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        {textarea ? (
          <textarea rows={rows} className={base} {...props} />
        ) : (
          <input className={base} {...props} />
        )}
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function Select({ label, error, hint, className = '', wrapperClass = '', children, ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClass}`}>
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={`
          w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
          transition-all duration-200 cursor-pointer
          ${error ? 'border-rose-400' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-rose-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
