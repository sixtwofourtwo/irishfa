// ---------------------------------------------------------------------------
// Revenue & monetisation — consolidated commercial view across sources.
// ---------------------------------------------------------------------------

export const revenueKpis = [
  { label: 'Total fan revenue (season)', value: '£2.71m', delta: 14.2, deltaDir: 'up' },
  { label: 'Revenue per fan', value: '£56', delta: 7.3, deltaDir: 'up' },
  { label: 'Avg. spend / attendee', value: '£23.10', delta: 5.6, deltaDir: 'up' },
  { label: 'Fan lifetime value', value: '£312', delta: 4.8, deltaDir: 'up' },
]

// Revenue by stream (season, £000s)
export const revenueByStream = [
  { name: 'Ticketing', value: 1480, color: 'var(--series-1)' },
  { name: 'Retail / Merch', value: 512, color: 'var(--series-2)' },
  { name: 'Food & Beverage', value: 386, color: 'var(--series-3)' },
  { name: 'Memberships', value: 214, color: 'var(--series-6)' },
  { name: 'Hospitality', value: 118, color: 'var(--series-7)' },
]

// Monthly revenue trend (£000s), split ticketing vs other
export const revenueTrend = [
  { month: 'Mar', ticketing: 118, retail: 34, fnb: 28, other: 18 },
  { month: 'Apr', ticketing: 96, retail: 29, fnb: 22, other: 15 },
  { month: 'May', ticketing: 142, retail: 41, fnb: 33, other: 21 },
  { month: 'Jun', ticketing: 168, retail: 58, fnb: 39, other: 26 },
  { month: 'Jul', ticketing: 124, retail: 47, fnb: 31, other: 22 },
  { month: 'Aug', ticketing: 186, retail: 72, fnb: 44, other: 31 },
]

// Revenue by segment (£000s + per-fan)
export const revenueBySegment = [
  { segment: 'Superfans', total: 882, perFan: 214, color: 'var(--series-6)' },
  { segment: 'Committed regulars', total: 1034, perFan: 118, color: 'var(--series-1)' },
  { segment: 'Family & juniors', total: 897, perFan: 96, color: 'var(--series-3)' },
  { segment: 'Digital-first', total: 273, perFan: 21, color: 'var(--series-7)' },
  { segment: 'Lapsed', total: 336, perFan: 44, color: 'var(--series-4)' },
  { segment: 'Newly acquired', total: 179, perFan: 32, color: 'var(--series-2)' },
]

// Concourse / in-app spend categories (share %)
export const spendCategories = [
  { name: 'Food & drink', value: 47 },
  { name: 'Merch (in-app)', value: 21 },
  { name: 'Programmes', value: 12 },
  { name: 'Match predictions / games', value: 11 },
  { name: 'Upgrades & extras', value: 9 },
]
