// ---------------------------------------------------------------------------
// Executive overview KPIs and cross-source trend series.
// Illustrative prototype data for the IFA Women's Senior Team.
// ---------------------------------------------------------------------------

export const kpis = [
  {
    id: 'fans',
    label: 'Unified fan profiles',
    value: '48,420',
    icon: 'Users',
    delta: 6.4,
    deltaDir: 'up',
    sub: 'across 7 connected sources',
  },
  {
    id: 'engaged',
    label: 'Monthly active fans',
    value: '19,880',
    icon: 'Activity',
    delta: 9.1,
    deltaDir: 'up',
    sub: '41% of the fan base',
  },
  {
    id: 'revenue',
    label: 'Fan revenue (season)',
    value: '£2.71m',
    icon: 'PoundSterling',
    delta: 14.2,
    deltaDir: 'up',
    sub: 'tickets, app, retail & F&B',
  },
  {
    id: 'attendance',
    label: 'Avg. home attendance',
    value: '14,320',
    icon: 'Ticket',
    delta: 21.5,
    deltaDir: 'up',
    sub: 'last 5 home fixtures',
  },
]

export const secondaryKpis = [
  { label: 'Avg. engagement score', value: '62', suffix: '/100', delta: 3.0, deltaDir: 'up' },
  { label: 'Email open rate', value: '38.4', suffix: '%', delta: 2.1, deltaDir: 'up' },
  { label: 'Social followers', value: '204k', suffix: '', delta: 11.8, deltaDir: 'up' },
  { label: 'Lapsed fans', value: '7,640', suffix: '', delta: 4.4, deltaDir: 'down' },
  { label: 'Avg. spend / attendee', value: '£23.10', suffix: '', delta: 5.6, deltaDir: 'up' },
  { label: 'Net promoter score', value: '+48', suffix: '', delta: 6.0, deltaDir: 'up' },
]

// Monthly cross-platform engagement (12 months). Values are indexed fan touchpoints (000s).
export const engagementTrend = [
  { month: 'Sep', app: 22, social: 61, email: 18, web: 27 },
  { month: 'Oct', app: 26, social: 66, email: 19, web: 29 },
  { month: 'Nov', app: 31, social: 72, email: 21, web: 33 },
  { month: 'Dec', app: 24, social: 58, email: 17, web: 25 },
  { month: 'Jan', app: 28, social: 69, email: 22, web: 31 },
  { month: 'Feb', app: 34, social: 78, email: 24, web: 36 },
  { month: 'Mar', app: 41, social: 92, email: 27, web: 44 },
  { month: 'Apr', app: 38, social: 85, email: 25, web: 40 },
  { month: 'May', app: 47, social: 104, email: 29, web: 49 },
  { month: 'Jun', app: 52, social: 121, email: 31, web: 55 },
  { month: 'Jul', app: 44, social: 98, email: 28, web: 46 },
  { month: 'Aug', app: 58, social: 132, email: 33, web: 61 },
]

// Fan base growth (unified profiles, 000s)
export const growthTrend = [
  { month: 'Sep', fans: 39.1, active: 14.2 },
  { month: 'Oct', fans: 40.3, active: 15.0 },
  { month: 'Nov', fans: 41.8, active: 16.1 },
  { month: 'Dec', fans: 42.4, active: 15.3 },
  { month: 'Jan', fans: 43.6, active: 16.8 },
  { month: 'Feb', fans: 44.5, active: 17.4 },
  { month: 'Mar', fans: 45.7, active: 18.6 },
  { month: 'Apr', fans: 46.2, active: 18.1 },
  { month: 'May', fans: 46.9, active: 19.0 },
  { month: 'Jun', fans: 47.6, active: 19.5 },
  { month: 'Jul', fans: 48.0, active: 19.2 },
  { month: 'Aug', fans: 48.4, active: 19.9 },
]

// Where engaged fans reach us (share of touchpoints)
export const channelMix = [
  { name: 'Social media', value: 44, color: 'var(--series-7)' },
  { name: 'Stadium app', value: 22, color: 'var(--series-6)' },
  { name: 'Website', value: 18, color: 'var(--series-2)' },
  { name: 'Email', value: 11, color: 'var(--series-4)' },
  { name: 'Ticketing', value: 5, color: 'var(--series-1)' },
]

// Fan location (Northern Ireland + reach)
export const fanGeography = [
  { area: 'Belfast', fans: 16240 },
  { area: 'Lisburn & Castlereagh', fans: 5120 },
  { area: 'Newtownabbey', fans: 3980 },
  { area: 'Ards & North Down', fans: 4610 },
  { area: 'Mid Ulster', fans: 3240 },
  { area: 'Derry & Strabane', fans: 3860 },
  { area: 'Armagh & Craigavon', fans: 4020 },
  { area: 'Rest of UK / ROI', fans: 5120 },
  { area: 'International', fans: 2230 },
]
