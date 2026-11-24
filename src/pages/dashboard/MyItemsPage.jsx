// src/pages/dashboard/MyItemsPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Pause, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_ITEMS } from '../../data/mockItems';
import { AvailabilityBadge, ConditionBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

export default function MyItemsPage() {
  const { user } = useAuth();
  const { bookings } = useApp();
  const toast = useToast();

  const myItems = MOCK_ITEMS.filter((i) => i.ownerId === user?.id);

  const getActiveBooking = (itemId) =>
    bookings.find((b) => b.itemId === itemId && ['active', 'accepted'].includes(b.status));

  const getPendingRequests = (itemId) =>
    bookings.filter((b) => b.itemId === itemId && b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">My Items</h1>
            <p className="text-sm text-slate-500 mt-1">{myItems.length} items listed</p>
          </div>
          <Link to="/list-item">
            <Button variant="primary" icon={<Plus size={16} />}>
              List New Item
            </Button>
          </Link>
        </div>

        {myItems.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No items listed yet"
            description="Start earning by listing items you rarely use."
            action={<Link to="/list-item"><Button variant="primary" icon={<Plus size={15} />}>List Your First Item</Button></Link>}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {myItems.map((item, i) => {
              const activeBooking = getActiveBooking(item.id);
              const pendingCount = getPendingRequests(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden"
                >
                  <div className="flex gap-4 p-5">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-semibold text-slate-900 font-display truncate">{item.title}</h3>
                        <ConditionBadge condition={item.condition} />
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <AvailabilityBadge item={item} />
                        {pendingCount > 0 && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                            {pendingCount} pending request{pendingCount > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        {item.rentEnabled && <span>₹{item.rentPerDay}/day</span>}
                        {item.buyEnabled && <span>Buy ₹{item.buyPrice?.toLocaleString('en-IN')}</span>}
                        <span>·</span>
                        <span>{item.successfulRentals} rentals</span>
                      </div>

                      {activeBooking && (
                        <div className="mt-2 bg-blue-50 rounded-lg px-3 py-1.5 text-xs text-blue-700">
                          Currently borrowed · Returns {activeBooking.endDate}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link to={`/item/${item.id}`}>
                        <Button variant="ghost" size="xs" icon={<Eye size={13} />}>View</Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="xs"
                        icon={<Edit3 size={13} />}
                        onClick={() => toast.info('Edit item — coming soon')}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        icon={<Pause size={13} />}
                        onClick={() => toast.success('Listing paused')}
                      >
                        Pause
                      </Button>
                    </div>
                  </div>

                  {pendingCount > 0 && (
                    <div className="border-t border-slate-50 px-5 py-3 bg-amber-50/50 flex items-center justify-between">
                      <span className="text-xs text-amber-700">
                        ⏳ {pendingCount} student{pendingCount > 1 ? 's' : ''} want{pendingCount === 1 ? 's' : ''} to borrow this
                      </span>
                      <Link to="/dashboard/requests" className="text-xs text-amber-700 font-medium hover:underline">
                        Review requests →
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
