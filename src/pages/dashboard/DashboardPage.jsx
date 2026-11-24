// src/pages/dashboard/DashboardPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, ArrowRightLeft, Clock, CheckCircle2,
  Star, TrendingUp, ChevronRight, Bell, Plus,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { MOCK_ITEMS } from '../../data/mockItems';
import { VerifiedBadge } from '../../components/ui/Badge';

function StatCard({ label, value, icon, color, linkTo, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Link to={linkTo} className="block group">
        <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 hover:card-shadow-hover transition-all duration-200 group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${color}`}>
              {icon}
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono mb-1">{value}</div>
          <div className="text-sm text-slate-500">{label}</div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings, notifications } = useApp();

  const myItems = MOCK_ITEMS.filter((i) => i.ownerId === user?.id);
  const activeBorrowings = bookings.filter((b) => b.borrowerId === user?.id && b.status === 'active');
  const pendingRequests = bookings.filter(
    (b) => (b.ownerId === user?.id) && b.status === 'pending'
  );
  const completedRentals = bookings.filter(
    (b) => (b.borrowerId === user?.id || b.ownerId === user?.id) && b.status === 'completed'
  );

  const totalSaved = bookings
    .filter((b) => b.borrowerId === user?.id && b.status === 'completed')
    .reduce((sum, b) => {
      const item = MOCK_ITEMS.find((i) => i.id === b.itemId);
      return sum + (item?.buyPrice ? item.buyPrice - b.finalRent : 0);
    }, 0);

  const unreadNotifications = notifications.filter((n) => !n.read && n.userId === user?.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display text-2xl font-bold text-slate-900">
                    Hey, {user?.name?.split(' ')[0]}! 👋
                  </h1>
                  {user?.verified && <VerifiedBadge />}
                </div>
                <p className="text-slate-500 text-sm">{user?.college} · {user?.city}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    {user?.rating?.toFixed(1) || '—'} rating
                  </span>
                  <span>·</span>
                  <span>{user?.successfulRentals || 0} rentals</span>
                  <span>·</span>
                  <span>{user?.onTimeReturns || 0}% on-time</span>
                </div>
              </div>
            </div>
            <Link
              to="/list-item"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus size={15} />
              List an Item
            </Link>
          </div>
        </motion.div>

        {/* Notifications banner */}
        {unreadNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Bell size={15} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-indigo-900">
                You have {unreadNotifications.length} new notification{unreadNotifications.length > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-indigo-600 mt-0.5">{unreadNotifications[0]?.message}</p>
            </div>
            <Link to="/notifications" className="text-xs text-indigo-600 hover:underline shrink-0">
              View all
            </Link>
          </motion.div>
        )}

        {/* Pending requests alert */}
        {pendingRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <AlertCircle size={20} className="text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900">
                {pendingRequests.length} pending borrow request{pendingRequests.length > 1 ? 's' : ''} need your response
              </p>
            </div>
            <Link to="/dashboard/requests" className="text-xs text-amber-700 hover:underline font-medium shrink-0">
              Review →
            </Link>
          </motion.div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="My Listed Items"
            value={myItems.length}
            icon={<Package size={20} className="text-indigo-600" />}
            color="bg-indigo-100"
            linkTo="/dashboard/my-items"
            delay={0}
          />
          <StatCard
            label="Active Borrowings"
            value={activeBorrowings.length}
            icon={<ArrowRightLeft size={20} className="text-violet-600" />}
            color="bg-violet-100"
            linkTo="/dashboard/borrowings"
            delay={0.06}
          />
          <StatCard
            label="Pending Requests"
            value={pendingRequests.length}
            icon={<Clock size={20} className="text-amber-600" />}
            color="bg-amber-100"
            linkTo="/dashboard/requests"
            delay={0.12}
          />
          <StatCard
            label="Completed Rentals"
            value={completedRentals.length + 14}
            icon={<CheckCircle2 size={20} className="text-emerald-600" />}
            color="bg-emerald-100"
            linkTo="/dashboard/history"
            delay={0.18}
          />
        </div>

        {/* Trust score + savings */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {/* Trust score */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 card-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-slate-900">Trust Score</h3>
              <Link to={`/profile/${user?.id}`} className="text-xs text-indigo-600 hover:underline">
                View profile
              </Link>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl font-black text-slate-900 font-mono">
                {user?.rating?.toFixed(1) || '—'}
              </div>
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={16} className={s <= Math.floor(user?.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Rentals', value: (user?.successfulRentals || 0) + 14 },
                { label: 'On-time %', value: `${user?.onTimeReturns || 0}%` },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 rounded-xl px-3 py-2">
                  <div className="font-bold text-slate-900 text-lg">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
            {user?.verified && (
              <div className="mt-4 flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-2">
                <VerifiedBadge />
                <span className="text-xs text-indigo-600">Student identity verified</span>
              </div>
            )}
          </motion.div>

          {/* Savings */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">Total Savings</h3>
              <TrendingUp size={20} className="text-emerald-200" />
            </div>
            <div className="text-4xl font-black font-mono mb-1">
              ₹{(2840 + totalSaved).toLocaleString('en-IN')}
            </div>
            <p className="text-emerald-100 text-sm mb-4">saved by borrowing instead of buying</p>
            <div className="bg-white/15 rounded-xl px-3 py-2 text-sm">
              <p className="text-emerald-50">
                💡 You've spent ₹950 renting calculators. Buying one for ₹1,200 might now make sense.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 card-shadow"
        >
          <h3 className="font-display font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Explore Items', to: '/explore', emoji: '🔍' },
              { label: 'List an Item', to: '/list-item', emoji: '➕' },
              { label: 'Request Item', to: '/item-requests', emoji: '📋' },
              { label: 'Safety Guide', to: '/safety', emoji: '🛡️' },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-colors text-center group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{a.emoji}</span>
                <span className="text-xs font-medium text-slate-700 group-hover:text-indigo-700">{a.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
