// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CURRENT_USER, MOCK_USERS } from '../data/mockUsers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    const savedUser = localStorage.getItem('cb_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('cb_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock auth — accept any matching email from mock users, or demo credentials
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const loginUser = foundUser || MOCK_CURRENT_USER;
    setUser(loginUser);
    localStorage.setItem('cb_user', JSON.stringify(loginUser));
    return { success: true };
  };

  const register = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    const newUser = {
      ...MOCK_CURRENT_USER,
      ...data,
      id: `user-${Date.now()}`,
      rating: 0,
      successfulRentals: 0,
      onTimeReturns: 100,
      itemsListed: 0,
      itemsBorrowed: 0,
      verified: false,
      memberSince: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    localStorage.setItem('cb_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cb_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('cb_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
