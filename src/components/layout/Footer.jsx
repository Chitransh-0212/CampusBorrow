// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { ArrowRightLeft } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <ArrowRightLeft size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Campus<span className="text-indigo-400">Borrow</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              A student-only marketplace for borrowing, renting, and buying useful things — with smart Borrow vs Buy calculations.
            </p>
            <p className="text-xs text-slate-500">🏙️ Currently in Bhopal · Expanding soon</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { to: '/explore', label: 'Explore Items' },
                { to: '/list-item', label: 'List an Item' },
                { to: '/item-requests', label: 'Request an Item' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/categories', label: 'Categories' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Community</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { to: '/safety', label: 'Safety Guidelines' },
                { to: '/how-it-works', label: 'Trust & Verification' },
                { to: '/how-it-works', label: 'Community Rules' },
                { to: '/how-it-works', label: 'Dispute Help' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { to: '/', label: 'About' },
                { to: '/', label: 'Contact' },
                { to: '/', label: 'Privacy Policy' },
                { to: '/', label: 'Terms of Use' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 CampusBorrow · Made with ❤️ for students in Bhopal
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full">
              🚀 MVP — Bhopal Launch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
