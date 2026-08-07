import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Send, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import { PageHeader, Card, Badge } from '../components/ui.jsx'
import { fans, initials, avatarColor, statusMeta } from '../data/fans.js'
import { segments, segmentById } from '../data/segments.js'

const segmentTones = {
  Superfans: 'good',
  'Committed regulars': 'info',
  'Family & juniors': 'good',
  'Digital-first followers': 'info',
  'Lapsed supporters': 'warn',
  'Newly acquired': 'gray',
  Families: 'good',
  'Young Female Fans': 'info',
  'Group & Club Bookers': 'gray',
}

const statusFilters = ['Returning fan', 'First-time only', 'At risk', 'Lapsed']

export default function Fans() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const [seg, setSeg] = useState('all')
  const [status, setStatus] = useState('all')
  const navigate = useNavigate()

  // Initialise filters from the URL (e.g. arriving from a segment card or the
  // dashboard "view at-risk fans" link).
  useEffect(() => {
    setSeg(params.get('segment') || 'all')
    setStatus(params.get('status') || 'all')
  }, [params])

  const filtered = useMemo(() => {
    return fans.filter((f) => {
      const matchesQ =
        !q ||
        f.name.toLowerCase().includes(q.toLowerCase()) ||
        f.location.toLowerCase().includes(q.toLowerCase())
      const matchesSeg = seg === 'all' || f.segmentId === seg
      const matchesStatus = status === 'all' || f.status === status
      return matchesQ && matchesSeg && matchesStatus
    })
  }, [q, seg, status])

  const setSegment = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('segment')
    else next.set('segment', id)
    setParams(next, { replace: true })
  }
  const setStatusFilter = (s) => {
    const next = new URLSearchParams(params)
    if (s === 'all') next.delete('status')
    else next.set('status', s)
    setParams(next, { replace: true })
  }

  const activeSegmentName = seg !== 'all' && segmentById[seg] ? segmentById[seg].name : null

  return (
    <>
      <PageHeader
        title="Fan 360 Profiles"
        subtitle="Every supporter as a single unified record — attendance, spend, digital engagement and preferences drawn together from all seven sources. Filter by segment or retention status, then act."
      >
        <button className="btn primary sm">
          <Send size={14} /> {activeSegmentName ? `Send communication to ${activeSegmentName}` : 'Send communication to this segment'}
        </button>
      </PageHeader>

      <Card bodyClass="tight">
        {/* Filter bar */}
        <div style={{ padding: '10px 8px 6px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="flex between wrap items-center gap-12">
            <div className="search" style={{ minWidth: 260 }}>
              <Search size={16} />
              <input
                placeholder="Search by name or location…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="chip-row">
              <span className="muted small" style={{ alignSelf: 'center', marginRight: 2 }}>Status:</span>
              <button className={`chip${status === 'all' ? ' active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
              {statusFilters.map((s) => (
                <button key={s} className={`chip${status === s ? ' active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="chip-row">
            <span className="muted small" style={{ alignSelf: 'center', marginRight: 2 }}>Segment:</span>
            <button className={`chip${seg === 'all' ? ' active' : ''}`} onClick={() => setSegment('all')}>All</button>
            {segments.map((s) => (
              <button
                key={s.id}
                className={`chip${seg === s.id ? ' active' : ''}`}
                onClick={() => setSegment(s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Fan</th>
                <th>Segment</th>
                <th>Status</th>
                <th className="num">Games</th>
                <th>Last match</th>
                <th className="num">Value</th>
                <th>Consent</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className="row-link" onClick={() => navigate(`/fans/${f.id}`)}>
                  <td>
                    <div className="person">
                      <span className="fan-avatar" style={{ background: avatarColor(f.id) }}>
                        {initials(f.name)}
                      </span>
                      <div>
                        <div className="person__name">{f.name}</div>
                        <div className="person__sub">{f.location} · {f.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge tone={segmentTones[f.segment] || 'gray'}>{f.segment}</Badge>
                  </td>
                  <td>
                    <Badge tone={(statusMeta[f.status] || {}).tone || 'gray'}>{f.status}</Badge>
                  </td>
                  <td className="num">{f.games}</td>
                  <td className="muted small">{f.lastMatch}</td>
                  <td className="num">£{f.value}</td>
                  <td>
                    {f.consent ? (
                      <span className="badge good"><CheckCircle2 size={12} /> Opt-in</span>
                    ) : (
                      <span className="badge crit"><XCircle size={12} /> No consent</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn sm"
                      onClick={(e) => { e.stopPropagation(); navigate(`/fans/${f.id}`) }}
                    >
                      View Profile <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card__foot">
          Showing {filtered.length} of {fans.length} sample profiles
          {activeSegmentName ? ` · filtered to ${activeSegmentName}` : ''}
          {status !== 'all' ? ` · ${status}` : ''} · {(48420).toLocaleString()} total in platform
        </div>
      </Card>
    </>
  )
}
