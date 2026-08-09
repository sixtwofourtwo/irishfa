import { useState, useMemo } from 'react'
import { TrendingUp, Database, Ticket, TicketPercent, Users, Gift, CreditCard } from 'lucide-react'
import { PageHeader, Card, Badge, StatTile, Legend } from '../components/ui.jsx'
import { LineTrend, BarsV } from '../components/charts.jsx'
import VenueMap from '../components/VenueMap.jsx'
import { SERIES, BRAND } from '../theme.js'
import { matchHistory } from '../data/matchHistory.js'
import {
  record, seasons, homeAttBySeason, distinctHomeGrounds,
  venuesRanked, biggestCrowds, recentForm, attByResult,
} from '../data/matchStats.js'
import { TICKET_TYPES, ticketsForMatches, homeTicketMatches } from '../data/tickets.js'

const resultTone = { W: 'good', D: 'warn', L: 'crit' }
const resultLabel = { W: 'W', D: 'D', L: 'L' }
const TICKET_ICONS = { Ticket, TicketPercent, Users, Gift, CreditCard }
const matchKey = (m) => `${m.date}__${m.opponent}`

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

  // --- Ticket-type sales, driven by the selected event ---------------------
  const latestSeason = seasons[seasons.length - 1]
  const [ticketSel, setTicketSel] = useState({ mode: 'season', season: latestSeason })
  const seasonLabelToFull = useMemo(
    () => Object.fromEntries(homeAttBySeason.map((s) => [s.season, s.seasonFull])),
    [],
  )
  const selectedKey = ticketSel.mode === 'match' ? ticketSel.key : null
  const isTicketEligible = (m) => m.home && m.niGround && typeof m.attendance === 'number'
  const selMatches =
    ticketSel.mode === 'all'
      ? homeTicketMatches
      : ticketSel.mode === 'match'
      ? homeTicketMatches.filter((m) => matchKey(m) === ticketSel.key)
      : homeTicketMatches.filter((m) => m.season === ticketSel.season)
  const { total: ticketTotal, counts: ticketCounts } = ticketsForMatches(selMatches)
  const selMatch = ticketSel.mode === 'match' ? selMatches[0] : null
  const ticketLabel =
    ticketSel.mode === 'all'
      ? 'All home fixtures'
      : ticketSel.mode === 'match' && selMatch
      ? `${selMatch.home ? 'vs' : '@'} ${selMatch.opponent} · ${fmtDate(selMatch.date)}`
      : `${ticketSel.season} season`
  const selectMatchForTickets = (m) => {
    if (isTicketEligible(m)) setTicketSel({ mode: 'match', key: matchKey(m) })
  }

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
          <LineTrend
            data={attData}
            keys={attKeys}
            height={250}
            onPointClick={(label) => {
              const full = seasonLabelToFull[label]
              if (full) setTicketSel({ mode: 'season', season: full })
            }}
          />
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

      {/* Ticket sales by type — reflects the selected event */}
      <div className="section-title">Ticket sales by type — {ticketLabel}</div>
      <div className="chip-row" style={{ marginBottom: 12 }}>
        <button
          className={`chip${ticketSel.mode === 'season' && ticketSel.season === latestSeason ? ' active' : ''}`}
          onClick={() => setTicketSel({ mode: 'season', season: latestSeason })}
        >
          {latestSeason} season
        </button>
        <button
          className={`chip${ticketSel.mode === 'all' ? ' active' : ''}`}
          onClick={() => setTicketSel({ mode: 'all' })}
        >
          All fixtures
        </button>
        {ticketSel.mode === 'match' && (
          <button className="chip active" onClick={() => setTicketSel({ mode: 'season', season: latestSeason })}>
            {ticketLabel} ✕
          </button>
        )}
        <span className="muted small" style={{ alignSelf: 'center' }}>
          Tip: click a season on the chart above, or a fixture below, to update these cards.
        </span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {TICKET_TYPES.map((t) => {
          const Icon = TICKET_ICONS[t.icon] || Ticket
          const count = ticketCounts[t.key] || 0
          const pct = ticketTotal ? Math.round((count / ticketTotal) * 100) : 0
          return (
            <div className="stat" key={t.key}>
              <div className="stat__label">
                <span className="stat__icon" style={{ background: '#f1f3f2', color: t.color }}>
                  <Icon size={17} />
                </span>
                {t.label}
              </div>
              <div className="stat__value">{count.toLocaleString()}</div>
              <div className="stat__meta">
                {t.planned ? (
                  <span className="badge gray">Planned — future</span>
                ) : (
                  <span className="stat__sub">{pct}% of tickets</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* HOME VENUES — map + figures side by side (one screenful) */}
      <div className="section-title">Home venues — where NI Women play across Northern Ireland</div>
      <div className="grid cols-3">
        <Card
          title="Home grounds map"
          subtitle="Size = avg attendance · colour = utilisation"
        >
          <VenueMap venues={venuesRanked} />
        </Card>

        <Card
          className="span-2"
          title="Average attendance & how full each ground is"
          subtitle={`Real data · home games rotate across ${distinctHomeGrounds} grounds; average crowds fill just 7–42% of capacity`}
          bodyClass="tight"
        >
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Venue</th>
                  <th className="num">Games</th>
                  <th className="num">Avg. att.</th>
                  <th className="num">Best att.</th>
                  <th className="num">Capacity</th>
                  <th>Avg. vs capacity</th>
                </tr>
              </thead>
              <tbody>
                {venuesRanked.map((v) => (
                  <tr key={v.venue}>
                    <td>
                      <span style={{
                        display: 'inline-grid', placeItems: 'center', width: 22, height: 22,
                        borderRadius: '50%', background: 'var(--brand-050)', color: 'var(--brand-700)',
                        fontSize: 11, fontWeight: 700,
                      }}>{v.rank}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{v.venue}</div>
                      <div className="muted small">{v.city}{v.club ? ` · ${v.club}` : ''}</div>
                    </td>
                    <td className="num">{v.games}</td>
                    <td className="num" style={{ fontWeight: 700 }}>{v.avg ? v.avg.toLocaleString() : '—'}</td>
                    <td className="num">{v.best ? v.best.toLocaleString() : '—'}</td>
                    <td className="num muted">{v.capacity ? v.capacity.toLocaleString() : '—'}</td>
                    <td style={{ minWidth: 130 }}>
                      {v.avgUtil != null ? (
                        <div className="flex items-center gap-8">
                          <span className="meter" style={{ flex: 1 }}>
                            <span style={{ width: `${v.avgUtil}%`, background: utilColor(v.avgUtil) }} />
                          </span>
                          <span style={{ width: 32, textAlign: 'right', fontWeight: 600 }}>{v.avgUtil}%</span>
                        </div>
                      ) : (
                        <span className="muted small">n/a</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card__foot">
            "Avg. vs capacity" = average attendance ÷ published capacity. Inver Park capacity was not in
            the supplied dataset (shown n/a).
          </div>
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
                {[...recentForm].reverse().map((m) => {
                  const eligible = isTicketEligible(m)
                  const isSel = matchKey(m) === selectedKey
                  return (
                    <tr
                      key={m.date + m.opponent}
                      className={eligible ? 'row-link' : ''}
                      onClick={eligible ? () => selectMatchForTickets(m) : undefined}
                      style={isSel ? { background: 'var(--brand-050)' } : undefined}
                    >
                      <td className="muted small">{fmtDate(m.date)}</td>
                      <td style={{ fontWeight: 600 }}>{m.home ? 'vs ' : '@ '}{m.opponent}</td>
                      <td className="muted small">{m.competition}</td>
                      <td className="muted small">{m.venue}</td>
                      <td className="num">
                        <Badge tone={resultTone[m.result]}>{resultLabel[m.result]} {m.niScore}-{m.oppScore}</Badge>
                      </td>
                      <td className="num">{m.attendance ? m.attendance.toLocaleString() : '—'}</td>
                    </tr>
                  )
                })}
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
              {fixtures.map((m) => {
                const eligible = isTicketEligible(m)
                const isSel = matchKey(m) === selectedKey
                return (
                  <tr
                    key={m.date + m.opponent}
                    className={eligible ? 'row-link' : ''}
                    onClick={eligible ? () => selectMatchForTickets(m) : undefined}
                    style={isSel ? { background: 'var(--brand-050)' } : undefined}
                  >
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
                )
              })}
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

function fmtDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
}

// Utilisation colour band (matches the venue map legend).
function utilColor(u) {
  return u >= 30 ? '#0ca30c' : u >= 15 ? '#e19305' : '#d03b3b'
}
