// ---------------------------------------------------------------------------
// Campaigns & content — cross-platform activity and personalisation.
// Reach, conversions and revenue are scaled to the real fanbase model
// (~21,500 profiles, ~31.5k social reach, ~£308k season revenue).
// ---------------------------------------------------------------------------

export const campaigns = [
  {
    id: 1,
    name: 'Euro 2027 Qualifier — Ticket Drive',
    channel: 'Email + Social',
    status: 'live',
    audience: 'Committed regulars, Lapsed',
    reach: 8400,
    engagement: 24.6,
    conversions: 640,
    revenue: 9600,
    roi: 4.8,
    goal: 'Ticket sales',
  },
  {
    id: 2,
    name: 'Junior Green Army — Family Membership',
    channel: 'Email + App',
    status: 'live',
    audience: 'Family & juniors',
    reach: 3200,
    engagement: 31.2,
    conversions: 280,
    revenue: 5600,
    roi: 3.6,
    goal: 'Membership',
  },
  {
    id: 3,
    name: 'We Miss You — Win-back',
    channel: 'Email',
    status: 'live',
    audience: 'Lapsed supporters',
    reach: 3400,
    engagement: 18.9,
    conversions: 190,
    revenue: 3400,
    roi: 3.1,
    goal: 'Reactivation',
  },
  {
    id: 4,
    name: 'Match-day Highlights — TikTok Series',
    channel: 'Social',
    status: 'live',
    audience: 'Digital-first followers',
    reach: 42000,
    engagement: 8.7,
    conversions: 210,
    revenue: 0,
    roi: null,
    goal: 'Awareness & growth',
  },
  {
    id: 5,
    name: 'Season Ticket Renewal 2025/26',
    channel: 'Email + Web',
    status: 'completed',
    audience: 'Superfans, Regulars',
    reach: 1900,
    engagement: 42.1,
    conversions: 520,
    revenue: 44200,
    roi: 12.4,
    goal: 'Renewals',
  },
  {
    id: 6,
    name: 'Concourse Cashless Push',
    channel: 'App',
    status: 'completed',
    audience: 'Match attendees',
    reach: 2300,
    engagement: 56.4,
    conversions: 1480,
    revenue: 14200,
    roi: 6.8,
    goal: 'In-app spend',
  },
  {
    id: 7,
    name: 'New Home Kit Launch',
    channel: 'Social + Email + Web',
    status: 'scheduled',
    audience: 'All engaged fans',
    reach: 0,
    engagement: 0,
    conversions: 0,
    revenue: 0,
    roi: null,
    goal: 'Retail sales',
  },
]

// Performance by platform (this season). reach in 000s (impressions),
// followers in 000s — social followers total ~31.5k.
export const platformPerformance = [
  { platform: 'Instagram', reach: 62, engagement: 7.9, followers: 14 },
  { platform: 'TikTok', reach: 88, engagement: 11.2, followers: 9 },
  { platform: 'Facebook', reach: 26, engagement: 3.4, followers: 5 },
  { platform: 'X', reach: 15, engagement: 2.8, followers: 3 },
  { platform: 'Email', reach: 14, engagement: 38.4, followers: 14 },
]

// Content type engagement (avg engagement rate %)
export const contentTypes = [
  { type: 'Match highlights', value: 12.4 },
  { type: 'Player features', value: 9.8 },
  { type: 'Behind the scenes', value: 8.6 },
  { type: 'Fan content', value: 7.2 },
  { type: 'Fixtures / results', value: 5.1 },
  { type: 'Sponsor / commercial', value: 2.9 },
]

// Email campaign funnel (last major send) — ~14,200 subscribers
export const emailFunnel = [
  { stage: 'Delivered', value: 13800 },
  { stage: 'Opened', value: 5300 },
  { stage: 'Clicked', value: 1460 },
  { stage: 'Converted', value: 420 },
]
