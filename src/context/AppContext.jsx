// src/context/AppContext.jsx
// Holds global state: city, notifications, bookings, item requests
import { createContext, useContext, useState } from 'react';
import { MOCK_BOOKINGS, MOCK_ITEM_REQUESTS, MOCK_NOTIFICATIONS } from '../data/mockBookings';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [city, setCity] = useState('Bhopal');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [itemRequests, setItemRequests] = useState(MOCK_ITEM_REQUESTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, { ...booking, id: `booking-${Date.now()}` }]);
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const addItemRequest = (req) => {
    setItemRequests((prev) => [{ ...req, id: `req-${Date.now()}`, responses: 0, createdAt: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const addNotification = (notif) => {
    setNotifications((prev) => [{ ...notif, id: `notif-${Date.now()}`, read: false, createdAt: new Date().toISOString() }, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        city,
        setCity,
        bookings,
        addBooking,
        updateBookingStatus,
        itemRequests,
        addItemRequest,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllRead,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
