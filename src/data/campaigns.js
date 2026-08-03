// ---------------------------------------------------------------------------
// Campaigns & content — cross-platform activity and personalisation.
// ---------------------------------------------------------------------------

export const campaigns = [
  {
    id: 1,
    name: 'Euro 2027 Qualifier — Ticket Drive',
    channel: 'Email + Social',
    status: 'live',
    audience: 'Committed regulars, Lapsed',
    reach: 41200,
    engagement: 24.6,
    conversions: 3180,
    revenue: 71600,
    roi: 6.2,
    goal: 'Ticket sales',
  },
  {
    id: 2,
    name: 'Junior Green Army — Family Membership',
    channel: 'Email + App',
    status: 'live',
    audience: 'Family & juniors',
    reach: 12400,
    engagement: 31.2,
    conversions: 1420,
    revenue: 28400,
    roi: 4.1,
    goal: 'Membership',
  },
  {
    id: 3,
    name: 'We Miss You — Win-back',
    channel: 'Email',
    status: 'live',
    audience: 'Lapsed supporters',
    reach: 7640,
    engagement: 18.9,
    conversions: 612,
    revenue: 11200,
    roi: 3.4,
    goal: 'Reactivation',
  },
  {
    id: 4,
    name: 'Match-day Highlights — TikTok Series',
    channel: 'Social',
    status: 'live',
    audience: 'Digital-first followers',
    reach: 186000,
    engagement: 8.7,
    conversions: 940,
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
    reach: 9200,
    engagement: 42.1,
    conversions: 6840,
    revenue: 512000,
    roi: 18.7,
    goal: 'Renewals',
  },
  {
    id: 6,
    name: 'Concourse Cashless Push',
    channel: 'App',
    status: 'completed',
    audience: 'Match attendees',
    reach: 14300,
    engagement: 56.4,
    conversions: 8060,
    revenue: 186000,
    roi: 9.9,
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

// Performance by platform (this season)
export const platformPerformance = [
  { platform: 'Instagram', reach: 142, engagement: 7.9, followers: 96 },
  { platform: 'TikTok', reach: 218, engagement: 11.2, followers: 61 },
  { platform: 'Facebook', reach: 88, engagement: 3.4, followers: 34 },
  { platform: 'X', reach: 54, engagement: 2.8, followers: 13 },
  { platform: 'Email', reach: 39, engagement: 38.4, followers: 40 },
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

// Email campaign funnel (last major send)
export const emailFunnel = [
  { stage: 'Delivered', value: 39100 },
  { stage: 'Opened', value: 15020 },
  { stage: 'Clicked', value: 4180 },
  { stage: 'Converted', value: 1240 },
]
