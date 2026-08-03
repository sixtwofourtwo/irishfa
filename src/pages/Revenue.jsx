import { PageHeader, Card, StatTile, Delta, Legend, BarList } from '../components/ui.jsx'
import { BarsV, Donut } from '../components/charts.jsx'
import { SERIES } from '../theme.js'
import {
  revenueKpis, revenueByStream, revenueTrend, revenueBySegment, spendCategories,
} from '../data/revenue.js'

const trendKeys = [
  { key: 'ticketing', label: 'Ticketing', color: SERIES[1] },
  { key: 'retail', label: 'Retail', color: SERIES[2] },
  { key: 'fnb', label: 'Food & bev.', color: SERIES[3] },
  { key: 'other', label: 'Other', color: SERIES[7] },
]

export default function Revenue() {
  const trendData = revenueTrend.map((d) => ({ x: d.month, ...d }))
  const stream = revenueByStream.map((s) => ({ name: s.name, value: s.value, color: cssToHex(s.color) }))
  const totalRev = revenueByStream.reduce((a, s) => a + s.value, 0)

  return (
    <>
      <PageHeader
        title="Revenue & Monetisation"
        subtitle="The commercial picture across every fan revenue stream — ticketing, retail, food & beverage, memberships and hospitality — unified and attributable to segments."
      />

      <div className="grid cols-4">
        {revenueKpis.map((k) => (
          <StatTile key={k.label} label={k.label} value={k.value} delta={k.delta} deltaDir={k.deltaDir}
            icon={k.label.includes('per fan') ? 'UserCheck' : k.label.includes('attendee') ? 'ShoppingCart' : k.label.includes('lifetime') ? 'Gem' : 'PoundSterling'} />
        ))}
      </div>

      <div className="grid cols-3 mt-16">
        <Card
          title="Revenue by month"
          subtitle="By stream (£000s)"
          className="span-2"
          action={<Legend items={trendKeys.map((k) => ({ label: k.label, color: k.color }))} />}
        >
          <BarsV data={trendData} keys={trendKeys} stacked height={290} />
        </Card>

        <Card title="Revenue mix" subtitle="Season to date">
          <Donut data={stream} centerValue={`£${(totalRev / 1000).toFixed(2)}m`} centerLabel="total" suffix="k" />
          <div className="mt-16">
            <Legend items={stream.map((s) => ({ label: `${s.name} · £${s.value}k`, color: s.color }))} />
          </div>
        </Card>
      </div>

      <div className="grid cols-3 mt-16">
        <Card title="Revenue by segment" subtitle="Total & per-fan value" className="span-2" bodyClass="tight">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Segment</th>
                  <th className="num">Total revenue</th>
                  <th className="num">Per fan</th>
                  <th>Share of total</th>
                </tr>
              </thead>
              <tbody>
                {revenueBySegment.map((s) => {
                  const total = revenueBySegment.reduce((a, x) => a + x.total, 0)
                  const pct = Math.round((s.total / total) * 100)
                  return (
                    <tr key={s.segment}>
                      <td>
                        <span className="flex items-center gap-8" style={{ fontWeight: 600 }}>
                          <span style={{ width: 10, height: 10, borderRadius: 3, background: cssToHex(s.color) }} />
                          {s.segment}
                        </span>
                      </td>
                      <td className="num" style={{ fontWeight: 700 }}>£{s.total}k</td>
                      <td className="num">£{s.perFan}</td>
                      <td style={{ minWidth: 160 }}>
                        <div className="flex items-center gap-8">
                          <span className="meter" style={{ flex: 1 }}>
                            <span style={{ width: `${pct}%`, background: cssToHex(s.color) }} />
                          </span>
                          <span className="muted small" style={{ width: 34, textAlign: 'right' }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="In-app & concourse spend" subtitle="Share by category">
          <BarList items={spendCategories.map((c) => ({ label: c.name, value: c.value, display: `${c.value}%` }))} />
          <div className="divider" />
          <div className="flex between items-center">
            <span className="muted small">Avg. spend / attendee</span>
            <span className="flex items-center gap-8" style={{ fontWeight: 800, fontSize: 18 }}>
              £23.10 <Delta value={5.6} dir="up" />
            </span>
          </div>
        </Card>
      </div>

      <div className="grid cols-1 mt-16">
        <Card title="The monetisation opportunity" subtitle="Where consolidated data unlocks revenue">
          <div className="grid cols-3" style={{ gap: 18 }}>
            <Opportunity
              value="£273k → £600k+"
              label="Digital-first upside"
              body="26.8% of fans are digital-first but generate just 10% of revenue. Converting even a fraction to attendance or streaming is the single biggest opportunity."
            />
            <Opportunity
              value="+£2.40"
              label="Spend per attendee, cashless"
              body="The in-app cashless push already lifted average concourse spend 12%. Targeted offers by segment can extend this further."
            />
            <Opportunity
              value="3,100"
              label="Addressable fans recoverable"
              body="A re-permission flow at ticket purchase could re-open marketing to thousands of currently un-contactable fans."
            />
          </div>
        </Card>
      </div>
    </>
  )
}

function Opportunity({ value, label, body }) {
  return (
    <div style={{ borderLeft: '3px solid var(--brand-500)', paddingLeft: 14 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand-700)' }}>{value}</div>
      <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{label}</div>
      <div className="small" style={{ color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>{body}</div>
    </div>
  )
}

function cssToHex(v) {
  const map = {
    'var(--series-1)': SERIES[1], 'var(--series-2)': SERIES[2], 'var(--series-3)': SERIES[3],
    'var(--series-4)': SERIES[4], 'var(--series-5)': SERIES[5], 'var(--series-6)': SERIES[6],
    'var(--series-7)': SERIES[7], 'var(--series-8)': SERIES[8],
  }
  return map[v] || v
}
