// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import ItemDetailPage from './pages/ItemDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MyItemsPage from './pages/dashboard/MyItemsPage';
import BorrowingsPage from './pages/dashboard/BorrowingsPage';

// Placeholder pages for those not yet implemented fully
function Placeholder({ title }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-slate-500">This page is coming soon in the next development phase.</p>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

function Layout() {
  const location = useLocation();
  const [backendStatus, setBackendStatus] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(`✅ Backend Connected: ${data.message}`);
      })
      .catch(err => {
        setBackendStatus('❌ Backend Disconnected');
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center font-mono border-b border-indigo-500/30">
        {backendStatus}
      </div>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="item/:id" element={<ItemDetailPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                
                {/* Dashboard Routes */}
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="dashboard/my-items" element={<MyItemsPage />} />
                <Route path="dashboard/borrowings" element={<BorrowingsPage />} />
                <Route path="dashboard/requests" element={<Placeholder title="Requests (Owner view)" />} />
                <Route path="dashboard/history" element={<Placeholder title="Rental History" />} />
                
                {/* Other features */}
                <Route path="list-item" element={<Placeholder title="List an Item" />} />
                <Route path="item-requests" element={<Placeholder title="Community Item Requests" />} />
                <Route path="categories" element={<ExplorePage />} />
                <Route path="how-it-works" element={<Placeholder title="How It Works" />} />
                <Route path="safety" element={<Placeholder title="Safety Guidelines" />} />
                <Route path="notifications" element={<Placeholder title="Notifications" />} />
                <Route path="profile/:id" element={<Placeholder title="User Profile" />} />
                
                <Route path="*" element={<Placeholder title="404 Not Found" />} />
              </Route>
            </Routes>
          </ToastProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
