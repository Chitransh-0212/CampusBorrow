// src/pages/dashboard/BorrowingsPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightLeft, CheckCircle2, Clock, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_ITEMS } from '../../data/mockItems';
import { MOCK_USERS } from '../../data/mockUsers';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';

const STATUS_STYLES = {
  active: 'bg-blue-100 text-blue-700',
  pending: 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-rose-100 text-rose-700',
  cancelled: 'bg-slate-100 text-slate-500',
  return_requested: 'bg-violet-100 text-violet-700',
};

const STATUS_LABELS = {
  active: '🔵 Active',
  pending: '🟡 Pending',
  completed: '✅ Completed',
  rejected: '🔴 Rejected',
  cancelled: '⚪ Cancelled',
  return_requested: '🟣 Return requested',
};

function BookingCard({ booking, onReturn, onRate }) {
  const item = MOCK_ITEMS.find((i) => i.id === booking.itemId);
  const owner = MOCK_USERS.find((u) => u.id === booking.ownerId);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden"
    >
      <div className="flex gap-4 p-5">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link to={`/item/${item.id}`} className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors truncate font-display">
              {item.title}
            </Link>
            <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[booking.status]}`}>
              {STATUS_LABELS[booking.status]}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Owner: {owner?.name} · {item.city}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
            <span>📅 {booking.startDate} → {booking.endDate}</span>
            <span>({booking.totalDays} days)</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="bg-slate-50 rounded-lg px-2 py-1 font-mono font-semibold text-slate-700">
              ₹{booking.finalRent.toLocaleString('en-IN')} rent
            </span>
            <span className="text-slate-400">+ ₹{booking.securityDeposit} deposit</span>
          </div>
        </div>
      </div>

      {/* Pickup info */}
      <div className="border-t border-slate-50 px-5 py-3 bg-slate-50/50 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          📍 {booking.pickupLocation}
        </span>
        <div className="flex items-center gap-2">
          {booking.status === 'active' && (
            <>
              {new Date(booking.endDate) <= new Date('2026-09-15') && (
                <span className="text-xs text-amber-600 font-medium">⏰ Due soon</span>
              )}
              <Button
                variant="primary"
                size="xs"
                icon={<CheckCircle2 size={13} />}
                onClick={() => onReturn(booking)}
              >
                Mark Returned
              </Button>
            </>
          )}
          {booking.status === 'completed' && !booking.reviewLeft && (
            <Button
              variant="outline"
              size="xs"
              icon={<Star size={13} />}
              onClick={() => onRate(booking)}
            >
              Leave Review
            </Button>
          )}
          {booking.status === 'return_requested' && (
            <span className="text-xs text-violet-600 font-medium">Awaiting owner confirmation</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function BorrowingsPage() {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useApp();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('active');
  const [returnModal, setReturnModal] = useState(null);
  const [rateModal, setRateModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [rateComment, setRateComment] = useState('');

  const myBookings = bookings.filter((b) => b.borrowerId === user?.id);
  const active = myBookings.filter((b) => ['active', 'pending', 'return_requested'].includes(b.status));
  const history = myBookings.filter((b) => ['completed', 'rejected', 'cancelled'].includes(b.status));

  const displayed = activeTab === 'active' ? active : history;

  const handleReturn = (booking) => setReturnModal(booking);

  const confirmReturn = async () => {
    updateBookingStatus(returnModal.id, 'return_requested');
    setReturnModal(null);
    toast.success('Return requested! Waiting for owner confirmation.');
  };

  const confirmRate = () => {
    setRateModal(null);
    toast.success('Review submitted! Thank you.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-slate-900">My Borrowings</h1>
          <p className="text-sm text-slate-500 mt-1">Items you've borrowed from other students</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-100 p-1 rounded-xl mb-6 w-fit">
          {[
            { key: 'active', label: `Active (${active.length})` },
            { key: 'history', label: `History (${history.length + 14})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <EmptyState
            icon={activeTab === 'active' ? '📭' : '📜'}
            title={activeTab === 'active' ? 'No active borrowings' : 'No rental history'}
            description={activeTab === 'active' ? "You're not borrowing anything right now." : "Your completed rentals will appear here."}
            action={<Link to="/explore"><Button variant="outline" icon={<ArrowRightLeft size={14} />}>Explore Items</Button></Link>}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {displayed.map((b) => (
              <BookingCard key={b.id} booking={b} onReturn={handleReturn} onRate={setRateModal} />
            ))}
            {activeTab === 'history' && history.length === 0 && (
              <div className="text-center text-sm text-slate-400 py-4">
                Showing 14 older rentals from before this session
              </div>
            )}
          </div>
        )}
      </div>

      {/* Return Modal */}
      <Modal open={!!returnModal} onClose={() => setReturnModal(null)} title="Confirm Return" size="sm">
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to mark{' '}
            <span className="font-semibold">{MOCK_ITEMS.find((i) => i.id === returnModal?.itemId)?.title}</span>{' '}
            as returned? The owner will need to confirm.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            ⚠️ Only mark as returned after physically handing back the item to the owner.
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="flex-1" onClick={() => setReturnModal(null)}>Cancel</Button>
            <Button variant="primary" size="md" className="flex-1" onClick={confirmReturn} icon={<CheckCircle2 size={15} />}>
              Mark Returned
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rating Modal */}
      <Modal open={!!rateModal} onClose={() => setRateModal(null)} title="Leave a Review" size="sm">
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">How was your experience with this rental?</p>
          <div className="flex gap-2 justify-center">
            {[1,2,3,4,5].map((s) => (
              <button key={s} onClick={() => setRating(s)}>
                <Star size={32} className={s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />
              </button>
            ))}
          </div>
          <textarea
            rows={3}
            placeholder="Share your experience..."
            value={rateComment}
            onChange={(e) => setRateComment(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <Button variant="primary" size="md" className="w-full" onClick={confirmRate}>
            Submit Review
          </Button>
        </div>
      </Modal>
    </div>
  );
}
