import { Plus } from 'lucide-react'
import { PageHeader, Card, Badge, StatTile, BarList } from '../components/ui.jsx'
import { BarsV, Funnel } from '../components/charts.jsx'
import { SERIES } from '../theme.js'
import { campaigns, platformPerformance, contentTypes, emailFunnel } from '../data/campaigns.js'

const statusTone = { live: 'good', completed: 'gray', scheduled: 'info' }
const statusLabel = { live: 'Live', completed: 'Completed', scheduled: 'Scheduled' }

export default function Campaigns() {
  const live = campaigns.filter((c) => c.status === 'live')
  const totalReach = campaigns.reduce((a, c) => a + c.reach, 0)
  const totalConv = campaigns.reduce((a, c) => a + c.conversions, 0)
  const totalRev = campaigns.reduce((a, c) => a + c.revenue, 0)

  const platData = platformPerformance.map((p) => ({ x: p.platform, reach: p.reach }))

  return (
    <>
      <PageHeader
        title="Campaigns & Content"
        subtitle="Plan, run and measure personalised activity across every platform — email, social, app and web — from one place, with performance tied back to real fan segments."
      >
        <button className="btn primary sm"><Plus size={15} /> New campaign</button>
      </PageHeader>

      <div className="grid cols-4">
        <StatTile label="Live campaigns" value={live.length} icon="Megaphone" sub="across 4 channels" />
        <StatTile label="Total reach" value={fmtK(totalReach)} icon="Radio" sub="this season" />
        <StatTile label="Conversions" value={totalConv.toLocaleString()} icon="MousePointerClick" sub="tickets, members, sales" />
        <StatTile label="Attributed revenue" value={`£${(totalRev / 1000).toFixed(0)}k`} icon="PoundSterling" sub="campaign-driven" />
      </div>

      <div className="grid cols-3 mt-16">
        <Card title="Reach by platform" subtitle="Impressions this season (000s / m)" className="span-2">
          <BarsV
            data={platData}
            keys={[{ key: 'reach', label: 'Reach', color: SERIES[7] }]}
            height={260}
          />
        </Card>
        <Card title="Email funnel" subtitle="Latest major send">
          <Funnel data={emailFunnel} />
        </Card>
      </div>

      <div className="grid cols-1 mt-16">
        <Card title="All campaigns" subtitle="Cross-platform activity with segment targeting" bodyClass="tight">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Channel</th>
                  <th>Target segment</th>
                  <th>Status</th>
                  <th className="num">Reach</th>
                  <th className="num">Engagement</th>
                  <th className="num">Conversions</th>
                  <th className="num">Revenue</th>
                  <th className="num">ROI</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, maxWidth: 240 }}>{c.name}</td>
                    <td className="muted small">{c.channel}</td>
                    <td className="muted small">{c.audience}</td>
                    <td><Badge tone={statusTone[c.status]}>{statusLabel[c.status]}</Badge></td>
                    <td className="num">{c.reach ? c.reach.toLocaleString() : '—'}</td>
                    <td className="num">{c.engagement ? `${c.engagement}%` : '—'}</td>
                    <td className="num">{c.conversions ? c.conversions.toLocaleString() : '—'}</td>
                    <td className="num">{c.revenue ? `£${(c.revenue / 1000).toFixed(0)}k` : '—'}</td>
                    <td className="num" style={{ fontWeight: 700, color: c.roi ? 'var(--good-ink)' : 'var(--ink-3)' }}>
                      {c.roi ? `${c.roi}×` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid cols-2 mt-16">
        <Card title="What content works" subtitle="Average engagement rate by content type">
          <BarList
            items={contentTypes.map((c) => ({ label: c.type, value: c.value, display: `${c.value}%` }))}
          />
        </Card>
        <Card title="Personalisation in action" subtitle="How the platform tailors delivery">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PersonalItem
              title="Right segment, right offer"
              body="Win-back discounts go only to lapsed supporters; season-ticket prompts only to high-attendance regulars — no wasted sends."
            />
            <PersonalItem
              title="Right channel"
              body="Digital-first fans are reached on TikTok and Instagram; committed regulars via email and app push, matching their proven behaviour."
            />
            <PersonalItem
              title="Right moment"
              body="Acquisition campaigns auto-trigger during match-day social spikes, when conversion is 3.1× higher."
            />
          </ul>
        </Card>
      </div>
    </>
  )
}

function PersonalItem({ title, body }) {
  return (
    <li style={{ borderLeft: '3px solid var(--brand-500)', paddingLeft: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{title}</div>
      <div className="small" style={{ color: 'var(--ink-2)', marginTop: 3, lineHeight: 1.5 }}>{body}</div>
    </li>
  )
}

function fmtK(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}m`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`
  return String(n)
}
