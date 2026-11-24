// src/components/ui/EmptyState.jsx
import { motion } from 'framer-motion';

export default function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {icon && (
        <div className="mb-4 text-5xl">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-slate-700 font-display mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 max-w-xs mb-6">{description}</p>
      )}
      {action && action}
    </motion.div>
  );
}
