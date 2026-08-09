import { useState } from 'react'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { PageHeader, Card, StatTile } from '../components/ui.jsx'
import { alerts, alertCounts } from '../data/alerts.js'

const levelMeta = {
  good: { cls: 'good', label: 'Opportunity' },
  warn: { cls: 'warn', label: 'Watch' },
  crit: { cls: 'crit', label: 'Action needed' },
  info: { cls: 'info', label: 'Insight' },
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'good', label: 'Opportunities' },
  { id: 'warn', label: 'Watch' },
  { id: 'crit', label: 'Action needed' },
]

export default function Alerts() {
  const [f, setF] = useState('all')
  const shown = f === 'all' ? alerts : alerts.filter((a) => a.level === f)

  return (
    <>
      <PageHeader
        title="Alerts & Insights"
        subtitle="The platform continuously scans across all connected sources and surfaces what matters — opportunities, risks and wins that no single system could see on its own."
      />

      <div className="grid cols-3">
        <StatTile label="Active insights" value={alertCounts.total} icon="Lightbulb" sub="auto-generated" />
        <StatTile label="Opportunities" value={alertCounts.opportunities} icon="TrendingUp" sub="growth & revenue" />
        <StatTile label="Needs action" value={alertCounts.critical} icon="AlertTriangle" sub="time-sensitive" />
      </div>

      <div className="chip-row mt-16" style={{ marginBottom: 4 }}>
        {filters.map((flt) => (
          <button key={flt.id} className={`chip${f === flt.id ? ' active' : ''}`} onClick={() => setF(flt.id)}>
            {flt.label}
          </button>
        ))}
      </div>

      <Card bodyClass="tight" className="mt-16">
        {shown.map((a) => {
          const Icon = Icons[a.icon] || Icons.Bell
          const meta = levelMeta[a.level]
          return (
            <div className="alert-item" key={a.id}>
              <span className={`alert-ico ${meta.cls}`}><Icon size={19} /></span>
              <div className="alert-body" style={{ flex: 1 }}>
                <div className="flex between items-center gap-8 wrap">
                  <h4>{a.title}</h4>
                  <span className={`badge ${meta.cls === 'good' ? 'good' : meta.cls === 'crit' ? 'crit' : meta.cls === 'warn' ? 'warn' : 'info'}`}>
                    {meta.label}
                  </span>
                </div>
                <p>{a.body}</p>
                <div className="alert-meta">
                  <span><Icons.Database size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{a.source}</span>
                  <span><Icons.Clock size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{a.when}</span>
                </div>
                <button className="btn sm" style={{ marginTop: 12 }}>
                  {a.action} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </Card>
    </>
  )
}
