// Derived aggregations over the REAL match history. Kept separate so the
// match data file stays a clean, verifiable record of the source data.
import { matchHistory, venueMeta } from './matchHistory.js'

const withAtt = (m) => typeof m.attendance === 'number'

// --- Overall record (all fixtures) -------------------------------------------
export const record = matchHistory.reduce(
  (a, m) => {
    a.played += 1
    a[m.result] += 1
    a.gf += m.niScore
    a.ga += m.oppScore
    return a
  },
  { played: 0, W: 0, D: 0, L: 0, gf: 0, ga: 0 },
)
record.winPct = Math.round((record.W / record.played) * 100)

// --- Seasons (chronological) -------------------------------------------------
export const seasons = [...new Set(matchHistory.map((m) => m.season))].sort()

// --- Home attendance by season (NI grounds only, where recorded) -------------
export const homeAttBySeason = seasons
  .map((season) => {
    const games = matchHistory.filter((m) => m.season === season && m.niGround && withAtt(m))
    if (!games.length) return null
    const total = games.reduce((s, m) => s + m.attendance, 0)
    return {
      season: season.replace('20', "'").replace('/', '/'),
      seasonFull: season,
      avg: Math.round(total / games.length),
      games: games.length,
      max: Math.max(...games.map((m) => m.attendance)),
    }
  })
  .filter(Boolean)

// --- Home venues used (the "assortment of venues" story) ----------------------
export const homeVenues = (() => {
  const map = {}
  matchHistory
    .filter((m) => m.home && m.niGround)
    .forEach((m) => {
      const v = (map[m.venue] = map[m.venue] || { venue: m.venue, games: 0, att: [], best: 0, capacity: m.capacity })
      v.games += 1
      if (withAtt(m)) {
        v.att.push(m.attendance)
        v.best = Math.max(v.best, m.attendance)
      }
      if (m.capacity) v.capacity = m.capacity
    })
  return Object.values(map)
    .map((v) => ({
      ...v,
      ...(venueMeta[v.venue] || { city: '—', club: '' }),
      avg: v.att.length ? Math.round(v.att.reduce((a, b) => a + b, 0) / v.att.length) : null,
      util: v.capacity && v.att.length ? Math.round((Math.max(...v.att) / v.capacity) * 100) : null,
    }))
    .sort((a, b) => b.games - a.games)
})()

// Count of distinct home grounds actually used across NI
export const distinctHomeGrounds = homeVenues.length

// --- Record crowds (any fixture, home or away) -------------------------------
export const biggestCrowds = matchHistory
  .filter(withAtt)
  .sort((a, b) => b.attendance - a.attendance)
  .slice(0, 6)

// --- Recent form (most recent 6 fixtures) ------------------------------------
export const recentForm = matchHistory.slice(-6)

// --- Attendance vs result (real) ---------------------------------------------
export const attByResult = ['W', 'D', 'L'].map((r) => {
  const games = matchHistory.filter((m) => m.home && m.niGround && withAtt(m) && m.result === r)
  const avg = games.length ? Math.round(games.reduce((s, m) => s + m.attendance, 0) / games.length) : 0
  return { result: r === 'W' ? 'Win' : r === 'D' ? 'Draw' : 'Loss', avg, games: games.length }
})

// Latest season average, for headline KPIs elsewhere
export const latestSeasonHomeAvg = homeAttBySeason[homeAttBySeason.length - 1]
