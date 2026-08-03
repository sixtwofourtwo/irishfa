// Central navigation config — used by the sidebar, topbar and routing.
import { alertCounts } from './data/alerts.js'

export const nav = [
  {
    section: 'Overview',
    items: [
      { to: '/', label: 'Executive Dashboard', icon: 'LayoutDashboard', end: true },
      { to: '/alerts', label: 'Alerts & Insights', icon: 'Bell', badge: alertCounts.total },
    ],
  },
  {
    section: 'Fans',
    items: [
      { to: '/fans', label: 'Fan 360 Profiles', icon: 'Users' },
      { to: '/segments', label: 'Segmentation', icon: 'PieChart' },
    ],
  },
  {
    section: 'Engagement',
    items: [
      { to: '/campaigns', label: 'Campaigns & Content', icon: 'Megaphone' },
      { to: '/matches', label: 'Match-day / Opta', icon: 'Trophy' },
      { to: '/revenue', label: 'Revenue & Monetisation', icon: 'PoundSterling' },
    ],
  },
  {
    section: 'Platform',
    items: [{ to: '/sources', label: 'Data Sources', icon: 'Database' }],
  },
]

// Flat lookup of route -> page title (for the topbar).
export const titleByPath = {}
nav.forEach((s) => s.items.forEach((i) => { titleByPath[i.to] = i.label }))
