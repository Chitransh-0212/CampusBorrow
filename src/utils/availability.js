// src/utils/availability.js

// Today's date in app context
export const TODAY = '2026-09-13';

/**
 * Get a display-friendly availability label for an item.
 */
export function getAvailabilityLabel(item) {
  const { availabilityStatus, availableFrom } = item;

  if (availabilityStatus === 'available') {
    return { label: 'Available now', color: 'green', emoji: '🟢' };
  }

  if (availabilityStatus === 'borrowed') {
    if (availableFrom) {
      const isNextDay = isDateTomorrow(availableFrom);
      const label = isNextDay ? 'Available tomorrow' : `Available from ${formatShortDate(availableFrom)}`;
      return { label, color: 'red', emoji: '🔴', availableFrom };
    }
    return { label: 'Currently borrowed', color: 'red', emoji: '🔴' };
  }

  if (availabilityStatus === 'reserved') {
    if (availableFrom) {
      return {
        label: `Reserved · Available ${formatShortDate(availableFrom)}`,
        color: 'yellow',
        emoji: '🟡',
        availableFrom,
      };
    }
    return { label: 'Reserved', color: 'yellow', emoji: '🟡' };
  }

  return { label: 'Unknown', color: 'gray', emoji: '⚪' };
}

/**
 * Check if an item is available for a given date range.
 * Returns { available, reason, suggestedDate }
 */
export function checkDateAvailability(item, startDateStr, endDateStr, existingBookings = []) {
  const today = new Date(TODAY);
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  // Basic validation
  if (start < today) {
    return { available: false, reason: 'Start date cannot be in the past.' };
  }
  if (end <= start) {
    return { available: false, reason: 'End date must be after start date.' };
  }

  // Check item's own availability window
  if (item.availabilityStatus !== 'available' && item.availableFrom) {
    const availFrom = new Date(item.availableFrom);
    if (start < availFrom) {
      return {
        available: false,
        reason: `Item is not available until ${formatShortDate(item.availableFrom)}.`,
        suggestedDate: item.availableFrom,
      };
    }
  }

  // Check overlap with existing accepted/active bookings
  const activeBookings = existingBookings.filter(
    (b) => b.itemId === item.id && ['active', 'accepted', 'reserved'].includes(b.status)
  );

  for (const booking of activeBookings) {
    const bStart = new Date(booking.startDate);
    const bEnd = new Date(booking.endDate);

    // Overlap check: start < bEnd && end > bStart
    if (start < bEnd && end > bStart) {
      return {
        available: false,
        reason: 'These dates conflict with an existing rental.',
        suggestedDate: booking.endDate,
      };
    }
  }

  return { available: true };
}

/**
 * Find alternative items of same category available for requested dates.
 */
export function findAlternatives(targetItem, allItems, startDate, endDate, bookings = []) {
  return allItems
    .filter((item) => {
      if (item.id === targetItem.id) return false;
      if (item.category !== targetItem.category) return false;
      if (item.city !== targetItem.city) return false;
      const { available } = checkDateAvailability(item, startDate, endDate, bookings);
      return available;
    })
    .slice(0, 3);
}

// ── Helpers ──────────────────────────────

function isDateTomorrow(dateStr) {
  const tomorrow = new Date(TODAY);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateStr);
  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  );
}

export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function formatFullDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateInput(dateStr) {
  return dateStr || '';
}

export function getTomorrowStr() {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function getMinEndDate(startDateStr) {
  if (!startDateStr) return TODAY;
  const d = new Date(startDateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}
