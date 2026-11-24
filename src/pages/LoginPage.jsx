// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRightLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function LoginPage() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('arjun.sharma@rgpv.ac.in');
  const [password, setPassword] = useState('demo123');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
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
          <h1 className="text-2xl font-bold text-white font-display">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Log in to your student account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* Demo hint */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-xs text-indigo-700 mb-6 flex items-center gap-2">
            <span>🎯</span>
            <span>
              <span className="font-semibold">Demo:</span> Email and password are pre-filled. Just click Log In.
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@college.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<Mail size={16} />}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPw ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
                Remember me
              </label>
              <button type="button" className="text-indigo-600 hover:underline">Forgot password?</button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              loading={loading}
            >
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          By logging in, you agree to our{' '}
          <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Terms of Use</span>
          {' '}and{' '}
          <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
}
