// ---------------------------------------------------------------------------
// Fan segments — behavioural audiences derived from the unified fan record.
// ---------------------------------------------------------------------------

export const segments = [
  {
    id: 'superfans',
    name: 'Superfans',
    color: 'var(--series-6)',
    size: 4120,
    share: 8.5,
    trend: 5.2,
    trendDir: 'up',
    avgValue: 214,
    engagement: 91,
    description:
      'Attend nearly every home game, high app engagement and merch spend. Our most valuable advocates — high retention, high referral.',
    traits: ['9+ games / season', 'App power users', 'High merch spend', 'Season-ticket holders'],
    channels: { app: 94, social: 88, email: 72, ticketing: 98 },
  },
  {
    id: 'regulars',
    name: 'Committed regulars',
    color: 'var(--series-1)',
    size: 8760,
    share: 18.1,
    trend: 7.4,
    trendDir: 'up',
    avgValue: 118,
    engagement: 74,
    description:
      'Reliable match-goers who attend most home fixtures and engage across email and social. Strong upsell potential to season tickets.',
    traits: ['4–8 games / season', 'Email engaged', 'Family bookings', 'Growing spend'],
    channels: { app: 71, social: 68, email: 81, ticketing: 79 },
  },
  {
    id: 'families',
    name: 'Family & juniors',
    color: 'var(--series-3)',
    size: 9340,
    share: 19.3,
    trend: 12.6,
    trendDir: 'up',
    avgValue: 96,
    engagement: 66,
    description:
      'Group and family ticket buyers, often with junior members. Price-sensitive but high growth — the future core of the fan base.',
    traits: ['Group bookings', 'Junior members', 'School holiday spikes', 'Concourse F&B'],
    channels: { app: 58, social: 61, email: 64, ticketing: 72 },
  },
  {
    id: 'digital',
    name: 'Digital-first followers',
    color: 'var(--series-7)',
    size: 12980,
    share: 26.8,
    trend: 18.9,
    trendDir: 'up',
    avgValue: 21,
    engagement: 58,
    description:
      'Highly engaged on social and streaming but rarely attend in person — many outside NI. A major monetisation and conversion opportunity.',
    traits: ['High social engagement', 'Rarely attend', 'International reach', 'Content consumers'],
    channels: { app: 34, social: 96, email: 42, ticketing: 12 },
  },
  {
    id: 'lapsed',
    name: 'Lapsed supporters',
    color: 'var(--series-4)',
    size: 7640,
    share: 15.8,
    trend: 4.4,
    trendDir: 'down',
    avgValue: 44,
    engagement: 29,
    description:
      'Previously attended or engaged but inactive for 12+ months. Prime win-back audience — historically responsive to targeted offers.',
    traits: ['No activity 12m+', 'Was ticket buyer', 'Email dormant', 'Win-back target'],
    channels: { app: 18, social: 31, email: 34, ticketing: 22 },
  },
  {
    id: 'new',
    name: 'Newly acquired',
    color: 'var(--series-2)',
    size: 5580,
    share: 11.5,
    trend: 22.1,
    trendDir: 'up',
    avgValue: 32,
    engagement: 47,
    description:
      'Joined in the last 90 days via a match, campaign or Euro qualifier surge. Onboarding journey underway to build habit.',
    traits: ['Joined < 90 days', 'First-time buyers', 'Campaign-driven', 'Onboarding'],
    channels: { app: 44, social: 72, email: 51, ticketing: 48 },
  },
]

// Segment migration over the season (Sankey-lite / stacked view input)
export const segmentTrend = [
  { month: 'Mar', Superfans: 3620, 'Committed regulars': 7900, 'Family & juniors': 8100, 'Digital-first': 10800, Lapsed: 8200, New: 4100 },
  { month: 'Apr', Superfans: 3740, 'Committed regulars': 8050, 'Family & juniors': 8380, 'Digital-first': 11250, Lapsed: 8050, New: 4360 },
  { month: 'May', Superfans: 3860, 'Committed regulars': 8210, 'Family & juniors': 8640, 'Digital-first': 11720, Lapsed: 7960, New: 4720 },
  { month: 'Jun', Superfans: 3980, 'Committed regulars': 8420, 'Family & juniors': 8910, 'Digital-first': 12190, Lapsed: 7840, New: 5010 },
  { month: 'Jul', Superfans: 4050, 'Committed regulars': 8610, 'Family & juniors': 9160, 'Digital-first': 12580, Lapsed: 7720, New: 5290 },
  { month: 'Aug', Superfans: 4120, 'Committed regulars': 8760, 'Family & juniors': 9340, 'Digital-first': 12980, Lapsed: 7640, New: 5580 },
]
