import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles, Database, RefreshCw, Repeat, UserMinus, Target } from 'lucide-react'
import { PageHeader, StatTile, Card, Delta, BarList, Legend, StatusPill } from '../components/ui.jsx'
import { StackedArea, AreaTrend, Donut } from '../components/charts.jsx'
import { SERIES } from '../theme.js'
import {
  kpis, secondaryKpis, retentionMetrics, genderSplit,
  engagementTrend, growthTrend, channelMix, fanGeography,
} from '../data/overview.js'
import { integrationSummary } from '../data/sources.js'
import { alerts } from '../data/alerts.js'

const engKeys = [
  { key: 'social', label: 'Social', color: SERIES[7] },
  { key: 'app', label: 'Stadium app', color: SERIES[6] },
  { key: 'web', label: 'Website', color: SERIES[2] },
  { key: 'email', label: 'Email', color: SERIES[4] },
]

export default function Dashboard() {
  const engData = engagementTrend.map((d) => ({ x: d.month, ...d }))
  const growthData = growthTrend.map((d) => ({ x: d.month, fans: d.fans }))
  const geo = [...fanGeography].sort((a, b) => b.fans - a.fans)
  const topAlerts = alerts.slice(0, 3)

  return (
    <>
      <PageHeader
        title="Fanbase Overview"
        subtitle="A single, consolidated view of supporter data for the IFA Women's Senior Team — unifying the stadium app, ticketing, Opta, social, email and operational systems."
      >
        <span className="badge info" title="Data sources connected">
          <Database size={13} /> {integrationSummary.connected}/{integrationSummary.total} sources connected
        </span>
        <span className="badge gray">
          <RefreshCw size={13} /> Synced 4 min ago
        </span>
      </PageHeader>

      {/* Headline KPIs */}
      <div className="grid cols-4">
        {kpis.map((k) => (
          <StatTile key={k.id} {...k} />
        ))}
      </div>

      {/* Retention band — the second-match challenge (primary focus) */}
      <div className="section-title">Retention — the second-match challenge</div>
      <div className="grid cols-3">
        {retentionMetrics.map((m) => (
          <RetentionTile key={m.id} {...m} />
        ))}
        <Card>
          <div className="flex gap-12" style={{ alignItems: 'flex-start' }}>
            <span className="stat__icon" style={{ background: 'var(--brand-050)', color: 'var(--brand-600)', width: 34, height: 34 }}>
              <Target size={18} />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Focus: bring first-time fans back for match #2</div>
              <p className="small" style={{ color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>
                First-time attendees who return for a second match are far more likely to become
                regulars. Act on the 203 at-risk fans before the 60-day window closes.
              </p>
              <Link to="/fans?status=At+risk" className="btn primary sm" style={{ marginTop: 10 }}>
                View at-risk fans <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid cols-3 mt-16">
        <Card
          title="Cross-platform engagement"
          subtitle="Monthly fan touchpoints by channel (000s)"
          className="span-2"
          action={<Legend items={engKeys.map((k) => ({ label: k.label, color: k.color }))} />}
        >
          <StackedArea data={engData} keys={engKeys} height={288} />
        </Card>

        <Card title="Where fans reach us" subtitle="Share of all touchpoints">
          <Donut data={channelMix} centerValue="170k" centerLabel="touchpoints / mo" />
          <div className="mt-16">
            <Legend items={channelMix.map((c) => ({ label: `${c.name} · ${c.value}%`, color: c.color }))} />
          </div>
        </Card>
      </div>

      {/* Secondary metrics */}
      <div className="section-title">Key indicators</div>
      <div className="grid cols-3">
        {secondaryKpis.map((m) => (
          <div className="card" key={m.label}>
            <div className="card__body flex between items-center">
              <div>
                <div className="muted small">{m.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, letterSpacing: '-0.01em' }}>
                  {m.value}
                  {m.suffix && <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>{m.suffix}</span>}
                </div>
              </div>
              <Delta value={m.delta} dir={m.deltaDir} />
            </div>
          </div>
        ))}
      </div>

      {/* Growth + geography + insights */}
      <div className="grid cols-3 mt-16">
        <Card title="Fan base growth" subtitle="Unified profiles (000s)" className="span-2">
          <AreaTrend data={growthData} dataKey="fans" name="Unified fans (000s)" height={250} />
        </Card>

        <Card
          title="Priority insights"
          subtitle="Auto-surfaced by the platform"
          action={
            <Link to="/alerts" className="btn sm">
              View all <ArrowUpRight size={14} />
            </Link>
          }
          bodyClass="tight"
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {topAlerts.map((a) => (
              <div key={a.id} style={{ padding: '11px 8px', borderBottom: '1px solid var(--line-soft)' }}>
                <div style={{ marginBottom: 6 }}>
                  <StatusPill level={a.level}>
                    {a.level === 'good' ? 'Opportunity' : a.level === 'crit' ? 'Action needed' : a.level === 'warn' ? 'Watch' : 'Info'}
                  </StatusPill>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{a.title}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid cols-3 mt-16">
        <Card title="Fans by location" subtitle="Northern Ireland councils + wider reach">
          <BarList
            items={geo.map((g) => ({ label: g.area, value: g.fans }))}
            unit=""
          />
        </Card>

        <Card title="Fanbase by gender" subtitle="Men attend the women's team too">
          <Donut data={genderSplit} centerValue="21.5k" centerLabel="fans" suffix="%" height={220} />
          <div className="mt-16">
            <Legend items={genderSplit.map((g) => ({ label: `${g.name} · ${g.value}%`, color: g.color }))} />
          </div>
        </Card>

        <Card title="The consolidation story" subtitle="What this platform replaces">
          <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.55 }}>
            Before the Fan Intelligence Platform, this data lived in seven disconnected systems — no single
            view of a supporter existed. The platform resolves <strong>{integrationSummary.identitiesResolved.toLocaleString()}</strong>{' '}
            unified fan identities from <strong>{integrationSummary.recordsUnified}m</strong> records, with a{' '}
            <strong>{integrationSummary.matchRate}%</strong> match rate across sources.
          </p>
          <div className="divider" />
          <div className="grid cols-3" style={{ gap: 12 }}>
            <Metric value="7" label="sources unified" />
            <Metric value="21.5k" label="fan profiles" />
            <Metric value="78%" label="identity match" />
          </div>
          <div className="mt-16">
            <Link to="/sources" className="btn primary sm">
              <Sparkles size={14} /> Explore data sources
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}

function Metric({ value, label }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand-700)' }}>{value}</div>
      <div className="muted small">{label}</div>
    </div>
  )
}

// A retention stat tile with an accent colour keyed to its tone (good / warn).
function RetentionTile({ label, value, icon, delta, deltaDir, sub, tone }) {
  const Icon = icon === 'Repeat' ? Repeat : UserMinus
  const accent = tone === 'warn' ? 'var(--warning)' : 'var(--good)'
  const wash = tone === 'warn' ? '#fdf3e0' : '#e6f6e6'
  return (
    <div className="stat" style={{ borderLeft: `3px solid ${accent}` }}>
      <div className="stat__label">
        <span className="stat__icon" style={{ background: wash, color: accent }}>
          <Icon size={17} />
        </span>
        {label}
      </div>
      <div className="stat__value">{value}</div>
      <div className="stat__meta">
        {typeof delta === 'number' ? (
          <Delta value={delta} dir={deltaDir} />
        ) : (
          <span className="badge warn"><UserMinus size={12} /> Act within 60 days</span>
        )}
        {sub && <span className="stat__sub">{sub}</span>}
      </div>
    </div>
  )
}
