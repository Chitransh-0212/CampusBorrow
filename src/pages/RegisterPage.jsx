// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, GraduationCap, MapPin, ArrowRightLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Input, { Select } from '../components/ui/Input';

const CITIES = ['Bhopal', 'Indore', 'Delhi', 'Bangalore', 'Pune', 'Mumbai'];
const COLLEGES_BHOPAL = [
  'RGPV Bhopal', 'MANIT Bhopal', 'LNCT Bhopal', 'SAGE University',
  'IET Bhopal', 'SIRT Bhopal', 'Oriental College', 'Barkatullah University',
];

export default function RegisterPage() {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', password: '', college: '', city: 'Bhopal', area: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!form.college) e.college = 'Please select your college';
    return e;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await register(form);
    setLoading(false);
    toast.success('Welcome to CampusBorrow! 🎉');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <ArrowRightLeft size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">
              Campus<span className="text-indigo-400">Borrow</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-display">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Join students saving money in {form.city}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full name"
              placeholder="Arjun Sharma"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              icon={<User size={16} />}
            />
            <Input
              label="College email"
              type="email"
              placeholder="you@college.ac.in"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              icon={<Mail size={16} />}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPw ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set('password')}
                error={errors.password}
                icon={<Lock size={16} />}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Select
              label="City"
              value={form.city}
              onChange={set('city')}
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </Select>

            <Select
              label="College"
              value={form.college}
              onChange={set('college')}
              error={errors.college}
            >
              <option value="">Select your college</option>
              {COLLEGES_BHOPAL.map((c) => <option key={c}>{c}</option>)}
              <option value="Other">Other</option>
            </Select>

            <Input
              label="Area / Locality (optional)"
              placeholder="e.g. MP Nagar, Kolar Road"
              value={form.area}
              onChange={set('area')}
              icon={<MapPin size={16} />}
              hint="Helps match you with nearby students"
            />

            {/* Verification note */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-700 flex items-start gap-2">
              <GraduationCap size={14} className="shrink-0 mt-0.5" />
              <span>
                <span className="font-semibold">Student verification</span> — We'll verify your student status soon. This is a demo system.
              </span>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
