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
    avgValue: 78,
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
    avgValue: 26,
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
    avgValue: 52,
    engagement: 48,
    short: 'Youth-club organisers and community groups buying multiple tickets — only one contact captured.',
    description:
      'Youth-club organisers and community groups who buy multiple tickets under a single booking. Only one contact is currently captured, so most of the group is invisible to us — a clear data-capture and retention gap to close.',
    traits: ['Bulk ticket buyers', 'Youth clubs & community groups', 'One contact captured', 'Data-capture gap'],
    channels: { app: 22, social: 34, email: 58, ticketing: 82 },
  },

  // ---- Lifecycle segments ------------------------------------------------
  {
    id: 'superfans',
    group: 'lifecycle',
    name: 'Superfans',
    color: 'var(--series-6)',
    size: 4120,
    share: 8.5,
    trend: 5.2,
    trendDir: 'up',
    avgValue: 214,
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
    size: 8760,
    share: 18.1,
    trend: 7.4,
    trendDir: 'up',
    avgValue: 118,
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
    size: 9340,
    share: 19.3,
    trend: 12.6,
    trendDir: 'up',
    avgValue: 96,
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
    size: 12980,
    share: 26.8,
    trend: 18.9,
    trendDir: 'up',
    avgValue: 21,
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
    size: 7640,
    share: 15.8,
    trend: 4.4,
    trendDir: 'down',
    avgValue: 44,
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
    size: 5580,
    share: 11.5,
    trend: 22.1,
    trendDir: 'up',
    avgValue: 32,
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
  { month: 'Mar', Superfans: 3620, 'Committed regulars': 7900, 'Family & juniors': 8100, 'Digital-first': 10800, Lapsed: 8200, New: 4100 },
  { month: 'Apr', Superfans: 3740, 'Committed regulars': 8050, 'Family & juniors': 8380, 'Digital-first': 11250, Lapsed: 8050, New: 4360 },
  { month: 'May', Superfans: 3860, 'Committed regulars': 8210, 'Family & juniors': 8640, 'Digital-first': 11720, Lapsed: 7960, New: 4720 },
  { month: 'Jun', Superfans: 3980, 'Committed regulars': 8420, 'Family & juniors': 8910, 'Digital-first': 12190, Lapsed: 7840, New: 5010 },
  { month: 'Jul', Superfans: 4050, 'Committed regulars': 8610, 'Family & juniors': 9160, 'Digital-first': 12580, Lapsed: 7720, New: 5290 },
  { month: 'Aug', Superfans: 4120, 'Committed regulars': 8760, 'Family & juniors': 9340, 'Digital-first': 12980, Lapsed: 7640, New: 5580 },
]
