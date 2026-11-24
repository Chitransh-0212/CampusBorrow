// src/components/ui/Button.jsx
import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 active:scale-[0.98]',
  secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm active:scale-[0.98]',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 active:scale-[0.98]',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm active:scale-[0.98]',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm active:scale-[0.98]',
  outline: 'bg-transparent border border-indigo-300 hover:bg-indigo-50 text-indigo-600 active:scale-[0.98]',
  dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:scale-[0.98]',
};

const SIZES = {
  xs: 'px-2.5 py-1 text-xs rounded-lg',
  sm: 'px-3.5 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl font-semibold',
  xl: 'px-8 py-4 text-lg rounded-2xl font-semibold',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  as: Tag = 'button',
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      as={Tag}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
