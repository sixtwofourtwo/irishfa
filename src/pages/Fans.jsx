import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Download, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import { PageHeader, Card, Badge } from '../components/ui.jsx'
import { fans, initials, avatarColor } from '../data/fans.js'
import { segments } from '../data/segments.js'

const segmentTones = {
  Superfans: 'good',
  'Committed regulars': 'info',
  'Family & juniors': 'good',
  'Digital-first followers': 'info',
  'Lapsed supporters': 'warn',
  'Newly acquired': 'gray',
}

export default function Fans() {
  const [q, setQ] = useState('')
  const [seg, setSeg] = useState('all')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return fans.filter((f) => {
      const matchesQ =
        !q ||
        f.name.toLowerCase().includes(q.toLowerCase()) ||
        f.location.toLowerCase().includes(q.toLowerCase())
      const matchesSeg = seg === 'all' || f.segmentId === seg
      return matchesQ && matchesSeg
    })
  }, [q, seg])

  return (
    <>
      <PageHeader
        title="Fan 360 Profiles"
        subtitle="Every supporter as a single unified record — their attendance, spend, digital engagement and preferences drawn together from all seven sources."
      >
        <button className="btn sm">
          <Download size={14} /> Export
        </button>
      </PageHeader>

      <Card bodyClass="tight">
        {/* Filter bar */}
        <div className="flex between wrap items-center gap-12" style={{ padding: '8px 8px 14px' }}>
          <div className="search" style={{ minWidth: 260 }}>
            <Search size={16} />
            <input
              placeholder="Search by name or location…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="chip-row">
            <button className={`chip${seg === 'all' ? ' active' : ''}`} onClick={() => setSeg('all')}>
              All fans
            </button>
            {segments.map((s) => (
              <button
                key={s.id}
                className={`chip${seg === s.id ? ' active' : ''}`}
                onClick={() => setSeg(s.id)}
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
                <th>Sources</th>
                <th className="num">Games</th>
                <th className="num">Lifetime value</th>
                <th className="num">Engagement</th>
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
                        <div className="person__sub">{f.location} · fan since {f.since}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge tone={segmentTones[f.segment] || 'gray'}>{f.segment}</Badge>
                  </td>
                  <td>
                    <span className="muted small">{f.channels.length} connected</span>
                  </td>
                  <td className="num">{f.games}</td>
                  <td className="num">£{f.value}</td>
                  <td className="num">
                    <div className="flex items-center gap-8" style={{ justifyContent: 'flex-end' }}>
                      <span className="meter" style={{ width: 54 }}>
                        <span style={{ width: `${f.engagement}%` }} />
                      </span>
                      <span style={{ width: 26 }}>{f.engagement}</span>
                    </div>
                  </td>
                  <td>
                    {f.consent ? (
                      <span className="badge good"><CheckCircle2 size={12} /> Opt-in</span>
                    ) : (
                      <span className="badge crit"><XCircle size={12} /> No consent</span>
                    )}
                  </td>
                  <td><ChevronRight size={16} color="var(--ink-3)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card__foot">
          Showing {filtered.length} of {fans.length} sample profiles · {(48420).toLocaleString()} total in platform
        </div>
      </Card>
    </>
  )
}
