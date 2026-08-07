// ---------------------------------------------------------------------------
// Revenue & monetisation — consolidated commercial view across sources.
// Scaled to the real attendance model (see overview.js): ~£308k total season
// fan revenue, led by ~£150k ticketing at realistic yields (~12,600 ticket
// attendances/season at ~£12 average). All £ figures below are illustrative
// but proportionate to a team drawing ~2,000 per home game.
// ---------------------------------------------------------------------------

export const revenueKpis = [
  { label: 'Total fan revenue (season)', value: '£308k', delta: 14.2, deltaDir: 'up' },
  { label: 'Revenue per fan', value: '£14', delta: 7.3, deltaDir: 'up' },
  { label: 'Avg. spend / attendee', value: '£8.40', delta: 5.6, deltaDir: 'up' },
  { label: 'Fan lifetime value', value: '£96', delta: 4.8, deltaDir: 'up' },
]

// Revenue by stream (season, £000s) — sums to ~£308k
export const revenueByStream = [
  { name: 'Ticketing', value: 152, color: 'var(--series-1)' },
  { name: 'Retail / Merch', value: 64, color: 'var(--series-2)' },
  { name: 'Food & Beverage', value: 48, color: 'var(--series-3)' },
  { name: 'Memberships', value: 26, color: 'var(--series-6)' },
  { name: 'Hospitality', value: 18, color: 'var(--series-7)' },
]

// Monthly revenue trend (£000s, recent 6 months), split ticketing vs other
export const revenueTrend = [
  { month: 'Mar', ticketing: 30, retail: 9, fnb: 8, other: 5 },
  { month: 'Apr', ticketing: 24, retail: 7, fnb: 6, other: 4 },
  { month: 'May', ticketing: 18, retail: 6, fnb: 5, other: 3 },
  { month: 'Jun', ticketing: 28, retail: 9, fnb: 8, other: 5 },
  { month: 'Jul', ticketing: 21, retail: 8, fnb: 6, other: 4 },
  { month: 'Aug', ticketing: 31, retail: 11, fnb: 9, other: 6 },
]

// Revenue by segment (£000s + per-fan season spend). total = size x perFan,
// consistent with segment sizes in segments.js. Sums to ~£306k.
export const revenueBySegment = [
  { segment: 'Committed regulars', total: 97, perFan: 70, color: 'var(--series-1)' },
  { segment: 'Family & juniors', total: 81, perFan: 41, color: 'var(--series-4)' },
  { segment: 'Superfans', total: 48, perFan: 112, color: 'var(--series-6)' },
  { segment: 'Digital-first', total: 33, perFan: 3, color: 'var(--series-7)' },
  { segment: 'Lapsed', total: 27, perFan: 8, color: 'var(--series-8)' },
  { segment: 'Newly acquired', total: 20, perFan: 12, color: 'var(--brand-600)' },
]

// Concourse / in-app spend categories (share %)
export const spendCategories = [
  { name: 'Food & drink', value: 47 },
  { name: 'Merch (in-app)', value: 21 },
  { name: 'Programmes', value: 12 },
  { name: 'Match predictions / games', value: 11 },
  { name: 'Upgrades & extras', value: 9 },
]
