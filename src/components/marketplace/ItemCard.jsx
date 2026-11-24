// src/components/marketplace/ItemCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ShoppingBag, ArrowRightLeft } from 'lucide-react';
import { AvailabilityBadge, ConditionBadge, VerifiedBadge } from '../ui/Badge';
import { MOCK_USERS } from '../../data/mockUsers';

export default function ItemCard({ item, index = 0 }) {
  const owner = MOCK_USERS.find((u) => u.id === item.ownerId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group"
    >
      <Link to={`/item/${item.id}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay badges */}
            <div className="absolute top-3 left-3">
              <AvailabilityBadge item={item} />
            </div>
            <div className="absolute top-3 right-3 flex gap-1.5">
              {item.rentEnabled && (
                <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ArrowRightLeft size={9} />
                  RENT
                </span>
              )}
              {item.buyEnabled && (
                <span className="bg-white/90 backdrop-blur-sm text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShoppingBag size={9} />
                  BUY
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title + condition */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 font-display flex-1">
                {item.title}
              </h3>
              <ConditionBadge condition={item.condition} />
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
              <MapPin size={11} />
              <span>{item.city}{item.area ? ` · ${item.area}` : ''}</span>
            </div>

            {/* Pricing */}
            <div className="flex items-end justify-between">
              <div>
                {item.rentEnabled && (
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-bold text-slate-900 font-mono">₹{item.rentPerDay}</span>
                    <span className="text-xs text-slate-400">/day</span>
                  </div>
                )}
                {item.buyEnabled && (
                  <div className="text-xs text-slate-400">
                    Buy ₹{item.buyPrice?.toLocaleString('en-IN')}
                  </div>
                )}
              </div>
              {/* Rating + owner */}
              <div className="flex flex-col items-end gap-1">
                <span className="flex items-center gap-1 text-xs">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700">{item.rating}</span>
                  <span className="text-slate-400">({item.reviewCount})</span>
                </span>
                {owner?.verified && <VerifiedBadge />}
              </div>
            </div>

            {/* Deposit indicator */}
            {item.securityDeposit > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-400">
                + ₹{item.securityDeposit} refundable deposit
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
