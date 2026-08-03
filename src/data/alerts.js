// ---------------------------------------------------------------------------
// Alerts & insights — automatically surfaced, actionable intelligence that the
// platform generates by joining data across sources.
// ---------------------------------------------------------------------------

export const alerts = [
  {
    id: 1,
    level: 'good',
    icon: 'TrendingUp',
    title: 'Digital-first segment up 18.9% this quarter',
    body: '12,980 fans now engage primarily on social without attending. This is your fastest-growing and most under-monetised audience — a prime target for streaming and merch conversion.',
    source: 'Social · Web',
    action: 'Build conversion campaign',
    when: '2 hours ago',
  },
  {
    id: 2,
    level: 'warn',
    icon: 'UserMinus',
    title: '1,240 committed regulars trending toward lapsed',
    body: 'These fans attended 4+ games last season but have no ticket, email open, or app activity in 90 days. Historically, win-back within 30 days is 3× more effective than after they fully lapse.',
    source: 'Ticketmaster · Mailchimp · Stadium App',
    action: 'Trigger retention journey',
    when: '5 hours ago',
  },
  {
    id: 3,
    level: 'good',
    icon: 'Zap',
    title: 'Match-day social spike converts 3.1× better',
    body: 'Fans acquired during the +148% social spike around the Republic of Ireland win show 3.1× higher 30-day conversion than baseline. Capture windows are your highest-yield acquisition moments.',
    source: 'Opta · Social · Ticketmaster',
    action: 'Pre-plan next fixture capture',
    when: '1 day ago',
  },
  {
    id: 4,
    level: 'info',
    icon: 'PiggyBank',
    title: 'Concourse cashless push lifted spend 12%',
    body: 'Average spend per attendee rose to £23.10 (+£2.40) since the in-app cashless campaign. Family & junior segment drove most of the F&B uplift.',
    source: 'Stadium App · Winners',
    action: 'View revenue breakdown',
    when: '1 day ago',
  },
  {
    id: 5,
    level: 'crit',
    icon: 'AlertTriangle',
    title: '9,420 profiles missing marketing consent',
    body: '19% of unified profiles cannot be contacted for marketing. A preference-centre re-permission prompt at next ticket purchase could recover an estimated 3,100 addressable fans.',
    source: 'Web & Fan Accounts · Mailchimp',
    action: 'Launch re-permission flow',
    when: '2 days ago',
  },
  {
    id: 6,
    level: 'good',
    icon: 'Trophy',
    title: 'Season ticket renewals hit 74% (best on record)',
    body: 'Renewal campaign closed at 6,840 renewals — up 9pts year on year. Superfans renewed at 96%. Personalised, segment-timed reminders drove the uplift.',
    source: 'Ticketmaster · Mailchimp',
    action: 'Review campaign',
    when: '3 days ago',
  },
  {
    id: 7,
    level: 'warn',
    icon: 'MapPin',
    title: 'Under-served fan cluster: Mid & West Ulster',
    body: 'Engagement per capita in Derry, Strabane and Mid Ulster is 34% below the Belfast baseline despite strong social following. A regional watch-party or travel offer could unlock attendance.',
    source: 'Web · Social · Ticketmaster',
    action: 'Explore geography',
    when: '4 days ago',
  },
]

export const alertCounts = {
  total: alerts.length,
  critical: alerts.filter((a) => a.level === 'crit').length,
  opportunities: alerts.filter((a) => a.level === 'good').length,
}
