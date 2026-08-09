import { RefreshCw, CheckCircle2, Loader2, Database, Link2, Clock, Fingerprint } from 'lucide-react'
import { PageHeader, Card, StatTile } from '../components/ui.jsx'
import { sources, integrationSummary } from '../data/sources.js'

export default function Sources() {
  return (
    <>
      <PageHeader
        title="Data Sources"
        subtitle="The systems that, until now, held supporter data in isolation. The platform ingests, cleans and matches them into one unified fan record — breaking down the silos."
      >
        <button className="btn sm"><RefreshCw size={14} /> Sync all</button>
      </PageHeader>

      <div className="grid cols-4">
        <StatTile label="Sources connected" value={`${integrationSummary.connected}/${integrationSummary.total}`} icon="Database" sub="all systems live" />
        <StatTile label="Records unified" value={`${integrationSummary.recordsUnified}m`} icon="Layers" sub="across all sources" />
        <StatTile label="Fan identities resolved" value={integrationSummary.identitiesResolved.toLocaleString()} icon="Fingerprint" sub="single fan records" />
        <StatTile label="Identity match rate" value={`${integrationSummary.matchRate}%`} icon="Link2" sub="records matched to a fan" />
      </div>

      {/* How it works strip */}
      <Card className="mt-16" title="How consolidation works" subtitle="From siloed systems to one fan record">
        <div className="grid cols-4" style={{ gap: 14 }}>
          <Step n="1" icon={<Link2 size={18} />} title="Connect" body="Each source connects via API or scheduled extract — no manual exports." />
          <Step n="2" icon={<Database size={18} />} title="Ingest & clean" body="Records are standardised, de-duplicated and validated on arrival." />
          <Step n="3" icon={<Fingerprint size={18} />} title="Match identity" body="Email, account and ticketing IDs resolve records to one unified fan." />
          <Step n="4" icon={<CheckCircle2 size={18} />} title="Unify & serve" body="A single fan record powers every dashboard, segment and campaign." />
        </div>
      </Card>

      <div className="section-title">Connected sources</div>
      <div className="grid cols-2">
        {sources.map((s) => (
          <div className="source-card" key={s.id}>
            <div className="source-card__top">
              <span className="source-logo" style={{ background: s.color }}>{s.abbr}</span>
              <div style={{ flex: 1 }}>
                <div className="flex between items-center">
                  <h3>{s.name}</h3>
                  {s.status === 'connected' ? (
                    <span className="badge good"><CheckCircle2 size={12} /> Connected</span>
                  ) : (
                    <span className="badge info"><Loader2 size={12} /> Syncing</span>
                  )}
                </div>
                <div className="src-type">{s.type}</div>
              </div>
            </div>

            <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>{s.blurb}</p>

            <div className="source-stats">
              <div>
                <div className="s-val">{s.records.toLocaleString()}</div>
                <div className="s-lbl">{s.recordLabel}</div>
              </div>
              <div>
                <div className="s-val">{s.health}%</div>
                <div className="s-lbl">data health</div>
              </div>
              <div>
                <div className="s-val" style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{s.frequency}</div>
                <div className="s-lbl">sync frequency</div>
              </div>
            </div>

            <div>
              <div className="muted small" style={{ fontWeight: 700, marginBottom: 6 }}>FIELDS INGESTED</div>
              <div className="chip-row">
                {s.fields.map((f) => (
                  <span key={f} className="chip" style={{ padding: '3px 9px', fontSize: 11.5 }}>{f}</span>
                ))}
              </div>
            </div>

            <div className="flex between items-center" style={{ borderTop: '1px solid var(--line-soft)', paddingTop: 12 }}>
              <span className="muted small flex items-center gap-8"><Clock size={13} /> Last sync {s.lastSync}</span>
              <span className="muted small">Owner · {s.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Step({ n, icon, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: 'var(--brand-050)', color: 'var(--brand-600)',
        display: 'grid', placeItems: 'center',
      }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}><span className="muted">{n}. </span>{title}</div>
        <div className="small" style={{ color: 'var(--ink-2)', marginTop: 3, lineHeight: 1.45 }}>{body}</div>
      </div>
    </div>
  )
}
