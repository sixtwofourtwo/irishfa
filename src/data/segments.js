// ---------------------------------------------------------------------------
// Fan segments — behavioural audiences derived from the unified fan record.
// Two groups:
//   'attendee'  — personas defined by real match-going behaviour (the focus for
//                 the Fan Engagement Manager's second-match retention work)
//   'lifecycle' — broader engagement-lifecycle segments across the full fanbase
// ---------------------------------------------------------------------------

export const segments = [
  // ---- Attendee personas -------------------------------------------------
  {
    id: 'families-attending',
    group: 'attendee',
    name: 'Families',
    color: 'var(--series-3)',
    size: 289,
    trend: 9.8,
    trendDir: 'up',
    avgValue: 46,
    engagement: 64,
    short: 'Adults attending with children, typically travelling from outside Belfast.',
    description:
      'Adults who attend with children, most travelling in from outside Belfast. Value convenience, junior activities and group pricing. High potential to build a family match-day habit if the second visit is made easy.',
    traits: ['Attend with children', 'Travel from outside Belfast', 'Group/family tickets', 'Junior activities'],
    channels: { app: 58, social: 61, email: 66, ticketing: 74 },
  },
  {
    id: 'young-female',
    group: 'attendee',
    name: 'Young Female Fans',
    color: 'var(--series-5)',
    size: 178,
    trend: 21.4,
    trendDir: 'up',
    avgValue: 16,
    engagement: 59,
    short: 'Women aged 18–34 who follow players on social but rarely repeat-attend.',
    description:
      'Women aged 18–34 who follow individual players closely on social media but have low repeat attendance. Highly reachable digitally — the biggest opportunity to convert online affinity into a returning match-day audience.',
    traits: ['Aged 18–34', 'Follow players on social', 'Low repeat attendance', 'Digitally reachable'],
    channels: { app: 41, social: 94, email: 52, ticketing: 44 },
  },
  {
    id: 'group-bookers',
    group: 'attendee',
    name: 'Group & Club Bookers',
    color: 'var(--series-2)',
    size: 156,
    trend: 6.2,
    trendDir: 'up',
    avgValue: 44,
    engagement: 48,
    short: 'Youth-club organisers and community groups buying multiple tickets — only one contact captured.',
    description:
      'Youth-club organisers and community groups who buy multiple tickets under a single booking. Only one contact is currently captured, so most of the group is invisible to us — a clear data-capture and retention gap to close.',
    traits: ['Bulk ticket buyers', 'Youth clubs & community groups', 'One contact captured', 'Data-capture gap'],
    channels: { app: 22, social: 34, email: 58, ticketing: 82 },
  },
  {
    id: 'other-adults',
    group: 'attendee',
    name: 'Other Adult Supporters',
    color: 'var(--series-1)',
    size: 4900,
    trend: 7.0,
    trendDir: 'up',
    avgValue: 34,
    engagement: 55,
    short: 'Attendees without children, a mixed demographic — these can be solo or multiple ticket buyers.',
    description:
      'Attendees without children who are a mixed demographic — these can be solo or multiple ticket buyers. By far the largest volume of match attendees and the core of the live audience.',
    traits: ['No children', 'Mixed demographic', 'Solo or multiple buyers', 'Largest attendee volume'],
    channels: { app: 52, social: 58, email: 60, ticketing: 76 },
  },

  // ---- Lifecycle segments ------------------------------------------------
  {
    id: 'superfans',
    group: 'lifecycle',
    name: 'Superfans',
    color: 'var(--series-6)',
    size: 430,
    share: 2.0,
    trend: 5.2,
    trendDir: 'up',
    avgValue: 112,
    engagement: 91,
    short: 'Attend nearly every game; high spend and advocacy.',
    description:
      'Attend nearly every home game, with high app engagement and merch spend. Our most valuable advocates — high retention, high referral.',
    traits: ['9+ games / season', 'App power users', 'High merch spend', 'Season-ticket holders'],
    channels: { app: 94, social: 88, email: 72, ticketing: 98 },
  },
  {
    id: 'regulars',
    group: 'lifecycle',
    name: 'Committed regulars',
    color: 'var(--series-1)',
    size: 1380,
    share: 6.4,
    trend: 7.4,
    trendDir: 'up',
    avgValue: 70,
    engagement: 74,
    short: 'Attend most home fixtures; strong season-ticket potential.',
    description:
      'Reliable match-goers who attend most home fixtures and engage across email and social. Strong upsell potential to season tickets.',
    traits: ['4–8 games / season', 'Email engaged', 'Family bookings', 'Growing spend'],
    channels: { app: 71, social: 68, email: 81, ticketing: 79 },
  },
  {
    id: 'families',
    group: 'lifecycle',
    name: 'Family & juniors',
    color: 'var(--series-4)',
    size: 1980,
    share: 9.2,
    trend: 12.6,
    trendDir: 'up',
    avgValue: 41,
    engagement: 66,
    short: 'Group and family buyers across the wider fanbase, often with juniors.',
    description:
      'Group and family ticket buyers across the wider fanbase, often with junior members. Price-sensitive but high growth — the future core of the fan base.',
    traits: ['Group bookings', 'Junior members', 'School holiday spikes', 'Concourse F&B'],
    channels: { app: 58, social: 61, email: 64, ticketing: 72 },
  },
  {
    id: 'digital',
    group: 'lifecycle',
    name: 'Digital-first followers',
    color: 'var(--series-7)',
    size: 10900,
    share: 50.7,
    trend: 18.9,
    trendDir: 'up',
    avgValue: 3,
    engagement: 58,
    short: 'Highly engaged online but rarely attend in person.',
    description:
      'Highly engaged on social and streaming but rarely attend in person — many outside NI. A major monetisation and conversion opportunity.',
    traits: ['High social engagement', 'Rarely attend', 'International reach', 'Content consumers'],
    channels: { app: 34, social: 96, email: 42, ticketing: 12 },
  },
  {
    id: 'lapsed',
    group: 'lifecycle',
    name: 'Lapsed supporters',
    color: 'var(--series-8)',
    size: 3400,
    share: 15.8,
    trend: 4.4,
    trendDir: 'down',
    avgValue: 8,
    engagement: 29,
    short: 'Previously active, now dormant for 12+ months.',
    description:
      'Previously attended or engaged but inactive for 12+ months. Prime win-back audience — historically responsive to targeted offers.',
    traits: ['No activity 12m+', 'Was ticket buyer', 'Email dormant', 'Win-back target'],
    channels: { app: 18, social: 31, email: 34, ticketing: 22 },
  },
  {
    id: 'new',
    group: 'lifecycle',
    name: 'Newly acquired',
    color: 'var(--brand-600)',
    size: 1650,
    share: 7.7,
    trend: 22.1,
    trendDir: 'up',
    avgValue: 12,
    engagement: 47,
    short: 'Joined in the last 90 days; onboarding underway.',
    description:
      'Joined in the last 90 days via a match, campaign or Euro qualifier surge. Onboarding journey underway to build habit.',
    traits: ['Joined < 90 days', 'First-time buyers', 'Campaign-driven', 'Onboarding'],
    channels: { app: 44, social: 72, email: 51, ticketing: 48 },
  },
]

export const segmentById = Object.fromEntries(segments.map((s) => [s.id, s]))

// Segment migration over the season (lifecycle segments, stacked view input)
export const segmentTrend = [
  { month: 'Mar', Superfans: 380, 'Committed regulars': 1180, 'Family & juniors': 1640, 'Digital-first': 8900, Lapsed: 3520, New: 1180 },
  { month: 'Apr', Superfans: 392, 'Committed regulars': 1220, 'Family & juniors': 1710, 'Digital-first': 9300, Lapsed: 3500, New: 1290 },
  { month: 'May', Superfans: 404, 'Committed regulars': 1265, 'Family & juniors': 1780, 'Digital-first': 9720, Lapsed: 3470, New: 1400 },
  { month: 'Jun', Superfans: 414, 'Committed regulars': 1310, 'Family & juniors': 1850, 'Digital-first': 10180, Lapsed: 3440, New: 1500 },
  { month: 'Jul', Superfans: 423, 'Committed regulars': 1348, 'Family & juniors': 1920, 'Digital-first': 10560, Lapsed: 3415, New: 1585 },
  { month: 'Aug', Superfans: 430, 'Committed regulars': 1380, 'Family & juniors': 1980, 'Digital-first': 10900, Lapsed: 3400, New: 1650 },
]
