// src/data/mockItems.js
// Current date: Sept 13, 2026
// Availability status: 'available' | 'borrowed' | 'reserved'

export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics', icon: '💻', description: 'Laptops, projectors, gadgets' },
  { id: 'study', label: 'Study', icon: '📚', description: 'Books, calculators, stationery' },
  { id: 'photography', label: 'Photography', icon: '📷', description: 'Cameras, lenses, tripods' },
  { id: 'gaming', label: 'Gaming', icon: '🎮', description: 'Controllers, consoles, accessories' },
  { id: 'sports', label: 'Sports', icon: '⚽', description: 'Equipment, gear, accessories' },
  { id: 'travel', label: 'Travel', icon: '🏕️', description: 'Tents, bags, camping gear' },
  { id: 'transport', label: 'Transport', icon: '🚲', description: 'Cycles, scooters, boards' },
  { id: 'events', label: 'Events', icon: '🎉', description: 'Speakers, lights, decor' },
  { id: 'music', label: 'Music', icon: '🎸', description: 'Instruments and accessories' },
  { id: 'lifestyle', label: 'Lifestyle', icon: '🌿', description: 'Home, kitchen, wellness' },
];

// Sept 13 is "today"
export const MOCK_ITEMS = [
  // ──────────────────────────────────────
  // ITEM 1 — HERO DEMO ITEM
  // ──────────────────────────────────────
  {
    id: 'item-1',
    ownerId: 'user-2',
    title: 'Sony MP-CD1 Pocket Projector',
    description:
      'Compact pocket projector perfect for presentations, movie nights, and group study sessions. 100 ANSI lumens, HDMI + USB-C. Comes with carry pouch and cable.',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    ],
    condition: 'Like New',
    buyPrice: 4500,
    rentPerDay: 80,
    discountThreshold: 7,
    discountPercent: 10,
    securityDeposit: 1000,
    city: 'Bhopal',
    area: 'Kolar Road',
    meetupLocation: 'MANIT Main Gate',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'borrowed',
    availableFrom: '2026-09-14', // available tomorrow
    availableUntil: null,
    tags: ['projector', 'presentation', 'portable'],
    rating: 4.9,
    reviewCount: 12,
    successfulRentals: 14,
    createdAt: '2026-07-10',
  },

  // ──────────────────────────────────────
  // ITEM 2 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-2',
    ownerId: 'user-2',
    title: 'Canon EOS 200D DSLR Camera',
    description:
      'Entry-level DSLR with 18-55mm kit lens. Great for events, travel, and assignments. Fully charged battery and 32GB SD card included.',
    category: 'photography',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 28000,
    rentPerDay: 120,
    discountThreshold: 7,
    discountPercent: 8,
    securityDeposit: 2000,
    city: 'Bhopal',
    area: 'Kolar Road',
    meetupLocation: 'MANIT Main Gate',
    rentEnabled: true,
    buyEnabled: false,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['camera', 'dslr', 'photography', 'canon'],
    rating: 4.8,
    reviewCount: 8,
    successfulRentals: 10,
    createdAt: '2026-07-22',
  },

  // ──────────────────────────────────────
  // ITEM 3 — Available now, rent+buy
  // ──────────────────────────────────────
  {
    id: 'item-3',
    ownerId: 'user-3',
    title: 'Casio FX-991ES Scientific Calculator',
    description:
      'Casio FX-991ES Plus scientific calculator. Works perfectly for engineering exams. Box included.',
    category: 'study',
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    ],
    condition: 'Like New',
    buyPrice: 1200,
    rentPerDay: 20,
    discountThreshold: 14,
    discountPercent: 15,
    securityDeposit: 200,
    city: 'Bhopal',
    area: 'Arera Colony',
    meetupLocation: 'LNCT Campus Gate, Kolar Road',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['calculator', 'casio', 'exam', 'study'],
    rating: 4.7,
    reviewCount: 6,
    successfulRentals: 7,
    createdAt: '2026-08-01',
  },

  // ──────────────────────────────────────
  // ITEM 4 — Reserved
  // ──────────────────────────────────────
  {
    id: 'item-4',
    ownerId: 'user-5',
    title: 'Hero Lectro E5 City Electric Cycle',
    description:
      'Electric-assist cycle, perfect for campus commute. Range ~40 km per charge. Helmet included.',
    category: 'transport',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 8000,
    rentPerDay: 100,
    discountThreshold: 7,
    discountPercent: 10,
    securityDeposit: 500,
    city: 'Bhopal',
    area: 'TT Nagar',
    meetupLocation: 'New Market, TT Nagar',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'reserved',
    availableFrom: '2026-09-18',
    availableUntil: null,
    tags: ['cycle', 'electric', 'transport', 'commute'],
    rating: 4.6,
    reviewCount: 5,
    successfulRentals: 6,
    createdAt: '2026-08-15',
  },

  // ──────────────────────────────────────
  // ITEM 5 — Borrowed, available Sept 20
  // ──────────────────────────────────────
  {
    id: 'item-5',
    ownerId: 'user-3',
    title: 'Manfrotto Compact Tripod',
    description:
      'Aluminium travel tripod with 3-way head. Extends to 152cm. Great for photography and video recording.',
    category: 'photography',
    images: [
      'https://images.unsplash.com/photo-1617839625591-e5a789593135?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 3500,
    rentPerDay: 60,
    discountThreshold: 7,
    discountPercent: 10,
    securityDeposit: 500,
    city: 'Bhopal',
    area: 'Arera Colony',
    meetupLocation: 'LNCT Campus Gate, Kolar Road',
    rentEnabled: true,
    buyEnabled: false,
    availabilityStatus: 'borrowed',
    availableFrom: '2026-09-20',
    availableUntil: null,
    tags: ['tripod', 'photography', 'video'],
    rating: 4.5,
    reviewCount: 4,
    successfulRentals: 5,
    createdAt: '2026-08-10',
  },

  // ──────────────────────────────────────
  // ITEM 6 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-6',
    ownerId: 'user-4',
    title: 'Yamaha F310 Acoustic Guitar',
    description:
      'Great beginner-to-intermediate acoustic guitar. Comes with picks, strap, and carry bag. Perfect for hostel room jams.',
    category: 'music',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 6000,
    rentPerDay: 150,
    discountThreshold: 7,
    discountPercent: 12,
    securityDeposit: 800,
    city: 'Bhopal',
    area: 'Hoshangabad Road',
    meetupLocation: 'DB Mall, MP Nagar',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['guitar', 'music', 'yamaha', 'acoustic'],
    rating: 4.4,
    reviewCount: 3,
    successfulRentals: 4,
    createdAt: '2026-08-20',
  },

  // ──────────────────────────────────────
  // ITEM 7 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-7',
    ownerId: 'user-1',
    title: 'Sony DualSense PS5 Controller',
    description:
      'Genuine Sony PS5 DualSense controller in midnight black. Works on PC too. USB-C cable included.',
    category: 'gaming',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
    ],
    condition: 'Like New',
    buyPrice: 3500,
    rentPerDay: 50,
    discountThreshold: 7,
    discountPercent: 5,
    securityDeposit: 300,
    city: 'Bhopal',
    area: 'MP Nagar',
    meetupLocation: 'Aashima Mall, MP Nagar',
    rentEnabled: true,
    buyEnabled: false,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['gaming', 'ps5', 'controller', 'sony'],
    rating: 4.9,
    reviewCount: 9,
    successfulRentals: 11,
    createdAt: '2026-08-05',
  },

  // ──────────────────────────────────────
  // ITEM 8 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-8',
    ownerId: 'user-5',
    title: 'Adjustable Laptop Stand + USB Hub',
    description:
      'Foldable aluminium laptop stand with 6-port USB hub. Fits laptops 11-17 inch. Reduces neck strain.',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    ],
    condition: 'Like New',
    buyPrice: 1500,
    rentPerDay: 30,
    discountThreshold: 7,
    discountPercent: 10,
    securityDeposit: 200,
    city: 'Bhopal',
    area: 'TT Nagar',
    meetupLocation: 'New Market, TT Nagar',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['laptop', 'stand', 'work from home', 'accessories'],
    rating: 4.7,
    reviewCount: 6,
    successfulRentals: 8,
    createdAt: '2026-08-25',
  },

  // ──────────────────────────────────────
  // ITEM 9 — Reserved
  // ──────────────────────────────────────
  {
    id: 'item-9',
    ownerId: 'user-2',
    title: 'Quechua 2-Person Camping Tent',
    description:
      'Lightweight pop-up tent, sets up in under 2 minutes. Water-resistant up to 2000mm. Stakes and bag included.',
    category: 'travel',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 5000,
    rentPerDay: 200,
    discountThreshold: 3,
    discountPercent: 15,
    securityDeposit: 1000,
    city: 'Bhopal',
    area: 'Kolar Road',
    meetupLocation: 'MANIT Main Gate',
    rentEnabled: true,
    buyEnabled: false,
    availabilityStatus: 'reserved',
    availableFrom: '2026-09-22',
    availableUntil: null,
    tags: ['camping', 'tent', 'travel', 'trek'],
    rating: 4.6,
    reviewCount: 4,
    successfulRentals: 5,
    createdAt: '2026-09-01',
  },

  // ──────────────────────────────────────
  // ITEM 10 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-10',
    ownerId: 'user-3',
    title: 'JBL Charge 5 Bluetooth Speaker',
    description:
      'Powerful portable speaker with 20h battery life. IP67 waterproof. Perfect for events, picnics, and hostel use.',
    category: 'events',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 4000,
    rentPerDay: 80,
    discountThreshold: 3,
    discountPercent: 10,
    securityDeposit: 500,
    city: 'Bhopal',
    area: 'Arera Colony',
    meetupLocation: 'LNCT Campus Gate, Kolar Road',
    rentEnabled: true,
    buyEnabled: false,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['speaker', 'jbl', 'bluetooth', 'music', 'events'],
    rating: 4.8,
    reviewCount: 7,
    successfulRentals: 9,
    createdAt: '2026-08-18',
  },

  // ──────────────────────────────────────
  // ITEM 11 — Borrowed, avail Sept 17
  // ──────────────────────────────────────
  {
    id: 'item-11',
    ownerId: 'user-1',
    title: 'Canon 50mm f/1.8 STM Lens',
    description:
      'The famous "Nifty Fifty" prime lens. Bokeh portrait lens, works with Canon EF mount. Great for events and portraits.',
    category: 'photography',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 12000,
    rentPerDay: 90,
    discountThreshold: 5,
    discountPercent: 10,
    securityDeposit: 1500,
    city: 'Bhopal',
    area: 'MP Nagar',
    meetupLocation: 'Aashima Mall, MP Nagar',
    rentEnabled: true,
    buyEnabled: false,
    availabilityStatus: 'borrowed',
    availableFrom: '2026-09-17',
    availableUntil: null,
    tags: ['lens', 'canon', '50mm', 'portrait', 'photography'],
    rating: 4.9,
    reviewCount: 10,
    successfulRentals: 13,
    createdAt: '2026-07-25',
  },

  // ──────────────────────────────────────
  // ITEM 12 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-12',
    ownerId: 'user-4',
    title: 'H.C. Verma Physics Book Set (Vol 1 & 2)',
    description:
      'Classic HCV books for JEE and engineering students. Both volumes included. Good condition.',
    category: 'study',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    ],
    condition: 'Fair',
    buyPrice: 800,
    rentPerDay: 15,
    discountThreshold: 14,
    discountPercent: 20,
    securityDeposit: 100,
    city: 'Bhopal',
    area: 'Hoshangabad Road',
    meetupLocation: 'DB Mall, MP Nagar',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['books', 'physics', 'hcv', 'jee', 'study'],
    rating: 4.5,
    reviewCount: 5,
    successfulRentals: 6,
    createdAt: '2026-08-28',
  },

  // ──────────────────────────────────────
  // ITEM 13 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-13',
    ownerId: 'user-5',
    title: 'Cosco Badminton Kit (2 Rackets + Shuttles)',
    description:
      'Set of 2 lightweight badminton rackets and 6 shuttles. Carry bag included. Great for weekend sports.',
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 2000,
    rentPerDay: 40,
    discountThreshold: 3,
    discountPercent: 10,
    securityDeposit: 300,
    city: 'Bhopal',
    area: 'TT Nagar',
    meetupLocation: 'New Market, TT Nagar',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['badminton', 'sports', 'racket', 'outdoor'],
    rating: 4.4,
    reviewCount: 3,
    successfulRentals: 4,
    createdAt: '2026-09-02',
  },

  // ──────────────────────────────────────
  // ITEM 14 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-14',
    ownerId: 'user-1',
    title: 'Prestige Electric Kettle 1.5L',
    description:
      'Stainless steel electric kettle for hostel use. Boils 1.5L in under 3 minutes. Auto shut-off.',
    category: 'lifestyle',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    condition: 'Like New',
    buyPrice: 1200,
    rentPerDay: 25,
    discountThreshold: 7,
    discountPercent: 10,
    securityDeposit: 200,
    city: 'Bhopal',
    area: 'MP Nagar',
    meetupLocation: 'Aashima Mall, MP Nagar',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['kettle', 'hostel', 'kitchen', 'electric'],
    rating: 4.6,
    reviewCount: 4,
    successfulRentals: 5,
    createdAt: '2026-09-05',
  },

  // ──────────────────────────────────────
  // ITEM 15 — Available now
  // ──────────────────────────────────────
  {
    id: 'item-15',
    ownerId: 'user-3',
    title: 'Nivia Volleyball + Pump',
    description:
      'Official size volleyball with pump. Great for hostel courts and college events.',
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    ],
    condition: 'Good',
    buyPrice: 800,
    rentPerDay: 30,
    discountThreshold: 3,
    discountPercent: 10,
    securityDeposit: 100,
    city: 'Bhopal',
    area: 'Arera Colony',
    meetupLocation: 'LNCT Campus Gate, Kolar Road',
    rentEnabled: true,
    buyEnabled: true,
    availabilityStatus: 'available',
    availableFrom: null,
    availableUntil: null,
    tags: ['volleyball', 'sports', 'outdoor'],
    rating: 4.3,
    reviewCount: 2,
    successfulRentals: 3,
    createdAt: '2026-09-08',
  },
];
