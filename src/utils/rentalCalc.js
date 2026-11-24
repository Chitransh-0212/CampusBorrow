// src/utils/rentalCalc.js

/**
 * Calculate rental cost for an item.
 * @param {number} rentPerDay
 * @param {number} days
 * @param {number} discountThreshold - days after which discount applies
 * @param {number} discountPercent - discount percentage (0-100)
 * @returns {{ baseRent, discountAmount, finalRent, discountApplied }}
 */
export function calculateRental(rentPerDay, days, discountThreshold = 0, discountPercent = 0) {
  const baseRent = rentPerDay * days;
  let discountApplied = false;
  let discountAmount = 0;

  if (discountThreshold > 0 && discountPercent > 0 && days >= discountThreshold) {
    discountAmount = Math.round((baseRent * discountPercent) / 100);
    discountApplied = true;
  }

  const finalRent = baseRent - discountAmount;

  return {
    baseRent,
    discountAmount,
    discountApplied,
    discountPercent,
    finalRent,
  };
}

/**
 * Calculate break-even point in days.
 * @param {number} buyPrice
 * @param {number} rentPerDay
 * @returns {number} days
 */
export function calculateBreakEven(buyPrice, rentPerDay) {
  if (!rentPerDay || rentPerDay === 0) return Infinity;
  return Math.round(buyPrice / rentPerDay);
}

/**
 * Get borrow vs buy recommendation.
 * @returns {{ verdict, savings, message }}
 */
export function getBorrowVsBuyVerdict(finalRent, buyPrice, days, breakEvenDays) {
  if (!buyPrice) return null;

  const savings = buyPrice - finalRent;

  if (finalRent < buyPrice) {
    return {
      verdict: 'borrow',
      savings,
      savingsPercent: Math.round((savings / buyPrice) * 100),
      message: `Borrowing saves you ₹${savings.toLocaleString('en-IN')} for ${days} days.`,
      breakEvenMessage: `Break-even: ${breakEvenDays} days — buying only makes sense for longer use.`,
    };
  } else {
    const extraCost = finalRent - buyPrice;
    return {
      verdict: 'buy',
      savings: -extraCost,
      savingsPercent: 0,
      message: `For ${days} days, buying (₹${buyPrice.toLocaleString('en-IN')}) is cheaper than renting.`,
      breakEvenMessage: `You've crossed the break-even point of ${breakEvenDays} days.`,
    };
  }
}

/**
 * Calculate total payable = finalRent + securityDeposit
 */
export function calculateTotalPayable(finalRent, securityDeposit) {
  return finalRent + (securityDeposit || 0);
}

/**
 * Get number of days between two date strings.
 */
export function getDaysBetween(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 0;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}
