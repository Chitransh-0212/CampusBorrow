// src/pages/ExplorePage.jsx
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, MapPin } from 'lucide-react';
import { MOCK_ITEMS, CATEGORIES } from '../data/mockItems';
import ItemCard from '../components/marketplace/ItemCard';
import { SkeletonGrid } from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';

const CONDITIONS = ['Like New', 'Good', 'Fair'];
const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'available', label: 'Available Soonest' },
];

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { city } = useApp();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [rentOnly, setRentOnly] = useState(false);
  const [buyOnly, setBuyOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [maxRent, setMaxRent] = useState(500);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredItems = useMemo(() => {
    let items = [...MOCK_ITEMS];

    // Search query
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      items = items.filter((i) => i.category === selectedCategory);
    }

    // Conditions
    if (selectedConditions.length > 0) {
      items = items.filter((i) => selectedConditions.includes(i.condition));
    }

    // Available only
    if (showAvailableOnly) {
      items = items.filter((i) => i.availabilityStatus === 'available');
    }

    // Rent/Buy filters
    if (rentOnly) items = items.filter((i) => i.rentEnabled);
    if (buyOnly) items = items.filter((i) => i.buyEnabled);

    // Max rent
    items = items.filter((i) => !i.rentPerDay || i.rentPerDay <= maxRent);

    // Sort
    switch (sort) {
      case 'price_asc':
        items.sort((a, b) => (a.rentPerDay || 0) - (b.rentPerDay || 0));
        break;
      case 'price_desc':
        items.sort((a, b) => (b.rentPerDay || 0) - (a.rentPerDay || 0));
        break;
      case 'rating':
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        items.sort((a, b) => (b.successfulRentals || 0) - (a.successfulRentals || 0));
        break;
      case 'available':
        items.sort((a) => (a.availabilityStatus === 'available' ? -1 : 1));
        break;
      default:
        // recommended: mix of rating + availability
        items.sort((a, b) => {
          const aScore = (a.rating || 0) * 10 + (a.availabilityStatus === 'available' ? 5 : 0);
          const bScore = (b.rating || 0) * 10 + (b.availabilityStatus === 'available' ? 5 : 0);
          return bScore - aScore;
        });
    }

    return items;
  }, [query, selectedCategory, selectedConditions, showAvailableOnly, rentOnly, buyOnly, maxRent, sort]);

  const toggleCondition = (c) => {
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedConditions([]);
    setShowAvailableOnly(false);
    setRentOnly(false);
    setBuyOnly(false);
    setMaxRent(500);
    setSort('recommended');
  };

  const hasFilters = query || selectedCategory || selectedConditions.length || showAvailableOnly || rentOnly || buyOnly;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <Button
              variant={filtersOpen ? 'primary' : 'secondary'}
              size="sm"
              icon={<SlidersHorizontal size={15} />}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              Filters
              {hasFilters && (
                <span className="ml-1 bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {[query, selectedCategory, ...selectedConditions].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                !selectedCategory
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6">
          {/* ── Filter Sidebar ── */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 260 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-64 bg-white rounded-2xl border border-slate-100 p-5 sticky top-36">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-slate-900 text-sm">Filters</h3>
                    {hasFilters && (
                      <button onClick={clearFilters} className="text-xs text-indigo-600 hover:underline">
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* City */}
                  <div className="mb-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">City</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-700">
                      <MapPin size={13} className="text-indigo-500" />
                      {city}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Availability</label>
                    <label className="flex items-center gap-2.5 cursor-pointer py-1">
                      <input
                        type="checkbox"
                        checked={showAvailableOnly}
                        onChange={(e) => setShowAvailableOnly(e.target.checked)}
                        className="w-4 h-4 rounded accent-indigo-600"
                      />
                      <span className="text-sm text-slate-700">Available now only</span>
                    </label>
                  </div>

                  {/* Listing type */}
                  <div className="mb-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Type</label>
                    <label className="flex items-center gap-2.5 cursor-pointer py-1">
                      <input type="checkbox" checked={rentOnly} onChange={(e) => setRentOnly(e.target.checked)} className="w-4 h-4 rounded accent-indigo-600" />
                      <span className="text-sm text-slate-700">Rent only</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer py-1">
                      <input type="checkbox" checked={buyOnly} onChange={(e) => setBuyOnly(e.target.checked)} className="w-4 h-4 rounded accent-indigo-600" />
                      <span className="text-sm text-slate-700">Buy only</span>
                    </label>
                  </div>

                  {/* Max rent */}
                  <div className="mb-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Max Rent/Day: ₹{maxRent}
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={maxRent}
                      onChange={(e) => setMaxRent(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>₹10</span>
                      <span>₹500</span>
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Condition</label>
                    {CONDITIONS.map((c) => (
                      <label key={c} className="flex items-center gap-2.5 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={selectedConditions.includes(c)}
                          onChange={() => toggleCondition(c)}
                          className="w-4 h-4 rounded accent-indigo-600"
                        />
                        <span className="text-sm text-slate-700">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── Results ── */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{filteredItems.length}</span> items in {city}
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                  <X size={12} />
                  Clear filters
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No items found"
                description="Try different keywords, categories, or clear your filters."
                action={
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item, i) => (
                  <ItemCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
