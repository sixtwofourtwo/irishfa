// ---------------------------------------------------------------------------
// Executive overview KPIs and cross-source trend series.
// Illustrative prototype data for the IFA Women's Senior Team.
//
// SCALE MODEL — numbers are deliberately grounded in the REAL attendance data
// (see src/data/matchHistory.js). Recent home crowds average ~2,000 at NI
// grounds, with ~11,900 distinct attendees across the last two seasons. The
// wider figures are scaled to be consistent with that reality:
//   • ~21,500 total identified fan profiles (attendees + digital followers +
//     email subscribers + registered accounts, de-duplicated)
//   • ~11,900 have ever attended a match; ~7,350 engage in a given month
//   • ~31,500 social followers (reach can exceed identified profiles)
//   • ~£308k season fan revenue (from ~£150k ticketing at realistic yields,
//     plus retail, F&B, memberships and hospitality)
// These are illustrative but proportionate — no more "48k fans / £2.7m" for a
// team that draws ~2,000 a game.
// ---------------------------------------------------------------------------

export const kpis = [
  {
    id: 'fans',
    label: 'Unified fan profiles',
    value: '21,500',
    icon: 'Users',
    delta: 6.4,
    deltaDir: 'up',
    sub: 'across 7 connected sources',
  },
  {
    id: 'engaged',
    label: 'Monthly active fans',
    value: '7,350',
    icon: 'Activity',
    delta: 9.1,
    deltaDir: 'up',
    sub: '34% of the fan base',
  },
  {
    id: 'revenue',
    label: 'Fan revenue (season)',
    value: '£308k',
    icon: 'PoundSterling',
    delta: 14.2,
    deltaDir: 'up',
    sub: 'tickets, app, retail & F&B',
  },
  {
    // Real figure from the IFA attendance dataset (Euro 2022 vs England).
    id: 'attendance',
    label: 'Record home crowd',
    value: '30,785',
    icon: 'Ticket',
    sub: 'Euro 2022 vs England (real)',
  },
]

// Retention metrics — the "second-match" challenge that is the core job of the
// Fan Engagement Manager. Figures are attendee-level (of ~11,900 attendees).
export const retentionMetrics = [
  {
    id: 'returning',
    label: 'Returning fans',
    value: '2,180',
    icon: 'Repeat',
    delta: 8.3,
    deltaDir: 'up',
    sub: 'attended 2 or more matches',
    tone: 'good',
  },
  {
    id: 'at-risk',
    label: 'At risk of dropping off',
    value: '203',
    icon: 'UserMinus',
    sub: 'first match < 60 days ago, no return yet',
    tone: 'warn',
  },
]

// Fanbase by gender — men attend the Women's Senior Team's games too, and the
// platform captures this. Illustrative split.
export const genderSplit = [
  { name: 'Female', value: 58, color: '#e87ba4' },
  { name: 'Male', value: 39, color: '#2a78d6' },
  { name: 'Undisclosed', value: 3, color: '#b9c0bb' },
]

export const secondaryKpis = [
  { label: 'Avg. engagement score', value: '62', suffix: '/100', delta: 3.0, deltaDir: 'up' },
  { label: 'Email open rate', value: '38.4', suffix: '%', delta: 2.1, deltaDir: 'up' },
  { label: 'Social followers', value: '31.5k', suffix: '', delta: 11.8, deltaDir: 'up' },
  { label: 'Lapsed fans', value: '3,400', suffix: '', delta: 4.4, deltaDir: 'down' },
  { label: 'Avg. spend / attendee', value: '£8.40', suffix: '', delta: 5.6, deltaDir: 'up' },
  { label: 'Net promoter score', value: '+48', suffix: '', delta: 6.0, deltaDir: 'up' },
]

// Monthly cross-platform engagement (12 months). Values are fan touchpoints
// (000s) — total ~170k/month, social-led, consistent with ~31.5k followers.
export const engagementTrend = [
  { month: 'Sep', app: 13, social: 38, email: 11, web: 17 },
  { month: 'Oct', app: 15, social: 41, email: 12, web: 18 },
  { month: 'Nov', app: 18, social: 45, email: 13, web: 20 },
  { month: 'Dec', app: 14, social: 36, email: 10, web: 15 },
  { month: 'Jan', app: 17, social: 43, email: 13, web: 19 },
  { month: 'Feb', app: 20, social: 49, email: 14, web: 22 },
  { month: 'Mar', app: 25, social: 58, email: 16, web: 27 },
  { month: 'Apr', app: 23, social: 53, email: 15, web: 25 },
  { month: 'May', app: 28, social: 64, email: 17, web: 30 },
  { month: 'Jun', app: 31, social: 72, email: 18, web: 33 },
  { month: 'Jul', app: 26, social: 60, email: 16, web: 28 },
  { month: 'Aug', app: 34, social: 79, email: 20, web: 37 },
]

// Fan base growth (unified profiles, 000s)
export const growthTrend = [
  { month: 'Sep', fans: 17.4, active: 6.1 },
  { month: 'Oct', fans: 17.9, active: 6.3 },
  { month: 'Nov', fans: 18.5, active: 6.6 },
  { month: 'Dec', fans: 19.0, active: 6.2 },
  { month: 'Jan', fans: 19.5, active: 6.8 },
  { month: 'Feb', fans: 19.9, active: 7.0 },
  { month: 'Mar', fans: 20.4, active: 7.2 },
  { month: 'Apr', fans: 20.7, active: 7.0 },
  { month: 'May', fans: 21.0, active: 7.2 },
  { month: 'Jun', fans: 21.2, active: 7.3 },
  { month: 'Jul', fans: 21.4, active: 7.1 },
  { month: 'Aug', fans: 21.5, active: 7.35 },
]

// Where engaged fans reach us (share of touchpoints)
export const channelMix = [
  { name: 'Social media', value: 46, color: 'var(--series-7)' },
  { name: 'Website', value: 21, color: 'var(--series-2)' },
  { name: 'Stadium app', value: 20, color: 'var(--series-6)' },
  { name: 'Email', value: 9, color: 'var(--series-4)' },
  { name: 'Ticketing', value: 4, color: 'var(--series-1)' },
]

// Fan location (Northern Ireland + reach) — sums to ~21,500 unified profiles.
export const fanGeography = [
  { area: 'Belfast', fans: 7200 },
  { area: 'Lisburn & Castlereagh', fans: 2270 },
  { area: 'Newtownabbey', fans: 1760 },
  { area: 'Ards & North Down', fans: 2050 },
  { area: 'Mid Ulster', fans: 1440 },
  { area: 'Derry & Strabane', fans: 1710 },
  { area: 'Armagh & Craigavon', fans: 1780 },
  { area: 'Rest of UK / ROI', fans: 2270 },
  { area: 'International', fans: 990 },
]
