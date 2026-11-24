// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Search, Bell, ChevronDown, Menu, X, MapPin,
  User, Package, ArrowRightLeft, LogOut, Plus,
  MessageSquareMore, ShieldCheck, Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const CITIES = ['Bhopal', 'Indore', 'Delhi', 'Bangalore', 'Pune', 'Mumbai'];

const NAV_LINKS = [
  { to: '/explore', label: 'Explore' },
  { to: '/categories', label: 'Categories' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/item-requests', label: 'Requests' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { city, setCity, unreadCount, notifications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target)) setCityOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                <ArrowRightLeft size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
                Campus<span className="text-indigo-600">Borrow</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* City Selector */}
              <div className="relative hidden sm:block" ref={cityRef}>
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <MapPin size={14} className="text-indigo-500" />
                  {city}
                  <ChevronDown size={13} className={`transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {cityOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-44 bg-white rounded-xl border border-slate-100 shadow-xl py-1.5 z-10"
                    >
                      {CITIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => { setCity(c); setCityOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            c === city
                              ? 'text-indigo-600 bg-indigo-50 font-medium'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {user ? (
                <>
                  {/* List an Item */}
                  <Link
                    to="/list-item"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Plus size={15} />
                    List Item
                  </Link>

                  {/* Notifications */}
                  <div className="relative" ref={notifRef}>
                    <button
                      onClick={() => setNotifOpen(!notifOpen)}
                      className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                        >
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </motion.span>
                      )}
                    </button>
                    <AnimatePresence>
                      {notifOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl z-10 overflow-hidden"
                        >
                          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
                            <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                            {unreadCount > 0 && (
                              <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-indigo-600 hover:underline">
                                View all
                              </Link>
                            )}
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                              <p className="text-center text-sm text-slate-400 py-8">No notifications</p>
                            ) : (
                              notifications.slice(0, 5).map((n) => (
                                <div
                                  key={n.id}
                                  className={`px-4 py-3 border-b border-slate-50 last:border-0 ${!n.read ? 'bg-indigo-50/50' : ''}`}
                                >
                                  <p className="text-sm text-slate-700">{n.message}</p>
                                  <p className="text-xs text-slate-400 mt-1">
                                    {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <ChevronDown size={13} className={`text-slate-400 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-2 right-0 w-56 bg-white rounded-2xl border border-slate-100 shadow-xl py-1.5 z-10"
                        >
                          <div className="px-4 py-3 border-b border-slate-50">
                            <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                            <p className="text-xs text-slate-400">{user.college}</p>
                          </div>
                          {[
                            { to: '/dashboard', label: 'Dashboard', icon: <Home size={15} /> },
                            { to: '/dashboard/my-items', label: 'My Items', icon: <Package size={15} /> },
                            { to: '/dashboard/borrowings', label: 'My Borrowings', icon: <ArrowRightLeft size={15} /> },
                            { to: '/dashboard/requests', label: 'Requests', icon: <MessageSquareMore size={15} /> },
                            { to: `/profile/${user.id}`, label: 'My Profile', icon: <User size={15} /> },
                          ].map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <span className="text-slate-400">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                          <div className="border-t border-slate-50 mt-1 pt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <LogOut size={15} />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.to) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* City */}
                <div className="border-t border-slate-100 mt-2 pt-3">
                  <p className="text-xs font-medium text-slate-400 px-4 mb-2">CITY</p>
                  <div className="flex flex-wrap gap-2 px-4">
                    {CITIES.slice(0, 4).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCity(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          c === city ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                {user && (
                  <Link
                    to="/list-item"
                    className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium"
                  >
                    <Plus size={16} />
                    List an Item
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 origin-left z-50"
          style={{ scaleX }}
        />
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
