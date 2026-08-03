// ---------------------------------------------------------------------------
// Data sources (connectors). These represent the disparate, currently-siloed
// systems the Fan Intelligence Platform consolidates for the IFA Women's
// Senior Team. Figures are illustrative prototype data.
// ---------------------------------------------------------------------------

export const sources = [
  {
    id: 'stadium-app',
    name: 'Stadium App',
    type: 'Match-day behaviour & spend',
    abbr: 'SA',
    color: '#0a7d3c',
    status: 'connected',
    records: 128400,
    recordLabel: 'in-app events',
    lastSync: '4 min ago',
    frequency: 'Real-time stream',
    owner: 'Fan Experience',
    fields: ['Concourse spend', 'Seat / zone', 'Check-in time', 'Push opens', 'Poll & quiz entries', 'Wallet top-ups'],
    health: 99.2,
    blurb:
      'The official match-day app. Tracks concourse spend, seat location, arrival time, and in-app engagement (polls, predictions, replays) for supporters attending games at the National Football Stadium.',
  },
  {
    id: 'ticketmaster',
    name: 'Ticketmaster',
    type: 'Ticketing & attendance',
    abbr: 'TM',
    color: '#026cdf',
    status: 'connected',
    records: 63120,
    recordLabel: 'ticket transactions',
    lastSync: '11 min ago',
    frequency: 'Hourly',
    owner: 'Commercial',
    fields: ['Purchase history', 'Ticket type', 'Price tier', 'Group size', 'Renewal status', 'Resale activity'],
    health: 98.0,
    blurb:
      'Primary ticketing partner. Provides purchase history, ticket tiers, group bookings and season-ticket renewal status — the backbone of attendance and lifecycle analysis.',
  },
  {
    id: 'opta',
    name: 'Opta',
    type: 'Match & performance data',
    abbr: 'OP',
    color: '#e34948',
    status: 'connected',
    records: 41,
    recordLabel: 'matches indexed',
    lastSync: '2 hr ago',
    frequency: 'Per fixture',
    owner: 'Football / Analytics',
    fields: ['Result & score', 'xG', 'Attendance', 'Possession', 'Key moments', 'Player events'],
    health: 100,
    blurb:
      'On-pitch performance data. Used to correlate results and on-pitch moments with fan engagement spikes, attendance and content performance around fixtures.',
  },
  {
    id: 'social',
    name: 'Social Media',
    type: 'Instagram · TikTok · X · Facebook',
    abbr: 'SO',
    color: '#4a3aa7',
    status: 'connected',
    records: 894000,
    recordLabel: 'engagements',
    lastSync: '18 min ago',
    frequency: 'Every 15 min',
    owner: 'Marketing & Content',
    fields: ['Followers', 'Reach & impressions', 'Engagement rate', 'Post performance', 'Sentiment', 'Audience demographics'],
    health: 96.5,
    blurb:
      'Aggregated organic and paid social across Instagram, TikTok, X and Facebook. Powers reach, engagement and sentiment tracking, and links anonymous social audiences to known fans where consent allows.',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    type: 'Email marketing & CRM',
    abbr: 'MC',
    color: '#eda100',
    status: 'connected',
    records: 39760,
    recordLabel: 'subscribers',
    lastSync: '26 min ago',
    frequency: 'Every 30 min',
    owner: 'Marketing & Content',
    fields: ['Subscriber status', 'Open & click rate', 'Campaign history', 'Tags & interests', 'Automation journey', 'Unsubscribes'],
    health: 97.8,
    blurb:
      'Email marketing platform. Consolidates subscriber lists, campaign engagement and automation journeys, unifying email identity with ticketing and app profiles.',
  },
  {
    id: 'winners',
    name: 'Winners (Tableau)',
    type: 'Operational dashboards',
    abbr: 'WN',
    color: '#1baf7a',
    status: 'connected',
    records: 22,
    recordLabel: 'dashboards',
    lastSync: '1 hr ago',
    frequency: 'Daily',
    owner: 'Operations',
    fields: ['Operational KPIs', 'Stewarding & safety', 'F&B stock', 'Retail sales', 'Car parking', 'Historic benchmarks'],
    health: 94.1,
    blurb:
      'Existing Tableau dashboards maintained by Winners covering operational and commercial data. Extracts are pulled into the platform so operational context sits alongside fan behaviour.',
  },
  {
    id: 'web-crm',
    name: 'Web & Fan Accounts',
    type: 'Registrations & preferences',
    abbr: 'WB',
    color: '#eb6834',
    status: 'syncing',
    records: 47210,
    recordLabel: 'fan accounts',
    lastSync: 'in progress',
    frequency: 'Real-time stream',
    owner: 'Digital',
    fields: ['Account profile', 'Consent & preferences', 'Web behaviour', 'Merch browsing', 'Newsletter sign-up', 'Location'],
    health: 92.4,
    blurb:
      'irishfa.com fan accounts and preference centre. Captures self-declared preferences, consent, and web behaviour — the identity spine that links the other sources into a single fan record.',
  },
]

// A quick-reference map for colouring source badges elsewhere.
export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]))

export const integrationSummary = {
  connected: sources.filter((s) => s.status === 'connected').length,
  total: sources.length,
  recordsUnified: 1.34, // millions
  identitiesResolved: 48420,
  matchRate: 78, // % of records matched to a unified fan ID
}
