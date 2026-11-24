// src/pages/LandingPage.jsx
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Search, ArrowRight, ArrowRightLeft, ShieldCheck, Star,
  MapPin, TrendingUp, Zap, ChevronRight, Check, Users,
  Package, BarChart3, Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_ITEMS, CATEGORIES } from '../data/mockItems';
import ItemCard from '../components/marketplace/ItemCard';
import { AvailabilityBadge } from '../components/ui/Badge';

import { useEffect } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

// ── Animated Counter ──
function Counter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      // Extract numeric value from string (e.g. "150", "2.4")
      const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
      if (isNaN(numericTarget)) {
        setDisplayValue(target);
        return;
      }
      const isDecimal = target.includes('.');
      
      const controls = animate(0, numericTarget, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(val) {
          setDisplayValue(isDecimal ? val.toFixed(1) : Math.round(val));
        },
      });
      return controls.stop;
    }
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// ── Featured items for hero carousel ──
const HERO_ITEMS = [
  { title: 'Sony Projector', price: '₹80/day', icon: '📽️', color: 'from-indigo-500 to-violet-600', status: 'borrowed' },
  { title: 'Canon DSLR', price: '₹120/day', icon: '📷', color: 'from-sky-500 to-indigo-500', status: 'available' },
  { title: 'Calculator', price: '₹20/day', icon: '🖩', color: 'from-emerald-500 to-teal-600', status: 'available' },
  { title: 'Hero Cycle', price: '₹100/day', icon: '🚲', color: 'from-amber-500 to-orange-500', status: 'reserved' },
  { title: 'Guitar', price: '₹150/day', icon: '🎸', color: 'from-rose-500 to-pink-600', status: 'available' },
];

// ── How It Works steps ──
const HOW_STEPS = [
  {
    icon: <Search size={24} />,
    step: '01',
    title: 'Search Nearby',
    desc: 'Find what you need from students in your city. Filter by category, price, and availability.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: <BarChart3 size={24} />,
    step: '02',
    title: 'Compare Smart',
    desc: 'See the rental cost vs buying price. Our calculator tells you exactly when borrowing saves money.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: <ArrowRightLeft size={24} />,
    step: '03',
    title: 'Borrow Safely',
    desc: 'Send a request, coordinate a safe public meetup, and borrow with confidence.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: <Star size={24} />,
    step: '04',
    title: 'Return & Rate',
    desc: 'Return safely, get your deposit back, and build your trust score for future rentals.',
    color: 'bg-amber-100 text-amber-600',
  },
];

const TRUST_ITEMS = [
  { icon: <ShieldCheck size={18} />, label: 'Verified Students' },
  { icon: <Check size={18} />, label: 'Transparent Pricing' },
  { icon: <Package size={18} />, label: 'Security Deposits' },
  { icon: <Clock size={18} />, label: 'Availability Tracking' },
  { icon: <Star size={18} />, label: 'Ratings & Reviews' },
  { icon: <MapPin size={18} />, label: 'Safe Meetup Guidance' },
];

function SectionReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, type: 'spring', bounce: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const { city } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
  };

  const featuredItems = MOCK_ITEMS.slice(0, 6);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  return (
    <div className="min-h-screen">
      {/* ── CINEMATIC HERO ── */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 bg-noise"
        onMouseMove={handleMouseMove}
      >
        {/* Abstract Glowing Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none animate-blob animation-delay-2000" />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full mt-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-dark text-indigo-300 text-xs font-semibold tracking-wider mb-8 uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Now live in {city}
                </div>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
                  Borrow <span className="text-slate-500 font-medium italic">what you need.</span><br />
                  Buy <span className="text-gradient-premium">what you should.</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 font-light">
                  A high-trust, student-only marketplace. Coordinate safe meetups, borrow instantly, and calculate the exact moment buying becomes cheaper than renting.
                </p>

                {/* Glassmorphism Search */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto lg:mx-0">
                  <div className="relative flex-1 group">
                    <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search projectors, cycles, books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 glass-panel-dark rounded-2xl text-white placeholder:text-slate-500 text-base focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-premium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-5 bg-white text-slate-950 rounded-2xl font-bold text-base hover:bg-slate-200 transition-bezier shrink-0 shadow-premium-hover hover:scale-[1.02]"
                  >
                    Explore Items
                  </button>
                </form>

                {/* Social proof */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2"><Check size={16} className="text-indigo-400"/> 150+ Verified Students</span>
                  <span className="flex items-center gap-2"><Check size={16} className="text-indigo-400"/> Security Deposits</span>
                  <span className="flex items-center gap-2"><Check size={16} className="text-indigo-400"/> Real-time Availability</span>
                </div>
              </motion.div>
            </div>

            {/* Right — High-end Floating Cards */}
            <div className="hidden lg:block relative flex-1 min-h-[600px] w-full">
              {HERO_ITEMS.map((item, i) => {
                const positions = [
                  { top: '5%', left: '10%' },
                  { top: '15%', right: '0%' },
                  { top: '45%', left: '0%' },
                  { top: '55%', right: '10%' },
                  { top: '80%', left: '30%' },
                ];
                const pos = positions[i];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      x: mousePos.x * ((i % 3) + 1.5) * -0.6,
                      y: mousePos.y * ((i % 3) + 1.5) * -0.6,
                    }}
                    transition={{ 
                      opacity: { duration: 0.8, delay: 0.4 + i * 0.1 },
                      scale: { duration: 0.8, delay: 0.4 + i * 0.1, type: "spring", bounce: 0.4 },
                      x: { type: 'spring', stiffness: 40, damping: 30 },
                      y: { type: 'spring', stiffness: 40, damping: 30 }
                    }}
                    style={{ position: 'absolute', ...pos }}
                    className="glass-panel-dark rounded-2xl p-5 w-64 transition-bezier hover:scale-105 cursor-default group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-inner`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-slate-100 font-semibold text-sm mb-0.5">{item.title}</p>
                        <p className="text-indigo-300 text-sm font-mono tracking-tight">{item.price}</p>
                        <div className="mt-2.5">
                          {item.status === 'available' && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Available
                            </span>
                          )}
                          {item.status === 'borrowed' && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-rose-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                              Borrowed
                            </span>
                          )}
                          {item.status === 'reserved' && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-amber-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              Reserved
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-10">
          <span className="text-[10px] text-white uppercase tracking-widest font-semibold font-mono">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce-subtle" />
          </div>
        </div>

        {/* Cinematic bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      {/* ── BORROW VS BUY SHOWCASE ── */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Smart Calculator</span>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Borrow vs Buy — calculated for you
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Enter your dates and instantly see whether borrowing or buying makes more financial sense.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <BorrowVsBuyShowcase />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">Browse</span>
              <h2 className="font-display text-3xl font-bold text-slate-900">Popular categories</h2>
            </div>
            <Link to="/categories" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <SectionReveal key={cat.id} delay={i * 0.04}>
                <Link
                  to={`/explore?category=${cat.id}`}
                  className="group flex flex-col items-center gap-3 p-5 bg-slate-50 hover:bg-indigo-50 rounded-2xl border border-transparent hover:border-indigo-200 transition-all duration-200 text-center cursor-pointer"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{cat.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ITEMS ── */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
                📍 {city}
              </span>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Popular around {city}
              </h2>
            </div>
            <Link to="/explore" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
              See all items <ChevronRight size={14} />
            </Link>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredItems.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-3">Simple process</span>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">How CampusBorrow works</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              From finding what you need to returning it safely — the whole process takes minutes.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_STEPS.map((step, i) => (
              <SectionReveal key={step.step} delay={i * 0.1}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color}`}>
                      {step.icon}
                    </div>
                    <span className="text-4xl font-black text-slate-100 font-mono">{step.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="bg-gradient-to-br from-indigo-950 to-slate-900 py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-3">Safety first</span>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Built on trust</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Every feature is designed to make student-to-student lending safe, transparent, and fair.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {TRUST_ITEMS.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.07}>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-white font-medium">{item.label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4} className="text-center mt-12">
            <Link
              to="/safety"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-2xl border border-white/20 font-medium transition-colors"
            >
              <ShieldCheck size={18} />
              View Safety Guidelines
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white py-16 px-4 sm:px-6 border-y border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '150', suffix: '+', label: 'Items Listed', icon: <Package size={20} /> },
            { value: '80', suffix: '+', label: 'Active Students', icon: <Users size={20} /> },
            { value: '₹2.4L', suffix: '', label: 'Total Saved', icon: <TrendingUp size={20} /> },
            { value: '98', suffix: '%', label: 'On-time Returns', icon: <Zap size={20} /> },
          ].map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-1">
                  {stat.icon}
                </div>
                <span className="text-3xl font-black text-slate-900 font-display">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to borrow smarter?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Join hundreds of students in {city} who are saving money by borrowing instead of buying.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-xl"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-colors"
              >
                Browse Items
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

// ── Borrow vs Buy interactive showcase ──
function BorrowVsBuyShowcase() {
  const [days, setDays] = useState(20);
  const buyPrice = 4500;
  const rentPerDay = 80;
  const discountThreshold = 7;
  const discountPercent = 10;
  const deposit = 1000;

  const baseRent = rentPerDay * days;
  const discountApplied = days >= discountThreshold;
  const discountAmt = discountApplied ? Math.round((baseRent * discountPercent) / 100) : 0;
  const finalRent = baseRent - discountAmt;
  const breakEven = Math.round(buyPrice / rentPerDay);
  const savings = buyPrice - finalRent;
  const isBorrowBetter = finalRent < buyPrice;

  const borrowWidth = Math.min(100, Math.round((finalRent / buyPrice) * 100));

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      {/* Item header */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-slate-100 px-6 py-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-md">
          📽️
        </div>
        <div>
          <h3 className="font-display font-bold text-slate-900 text-lg">Sony Projector</h3>
          <p className="text-sm text-slate-500">₹80/day · Buy at ₹4,500 · ₹1,000 deposit</p>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full font-medium">
            10% off after {discountThreshold} days
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Duration slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-700">How many days?</label>
            <span className="text-2xl font-black text-indigo-600 font-mono">{days} days</span>
          </div>
          <input
            type="range"
            min={1}
            max={60}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 day</span>
            <span className="text-amber-600 font-medium">Break-even: {breakEven} days</span>
            <span>60 days</span>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className={`rounded-2xl p-5 border-2 transition-all ${isBorrowBetter ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">🔄 Borrow</span>
              {isBorrowBetter && (
                <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">
                  Recommended
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono mb-1">
              ₹<span key={finalRent} className="animate-pop inline-block">{finalRent.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-xs text-slate-500 flex flex-col gap-0.5">
              <span>Base: ₹<span key={`base-${baseRent}`} className="animate-pop inline-block">{baseRent.toLocaleString('en-IN')}</span></span>
              {discountApplied && <span className="text-emerald-600">Discount: −₹<span key={`disc-${discountAmt}`} className="animate-pop inline-block">{discountAmt}</span></span>}
              <span className="text-slate-400">+ ₹{deposit.toLocaleString('en-IN')} refundable deposit</span>
            </div>
          </div>

          <div className={`rounded-2xl p-5 border-2 transition-all ${!isBorrowBetter ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">🛒 Buy</span>
              {!isBorrowBetter && (
                <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-medium">
                  Recommended
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono mb-1">
              ₹{buyPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-500">
              <span>One-time purchase</span>
            </div>
          </div>
        </div>

        {/* Progress bar comparison */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Borrow cost vs buy price</span>
            <span>{borrowWidth}% of buy price</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${borrowWidth}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹0</span>
            <span>₹{buyPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Verdict */}
        <div className={`rounded-2xl p-4 ${isBorrowBetter ? 'bg-indigo-50 border border-indigo-200' : 'bg-emerald-50 border border-emerald-200'}`}>
          <p className={`font-semibold text-sm ${isBorrowBetter ? 'text-indigo-800' : 'text-emerald-800'}`}>
            {isBorrowBetter
              ? `💡 Borrowing saves you ₹${savings.toLocaleString('en-IN')} for ${days} days.`
              : `💡 Buying is cheaper for ${days}+ days (break-even is ${breakEven} days).`}
          </p>
          <p className={`text-xs mt-1 ${isBorrowBetter ? 'text-indigo-600' : 'text-emerald-600'}`}>
            Break-even point: {breakEven} days — after that, buying saves more.
          </p>
        </div>
      </div>
    </div>
  );
}
