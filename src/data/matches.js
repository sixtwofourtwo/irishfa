// ---------------------------------------------------------------------------
// Match-day / Opta insights — on-pitch data correlated with fan engagement.
// IFA Women's Senior Team fixtures (illustrative).
// ---------------------------------------------------------------------------

export const matches = [
  {
    id: 1,
    opponent: 'Republic of Ireland',
    competition: 'Nations League',
    date: '9 days ago',
    home: true,
    result: 'W',
    score: '2–1',
    xg: 1.8,
    xgAgainst: 1.2,
    possession: 54,
    attendance: 15340,
    capacity: 18500,
    appSpend: 61200,
    socialSpike: 148,
    newFans: 1240,
    engagementIndex: 92,
  },
  {
    id: 2,
    opponent: 'Slovenia',
    competition: 'Nations League',
    date: '5 weeks ago',
    home: true,
    result: 'D',
    score: '1–1',
    xg: 1.4,
    xgAgainst: 1.5,
    possession: 49,
    attendance: 13980,
    capacity: 18500,
    appSpend: 52400,
    socialSpike: 96,
    newFans: 810,
    engagementIndex: 78,
  },
  {
    id: 3,
    opponent: 'Wales',
    competition: 'Friendly',
    date: '2 months ago',
    home: true,
    result: 'W',
    score: '3–0',
    xg: 2.6,
    xgAgainst: 0.7,
    possession: 61,
    attendance: 14620,
    capacity: 18500,
    appSpend: 58600,
    socialSpike: 132,
    newFans: 1080,
    engagementIndex: 88,
  },
  {
    id: 4,
    opponent: 'Austria',
    competition: 'Euro Qualifier',
    date: '3 months ago',
    home: false,
    result: 'L',
    score: '0–2',
    xg: 0.6,
    xgAgainst: 2.1,
    possession: 42,
    attendance: 0,
    capacity: 0,
    appSpend: 0,
    socialSpike: 64,
    newFans: 340,
    engagementIndex: 54,
  },
  {
    id: 5,
    opponent: 'Norway',
    competition: 'Euro Qualifier',
    date: '4 months ago',
    home: true,
    result: 'D',
    score: '2–2',
    xg: 1.9,
    xgAgainst: 1.8,
    possession: 47,
    attendance: 13120,
    capacity: 18500,
    appSpend: 49800,
    socialSpike: 112,
    newFans: 720,
    engagementIndex: 74,
  },
]

// Upcoming fixture with pre-match fan readiness
export const nextMatch = {
  opponent: 'Slovenia',
  competition: 'Nations League',
  date: 'Sat 12 Sep, 19:45',
  venue: 'National Football Stadium, Belfast',
  ticketsSold: 11840,
  capacity: 18500,
  onSaleDays: 18,
  forecastAttendance: 15600,
  segmentsTargeted: ['Committed regulars', 'Lapsed supporters', 'Newly acquired'],
}

// Correlation view: engagement vs result (for scatter/insight)
export const engagementByResult = [
  { result: 'Win', engagement: 90, matches: 2 },
  { result: 'Draw', engagement: 75, matches: 2 },
  { result: 'Loss', engagement: 54, matches: 1 },
]

// Attendance trend across the last fixtures (home only)
export const attendanceTrend = matches
  .filter((m) => m.home)
  .slice()
  .reverse()
  .map((m) => ({ label: m.opponent.split(' ')[0], attendance: m.attendance, forecast: null }))
