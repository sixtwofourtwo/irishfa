import { useState } from 'react'
import { Users, ArrowUpRight } from 'lucide-react'
import { PageHeader, Card, Delta, Legend } from '../components/ui.jsx'
import { BarsV, Donut } from '../components/charts.jsx'
import { SERIES } from '../theme.js'
import { segments, segmentTrend } from '../data/segments.js'

const trendKeys = [
  { key: 'Superfans', label: 'Superfans', color: SERIES[6] },
  { key: 'Committed regulars', label: 'Committed regulars', color: SERIES[1] },
  { key: 'Family & juniors', label: 'Family & juniors', color: SERIES[3] },
  { key: 'Digital-first', label: 'Digital-first', color: SERIES[7] },
  { key: 'Lapsed', label: 'Lapsed', color: SERIES[4] },
  { key: 'New', label: 'New', color: SERIES[2] },
]

export default function Segments() {
  const [active, setActive] = useState(segments[0].id)
  const sel = segments.find((s) => s.id === active)
  const trendData = segmentTrend.map((d) => ({ x: d.month, ...d }))
  const donut = segments.map((s) => ({ name: s.name, value: s.size, color: cssToHex(s.color) }))

  const channels = [
    { label: 'Stadium app', v: sel.channels.app },
    { label: 'Social', v: sel.channels.social },
    { label: 'Email', v: sel.channels.email },
    { label: 'Ticketing', v: sel.channels.ticketing },
  ]

  return (
    <>
      <PageHeader
        title="Segmentation & Audiences"
        subtitle="Behavioural segments derived automatically from the unified fan record — the foundation for personalised, cross-platform targeting."
      />

      {/* Segment cards */}
      <div className="grid cols-3">
        {segments.map((s) => (
          <button
            key={s.id}
            className="card"
            onClick={() => setActive(s.id)}
            style={{
              textAlign: 'left', cursor: 'pointer', padding: 0,
              outline: active === s.id ? '2px solid var(--brand-500)' : 'none',
            }}
          >
            <div className="card__body">
              <div className="flex between items-center">
                <span className="flex items-center gap-8" style={{ fontWeight: 700, fontSize: 14.5 }}>
                  <span style={{ width: 11, height: 11, borderRadius: 3, background: cssToHex(s.color) }} />
                  {s.name}
                </span>
                <Delta value={s.trend} dir={s.trendDir} />
              </div>
              <div className="flex between items-baseline mt-16">
                <div>
                  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {s.size.toLocaleString()}
                  </div>
                  <div className="muted small">{s.share}% of fan base</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>£{s.avgValue}</div>
                  <div className="muted small">avg. value</div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Trend + composition */}
      <div className="grid cols-3 mt-16">
        <Card
          title="Segment composition over the season"
          subtitle="Fans per segment (stacked)"
          className="span-2"
          action={<Legend items={trendKeys.map((k) => ({ label: k.label, color: k.color }))} />}
        >
          <BarsV data={trendData} keys={trendKeys} stacked height={300} />
        </Card>

        <Card title="Fan base split" subtitle="Current segment mix">
          <Donut data={donut} centerValue="48.4k" centerLabel="total fans" suffix="" />
        </Card>
      </div>

      {/* Selected segment detail */}
      <div className="section-title">Segment detail — {sel.name}</div>
      <div className="grid cols-3">
        <Card className="span-2">
          <div className="flex items-center gap-8" style={{ marginBottom: 10 }}>
            <span style={{ width: 13, height: 13, borderRadius: 4, background: cssToHex(sel.color) }} />
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>{sel.name}</h3>
            <span className="badge gray">{sel.size.toLocaleString()} fans</span>
            <Delta value={sel.trend} dir={sel.trendDir} />
          </div>
          <p style={{ color: 'var(--ink-2)', fontSize: 13.5, lineHeight: 1.55 }}>{sel.description}</p>

          <div className="divider" />
          <div className="muted small" style={{ fontWeight: 700, marginBottom: 10 }}>DEFINING TRAITS</div>
          <div className="chip-row">
            {sel.traits.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-24">
            <button className="btn primary sm">
              <Users size={14} /> Build audience for campaign <ArrowUpRight size={14} />
            </button>
          </div>
        </Card>

        <Card title="Channel penetration" subtitle="How this segment engages">
          <div className="bar-list">
            {channels.map((c) => (
              <div className="bar-row" key={c.label}>
                <span className="bl-label">{c.label}</span>
                <span className="bar-track">
                  <span style={{ width: `${c.v}%`, background: cssToHex(sel.color) }} />
                </span>
                <span className="bl-val">{c.v}%</span>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="flex between">
            <div>
              <div className="muted small">Avg. engagement</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{sel.engagement}/100</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="muted small">Avg. lifetime value</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>£{sel.avgValue}</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

// Segment colours are stored as CSS var references; map to hex for inline SVG/legends.
function cssToHex(v) {
  const map = {
    'var(--series-1)': SERIES[1], 'var(--series-2)': SERIES[2], 'var(--series-3)': SERIES[3],
    'var(--series-4)': SERIES[4], 'var(--series-5)': SERIES[5], 'var(--series-6)': SERIES[6],
    'var(--series-7)': SERIES[7], 'var(--series-8)': SERIES[8],
  }
  return map[v] || v
}
