import { useState, useMemo } from 'react'
import { MapPin, TrendingUp, Trophy, Database, Zap } from 'lucide-react'
import { PageHeader, Card, Badge, StatTile, Legend } from '../components/ui.jsx'
import { LineTrend, BarsV } from '../components/charts.jsx'
import { SERIES, BRAND } from '../theme.js'
import { matchHistory } from '../data/matchHistory.js'
import {
  record, seasons, homeAttBySeason, homeVenues, distinctHomeGrounds,
  biggestCrowds, recentForm, attByResult,
} from '../data/matchStats.js'

const resultTone = { W: 'good', D: 'warn', L: 'crit' }
const resultLabel = { W: 'W', D: 'D', L: 'L' }

export default function Matches() {
  const [season, setSeason] = useState('all')
  const [side, setSide] = useState('all')

  const fixtures = useMemo(() => {
    return matchHistory
      .filter((m) => (season === 'all' || m.season === season) && (side === 'all' || (side === 'home' ? m.home : !m.home)))
      .slice()
      .reverse()
  }, [season, side])

  const attData = homeAttBySeason.map((s) => ({ x: s.season, avg: s.avg, peak: s.max }))
  const attKeys = [
    { key: 'peak', label: 'Season best (single game)', color: SERIES[1] },
    { key: 'avg', label: 'Season average', color: BRAND[600] },
  ]
  const resultData = attByResult.map((r) => ({ x: r.result, avg: r.avg }))

  return (
    <>
      <PageHeader
        title="Match-day & Attendance"
        subtitle="Real fixture, result and attendance records for the Northern Ireland Women's Senior Team (2017–2026), joined with match context. The women's team plays home fixtures across a rotating set of grounds — venue context matters."
      >
        <Badge tone="info"><Database size={13} /> Real IFA data · {record.played} fixtures</Badge>
      </PageHeader>

      {/* Record KPIs (all real) */}
      <div className="grid cols-4">
        <StatTile label="Played" value={record.played} icon="CalendarDays" sub="2017–2026" />
        <StatTile label="Win record" value={`${record.W}-${record.D}-${record.L}`} icon="Trophy" sub={`${record.winPct}% win rate`} />
        <StatTile label="Goals for / against" value={`${record.gf} / ${record.ga}`} icon="Goal" sub={`+${record.gf - record.ga} goal difference`} />
        <StatTile label="Home grounds used" value={distinctHomeGrounds} icon="MapPin" sub="across Northern Ireland" />
      </div>

      {/* Attendance trend + venue story */}
      <div className="grid cols-3 mt-16">
        <Card
          title="Home attendance growth"
          subtitle="Average and best crowd at NI home grounds, by season (real)"
          className="span-2"
          action={<Legend items={attKeys.map((k) => ({ label: k.label, color: k.color }))} />}
        >
          <LineTrend data={attData} keys={attKeys} height={250} />
          <div className="flex gap-8 wrap items-center" style={{ marginTop: 8 }}>
            <span className="badge good">
              <TrendingUp size={13} /> Average up from ~600 (2017/18); Windsor Park qualifier peaked at 15,348
            </span>
          </div>
          <p className="small muted" style={{ marginTop: 8, lineHeight: 1.45 }}>
            This trend covers NI home grounds only. The all-time record of 30,785 (Euro 2022 vs England) was
            played at a neutral tournament venue in England, so it sits outside this home-ground series — see
            "Record crowds" below.
          </p>
        </Card>

        <Card title="Attendance by result" subtitle="Avg. home crowd (real)">
          <BarsV data={resultData} keys={[{ key: 'avg', label: 'Avg. attendance', color: SERIES[6] }]} height={200} />
          <p className="small muted" style={{ marginTop: 8, lineHeight: 1.45 }}>
            Even historic crowds skew toward fixtures the team went on to win — useful context for
            pricing and demand forecasting.
          </p>
        </Card>
      </div>

      {/* HOME VENUES — the assortment-of-venues story */}
      <div className="section-title">Home venues — the multi-ground picture</div>
      <div className="grid cols-3">
        <Card
          title="Where NI Women play at home"
          subtitle="No single home ground — fixtures rotate across the country"
          className="span-2"
          bodyClass="tight"
        >
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Venue</th>
                  <th>Location</th>
                  <th className="num">Games</th>
                  <th className="num">Avg. att.</th>
                  <th className="num">Best att.</th>
                  <th className="num">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {homeVenues.map((v) => (
                  <tr key={v.venue}>
                    <td style={{ fontWeight: 600 }}>{v.venue}</td>
                    <td className="muted small">{v.city}{v.club ? ` · ${v.club}` : ''}</td>
                    <td className="num">{v.games}</td>
                    <td className="num">{v.avg ? v.avg.toLocaleString() : '—'}</td>
                    <td className="num" style={{ fontWeight: 600 }}>{v.best ? v.best.toLocaleString() : '—'}</td>
                    <td className="num muted">{v.capacity ? v.capacity.toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Why venue context matters" subtitle="For a fan intelligence platform">
          <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.55 }}>
            Because home games move between <strong>{distinctHomeGrounds} grounds</strong> — Seaview,
            Windsor Park, Mourneview Park and others — a fan's travel distance, ticket access and
            match-day experience change every fixture.
          </p>
          <div className="divider" />
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <VenuePoint text="Attendance is only comparable once normalised for venue capacity and location." />
            <VenuePoint text="Regional fans can be targeted when a fixture comes to a ground near them." />
            <VenuePoint text="Capacity vs demand informs which ground suits each opponent and competition." />
          </ul>
        </Card>
      </div>

      {/* Biggest crowds */}
      <div className="grid cols-3 mt-16">
        <Card title="Record crowds" subtitle="Largest attendances on record (home & away)">
          <div className="bar-list">
            {biggestCrowds.map((m) => (
              <div className="bar-row" key={m.date + m.opponent} style={{ gridTemplateColumns: '1fr 90px' }}>
                <span className="bl-label">
                  {m.home ? 'vs ' : '@ '}{m.opponent}
                  <span className="muted"> · {m.venue.split(' ').slice(0, 2).join(' ')}</span>
                </span>
                <span className="bl-val">{m.attendance.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent form" subtitle="Last six fixtures" className="span-2" bodyClass="tight">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Date</th><th>Fixture</th><th>Competition</th><th>Venue</th>
                  <th className="num">Result</th><th className="num">Att.</th>
                </tr>
              </thead>
              <tbody>
                {[...recentForm].reverse().map((m) => (
                  <tr key={m.date + m.opponent}>
                    <td className="muted small">{fmtDate(m.date)}</td>
                    <td style={{ fontWeight: 600 }}>{m.home ? 'vs ' : '@ '}{m.opponent}</td>
                    <td className="muted small">{m.competition}</td>
                    <td className="muted small">{m.venue}</td>
                    <td className="num">
                      <Badge tone={resultTone[m.result]}>{resultLabel[m.result]} {m.niScore}-{m.oppScore}</Badge>
                    </td>
                    <td className="num">{m.attendance ? m.attendance.toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Full fixture log with filters */}
      <div className="section-title">Full fixture record</div>
      <Card bodyClass="tight">
        <div className="flex between wrap gap-12 items-center" style={{ padding: '8px 8px 14px' }}>
          <div className="chip-row">
            <button className={`chip${side === 'all' ? ' active' : ''}`} onClick={() => setSide('all')}>All</button>
            <button className={`chip${side === 'home' ? ' active' : ''}`} onClick={() => setSide('home')}>Home</button>
            <button className={`chip${side === 'away' ? ' active' : ''}`} onClick={() => setSide('away')}>Away</button>
          </div>
          <div className="chip-row">
            <button className={`chip${season === 'all' ? ' active' : ''}`} onClick={() => setSeason('all')}>All seasons</button>
            {seasons.map((s) => (
              <button key={s} className={`chip${season === s ? ' active' : ''}`} onClick={() => setSeason(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Date</th><th>Fixture</th><th>Competition</th><th>Venue</th>
                <th className="num">Result</th><th className="num">Attendance</th><th className="num">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.map((m) => (
                <tr key={m.date + m.opponent}>
                  <td className="muted small">{fmtDate(m.date)}</td>
                  <td style={{ fontWeight: 600 }}>
                    {m.home ? 'vs ' : '@ '}{m.opponent}
                    {!m.niGround && m.home && <span className="muted small"> (neutral)</span>}
                  </td>
                  <td className="muted small">{m.competition}</td>
                  <td className="muted small">{m.venue}</td>
                  <td className="num"><Badge tone={resultTone[m.result]}>{resultLabel[m.result]} {m.niScore}-{m.oppScore}</Badge></td>
                  <td className="num">{m.attendance ? m.attendance.toLocaleString() : <span className="muted">n/a</span>}</td>
                  <td className="num muted">{m.capacity ? m.capacity.toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card__foot">
          Showing {fixtures.length} of {record.played} fixtures · attendance shown where recorded ·
          "n/a" indicates behind-closed-doors (COVID) or unrecorded fixtures
        </div>
      </Card>
    </>
  )
}

function VenuePoint({ text }) {
  return (
    <li className="flex gap-8" style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>
      <MapPin size={14} style={{ flexShrink: 0, marginTop: 2, color: 'var(--brand-600)' }} />
      {text}
    </li>
  )
}

function fmtDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
}
