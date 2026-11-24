// src/pages/ItemDetailPage.jsx
import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, ChevronLeft, ChevronRight, Star, ShieldCheck,
  MessageSquare, ArrowRightLeft, ShoppingBag, AlertCircle,
  CheckCircle2, Calendar, Clock, Package, Users, Info
} from 'lucide-react';
import { MOCK_ITEMS } from '../data/mockItems';
import { MOCK_USERS } from '../data/mockUsers';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import { AvailabilityBadge, ConditionBadge, VerifiedBadge } from '../components/ui/Badge';
import { calculateRental, calculateBreakEven, getBorrowVsBuyVerdict, getDaysBetween } from '../utils/rentalCalc';
import { checkDateAvailability, findAlternatives, TODAY, getTomorrowStr, getMinEndDate } from '../utils/availability';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ItemCard from '../components/marketplace/ItemCard';
import RatingStars from '../components/ui/RatingStars';

export default function ItemDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { bookings, addBooking, addNotification } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  const item = MOCK_ITEMS.find((i) => i.id === id);
  const owner = item ? MOCK_USERS.find((u) => u.id === item.ownerId) : null;

  const [imgIndex, setImgIndex] = useState(0);
  const [startDate, setStartDate] = useState(getTomorrowStr());
  const [endDate, setEndDate] = useState('');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [requesting, setRequesting] = useState(false);

  const days = getDaysBetween(startDate, endDate);

  const rental = useMemo(() => {
    if (!item || days <= 0) return null;
    return calculateRental(item.rentPerDay, days, item.discountThreshold, item.discountPercent);
  }, [item, days]);

  const breakEvenDays = item ? calculateBreakEven(item.buyPrice, item.rentPerDay) : 0;

  const verdict = useMemo(() => {
    if (!rental || !item?.buyPrice) return null;
    return getBorrowVsBuyVerdict(rental.finalRent, item.buyPrice, days, breakEvenDays);
  }, [rental, item, days, breakEvenDays]);

  const availability = useMemo(() => {
    if (!item || !startDate || !endDate) return null;
    return checkDateAvailability(item, startDate, endDate, bookings);
  }, [item, startDate, endDate, bookings]);

  const alternatives = useMemo(() => {
    if (!item || !startDate || !endDate || (availability && availability.available)) return [];
    return findAlternatives(item, MOCK_ITEMS, startDate, endDate, bookings);
  }, [item, startDate, endDate, availability, bookings]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😔</p>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Item not found</h2>
          <Link to="/explore" className="text-indigo-600 hover:underline text-sm">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.ownerId;

  const handleSendRequest = async () => {
    if (!user) { navigate('/login'); return; }
    setRequesting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const booking = {
      itemId: item.id,
      ownerId: item.ownerId,
      borrowerId: user.id,
      startDate,
      endDate,
      totalDays: days,
      baseRent: rental.baseRent,
      discount: rental.discountAmount,
      finalRent: rental.finalRent,
      securityDeposit: item.securityDeposit,
      totalAmount: rental.finalRent + item.securityDeposit,
      status: 'pending',
      pickupLocation: item.meetupLocation,
      message,
      createdAt: TODAY,
    };
    addBooking(booking);
    addNotification({
      userId: item.ownerId,
      type: 'request_received',
      message: `${user.name} wants to borrow your ${item.title} (${startDate} – ${endDate})`,
      itemId: item.id,
    });
    setRequesting(false);
    setRequestModalOpen(false);
    toast.success('Borrow request sent! The owner will respond shortly.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/explore" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <ChevronLeft size={14} />
            Explore
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{item.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── LEFT: Images ── */}
          <div>
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-200 aspect-[4/3] mb-3">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={item.images[imgIndex]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              {/* Nav arrows */}
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => (i - 1 + item.images.length) % item.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImgIndex((i) => (i + 1) % item.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {/* Availability overlay */}
              <div className="absolute top-4 left-4">
                <AvailabilityBadge item={item} size="lg" />
              </div>
            </div>
            {/* Thumbnails */}
            {item.images.length > 1 && (
              <div className="flex gap-2">
                {item.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      i === imgIndex ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Owner card */}
            {owner && (
              <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {owner.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{owner.name}</p>
                      {owner.verified && <VerifiedBadge />}
                    </div>
                    <p className="text-sm text-slate-500">{owner.college}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {owner.rating.toFixed(1)}
                      </span>
                      <span>·</span>
                      <span>{owner.successfulRentals} rentals</span>
                      <span>·</span>
                      <span>{owner.onTimeReturns}% on-time</span>
                    </div>
                  </div>
                  <Link
                    to={`/profile/${owner.id}`}
                    className="text-xs text-indigo-600 hover:underline shrink-0"
                  >
                    View profile
                  </Link>
                </div>
              </div>
            )}

            {/* Safe meetup */}
            <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3">
              <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-indigo-900 mb-0.5">Safe Meetup</p>
                <p className="text-xs text-indigo-700">📍 {item.meetupLocation}</p>
                <p className="text-xs text-indigo-600 mt-1">Always meet in a public place for pickup and return.</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Details + Calculator ── */}
          <div>
            {/* Title + rating */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight">{item.title}</h1>
                <ConditionBadge condition={item.condition} />
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RatingStars rating={item.rating} count={item.reviewCount} />
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin size={13} />
                  {item.city}{item.area ? ` · ${item.area}` : ''}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6 border-b border-slate-100 pb-6">
              {item.description}
            </p>

            {/* Pricing overview */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {item.rentEnabled && (
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <ArrowRightLeft size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 font-mono">₹{item.rentPerDay}<span className="text-xs font-normal text-slate-400">/day</span></div>
                    <div className="text-xs text-slate-400">Rent price</div>
                  </div>
                </div>
              )}
              {item.buyEnabled && (
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 font-mono">₹{item.buyPrice?.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-slate-400">Buy price</div>
                  </div>
                </div>
              )}
            </div>

            {/* Discount info */}
            {item.discountThreshold > 0 && item.discountPercent > 0 && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-sm text-emerald-700 mb-4">
                <Info size={14} className="shrink-0" />
                {item.discountPercent}% off for rentals of {item.discountThreshold}+ days
              </div>
            )}

            {/* ── RENTAL CALCULATOR ── */}
            {item.rentEnabled && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-4">
                <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-600" />
                  Rental Calculator
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input
                    label="Start date"
                    type="date"
                    value={startDate}
                    min={TODAY}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Input
                    label="End date"
                    type="date"
                    value={endDate}
                    min={getMinEndDate(startDate)}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                {/* Availability check */}
                {availability && (
                  <div
                    className={`flex items-start gap-2 p-3 rounded-xl mb-4 text-sm ${
                      availability.available
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {availability.available ? (
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span>{availability.available ? '✓ Available for your selected dates' : `❌ ${availability.reason}`}</span>
                      {!availability.available && availability.suggestedDate && (
                        <p className="text-xs mt-0.5 opacity-80">
                          Try from {new Date(availability.suggestedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Cost breakdown */}
                {rental && days > 0 && (
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-slate-600">
                      <span>₹{item.rentPerDay} × {days} days</span>
                      <span className="font-mono">₹{rental.baseRent.toLocaleString('en-IN')}</span>
                    </div>
                    {rental.discountApplied && (
                      <div className="flex justify-between text-emerald-600">
                        <span>{item.discountPercent}% long-duration discount</span>
                        <span className="font-mono">−₹{rental.discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-slate-900 border-t border-slate-100 pt-2">
                      <span>Rental cost</span>
                      <span className="font-mono">₹{rental.finalRent.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Refundable deposit</span>
                      <span className="font-mono">₹{item.securityDeposit?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 bg-slate-50 rounded-xl px-3 py-2">
                      <span>Total payable</span>
                      <span className="font-mono">₹{(rental.finalRent + item.securityDeposit).toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      * Deposit is fully refundable after the item is returned and confirmed by the owner.
                    </p>
                  </div>
                )}

                {/* Borrow vs Buy card */}
                {verdict && item.buyEnabled && days > 0 && (
                  <BorrowVsBuyCard verdict={verdict} breakEvenDays={breakEvenDays} days={days} />
                )}

                {/* CTA */}
                {!isOwner && (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mt-4"
                    onClick={() => {
                      if (!user) { navigate('/login'); return; }
                      if (!startDate || !endDate) {
                        toast.warning('Please select start and end dates first.');
                        return;
                      }
                      setRequestModalOpen(true);
                    }}
                    disabled={!!availability && !availability.available}
                  >
                    <ArrowRightLeft size={18} />
                    Request to Borrow
                  </Button>
                )}
                {isOwner && (
                  <div className="mt-4 text-center text-sm text-slate-400 bg-slate-50 rounded-xl py-3">
                    This is your item
                  </div>
                )}
              </div>
            )}

            {/* Buy CTA */}
            {item.buyEnabled && !item.rentEnabled && (
              <Button variant="success" size="lg" className="w-full mb-4">
                <ShoppingBag size={18} />
                Buy for ₹{item.buyPrice?.toLocaleString('en-IN')}
              </Button>
            )}

            {/* Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/explore?q=${tag}`}
                    className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-full text-xs text-slate-500 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── ALTERNATIVES (if unavailable) ── */}
        {alternatives.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Try These Instead</h2>
            <p className="text-sm text-slate-500 mb-6">
              This item isn't available for your dates — but these similar items are:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alternatives.map((alt, i) => (
                <ItemCard key={alt.id} item={alt} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Request Modal ── */}
      <Modal
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title="Send Borrow Request"
        size="md"
      >
        <div className="p-6 space-y-5">
          {/* Summary */}
          <div className="bg-indigo-50 rounded-xl p-4 text-sm space-y-1.5">
            <div className="font-semibold text-slate-900">{item.title}</div>
            <div className="text-slate-600">
              {startDate} → {endDate} · {days} days
            </div>
            {rental && (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>Rental</span>
                  <span className="font-mono font-semibold text-slate-900">₹{rental.finalRent.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Refundable deposit</span>
                  <span className="font-mono">₹{item.securityDeposit?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-indigo-200 pt-1.5">
                  <span>Total payable</span>
                  <span className="font-mono">₹{(rental.finalRent + item.securityDeposit).toLocaleString('en-IN')}</span>
                </div>
              </>
            )}
          </div>

          {/* Meetup location */}
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3">
            <MapPin size={14} className="text-indigo-500 shrink-0" />
            <div>
              <span className="font-medium">Pickup: </span>{item.meetupLocation}
            </div>
          </div>

          {/* Message */}
          <Input
            label="Message to owner (optional)"
            textarea
            rows={3}
            placeholder={`Hi, I need this ${item.title.toLowerCase()} for my...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Safety note */}
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
            <ShieldCheck size={13} className="text-indigo-500 shrink-0 mt-0.5" />
            <span>Always meet in a public place. CampusBorrow recommends meeting at the suggested location above.</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            loading={requesting}
            onClick={handleSendRequest}
          >
            Send Borrow Request
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// ── Borrow vs Buy comparison card ──
function BorrowVsBuyCard({ verdict, breakEvenDays, days }) {
  const isBorrow = verdict.verdict === 'borrow';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border-2 p-4 ${
        isBorrow ? 'border-indigo-200 bg-indigo-50' : 'border-emerald-200 bg-emerald-50'
      }`}
    >
      <p className={`text-sm font-bold mb-1.5 ${isBorrow ? 'text-indigo-800' : 'text-emerald-800'}`}>
        {isBorrow ? '💡 Borrowing looks better' : '💡 Consider buying instead'}
      </p>
      <p className={`text-xs leading-relaxed ${isBorrow ? 'text-indigo-700' : 'text-emerald-700'}`}>
        {verdict.message}
      </p>
      <p className={`text-xs mt-1 opacity-75 ${isBorrow ? 'text-indigo-600' : 'text-emerald-600'}`}>
        {verdict.breakEvenMessage}
      </p>
    </motion.div>
  );
}
