import { CalendarClock, MapPin, TrendingUp, Zap } from 'lucide-react'
import { PageHeader, Card, Badge, StatTile } from '../components/ui.jsx'
import { BarsV, LineTrend } from '../components/charts.jsx'
import { SERIES, BRAND } from '../theme.js'
import { matches, nextMatch, attendanceTrend, engagementByResult } from '../data/matches.js'

const resultTone = { W: 'good', D: 'warn', L: 'crit' }
const resultLabel = { W: 'Win', D: 'Draw', L: 'Loss' }

export default function Matches() {
  const attData = attendanceTrend.map((m) => ({ x: m.label, attendance: m.attendance }))
  const engData = engagementByResult.map((e) => ({ x: e.result, engagement: e.engagement }))
  const ticketPct = Math.round((nextMatch.ticketsSold / nextMatch.capacity) * 100)

  return (
    <>
      <PageHeader
        title="Match-day & Opta Insights"
        subtitle="On-pitch performance data joined to fan behaviour — so you can see exactly how results, attendance, spend and engagement move together."
      />

      {/* Next fixture readiness */}
      <div className="grid cols-3">
        <Card title="Next fixture — fan readiness" className="span-2">
          <div className="flex between wrap gap-12" style={{ alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>Northern Ireland vs {nextMatch.opponent}</div>
              <div className="muted small" style={{ marginTop: 4 }}>{nextMatch.competition}</div>
              <div className="flex gap-12 wrap items-center" style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: 13 }}>
                <span className="flex items-center gap-8"><CalendarClock size={14} /> {nextMatch.date}</span>
                <span className="flex items-center gap-8"><MapPin size={14} /> {nextMatch.venue}</span>
              </div>
              <div className="chip-row" style={{ marginTop: 12 }}>
                {nextMatch.segmentsTargeted.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
              <div className="muted small" style={{ marginTop: 8 }}>Segments currently being targeted for this fixture</div>
            </div>
            <div style={{ minWidth: 180 }}>
              <div className="muted small">Tickets sold</div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {nextMatch.ticketsSold.toLocaleString()}
              </div>
              <div className="muted small">of {nextMatch.capacity.toLocaleString()} capacity · {ticketPct}%</div>
              <div className="bar-track" style={{ height: 12, marginTop: 10 }}>
                <span style={{ width: `${ticketPct}%`, background: BRAND[500] }} />
              </div>
              <div className="flex between mt-16">
                <div>
                  <div className="muted small">Forecast</div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{nextMatch.forecastAttendance.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="muted small">On sale</div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{nextMatch.onSaleDays} days</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Result ↔ engagement" subtitle="Avg. fan engagement index by result">
          <BarsV
            data={engData}
            keys={[{ key: 'engagement', label: 'Engagement index', color: SERIES[6] }]}
            height={180}
          />
          <div className="badge info" style={{ marginTop: 8 }}>
            <Zap size={13} /> Wins drive ~67% higher engagement than losses
          </div>
        </Card>
      </div>

      {/* Attendance trend */}
      <div className="grid cols-3 mt-16">
        <Card title="Home attendance trend" subtitle="Last five home fixtures" className="span-2">
          <LineTrend
            data={attData}
            keys={[{ key: 'attendance', label: 'Attendance', color: BRAND[600] }]}
            height={250}
          />
        </Card>
        <Card title="Why it matters" subtitle="The Opta connection">
          <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.55 }}>
            By joining Opta match data to ticketing, app and social, the platform reveals which fixtures,
            results and on-pitch moments actually move fan behaviour — turning performance data into
            commercial and engagement decisions.
          </p>
          <div className="divider" />
          <div className="flex items-center gap-8" style={{ color: 'var(--good-ink)', fontWeight: 700, fontSize: 13 }}>
            <TrendingUp size={16} /> +148% social spike on the last home win
          </div>
        </Card>
      </div>

      {/* Match log */}
      <div className="section-title">Match log</div>
      <Card bodyClass="tight">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Fixture</th>
                <th>Competition</th>
                <th>Result</th>
                <th className="num">xG</th>
                <th className="num">Poss.</th>
                <th className="num">Attendance</th>
                <th className="num">In-app spend</th>
                <th className="num">Social spike</th>
                <th className="num">New fans</th>
                <th className="num">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>
                    {m.home ? 'NI vs ' : 'Away vs '}{m.opponent}
                  </td>
                  <td className="muted small">{m.competition}</td>
                  <td>
                    <Badge tone={resultTone[m.result]}>{resultLabel[m.result]} {m.score}</Badge>
                  </td>
                  <td className="num">{m.xg}</td>
                  <td className="num">{m.possession}%</td>
                  <td className="num">{m.attendance ? m.attendance.toLocaleString() : '—'}</td>
                  <td className="num">{m.appSpend ? `£${(m.appSpend / 1000).toFixed(1)}k` : '—'}</td>
                  <td className="num" style={{ color: 'var(--good-ink)', fontWeight: 600 }}>+{m.socialSpike}%</td>
                  <td className="num">{m.newFans.toLocaleString()}</td>
                  <td className="num" style={{ fontWeight: 700 }}>{m.engagementIndex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
