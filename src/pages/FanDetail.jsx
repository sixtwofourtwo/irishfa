import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Ticket, Smartphone, Share2, Mail, Globe, ShoppingBag,
  MapPin, CalendarClock, CheckCircle2, XCircle, Circle, User, Send,
  TicketCheck, LogIn, Info,
} from 'lucide-react'
import { PageHeader, Card, Badge, StatTile } from '../components/ui.jsx'
import { fanById, initials, avatarColor, statusMeta } from '../data/fans.js'
import { sources } from '../data/sources.js'

const timelineIcons = {
  ticket: Ticket,
  app: Smartphone,
  social: Share2,
  email: Mail,
  web: Globe,
  merch: ShoppingBag,
}

export default function FanDetail() {
  const { id } = useParams()
  const fan = fanById[Number(id)]

  if (!fan) {
    return (
      <>
        <PageHeader title="Fan not found" subtitle="This profile isn't in the sample set." />
        <Link to="/fans" className="btn"><ArrowLeft size={15} /> Back to fans</Link>
      </>
    )
  }

  const connected = new Set(fan.channels)

  return (
    <>
      <Link to="/fans" className="btn sm" style={{ marginBottom: 16 }}>
        <ArrowLeft size={15} /> Back to Fan 360
      </Link>

      {/* Profile header */}
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card__body flex between wrap gap-12" style={{ alignItems: 'flex-start' }}>
          <div className="flex gap-12" style={{ alignItems: 'center' }}>
            <span
              className="fan-avatar"
              style={{ background: avatarColor(fan.id), width: 60, height: 60, fontSize: 20 }}
            >
              {initials(fan.name)}
            </span>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>{fan.name}</h2>
              <div className="flex gap-12 wrap items-center" style={{ marginTop: 6, color: 'var(--ink-2)', fontSize: 13 }}>
                <span className="flex items-center gap-8"><MapPin size={14} /> {fan.location}</span>
                <span className="flex items-center gap-8"><User size={14} /> {fan.gender}</span>
                <span className="flex items-center gap-8"><CalendarClock size={14} /> Fan since {fan.since}</span>
                <Badge tone="good">{fan.segment}</Badge>
                <Badge tone={(statusMeta[fan.status] || {}).tone || 'gray'}>{fan.status}</Badge>
                {fan.consent ? (
                  <span className="badge good"><CheckCircle2 size={12} /> Marketing opt-in</span>
                ) : (
                  <span className="badge crit"><XCircle size={12} /> No marketing consent</span>
                )}
              </div>
              <div className="chip-row" style={{ marginTop: 10 }}>
                {fan.tags.map((t) => (
                  <span key={t} className="chip" style={{ padding: '4px 10px', fontSize: 12 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="muted small">Fan lifetime value</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--brand-700)', letterSpacing: '-0.02em' }}>£{fan.value}</div>
            <div className="muted small">Engagement score {fan.engagement}/100</div>
            <button className="btn primary sm" style={{ marginTop: 12 }}>
              <Send size={14} /> Send communication
            </button>
          </div>
        </div>
        {/* Attendance summary strip */}
        <div className="card__foot flex gap-12 wrap" style={{ gap: 28 }}>
          <FootStat label="Games attended" value={fan.games} />
          <FootStat label="First match" value={fan.firstMatch} />
          <FootStat label="Last match" value={fan.lastMatch} />
          <FootStat label="Retention status" value={fan.status} />
        </div>
      </div>

      {/* Unified stats */}
      <div className="grid cols-4">
        <StatTile label="Games attended" value={fan.stats.attendance} icon="Ticket" sub="this season" />
        <StatTile label="Ticket spend" value={`£${fan.stats.ticketSpend}`} icon="PoundSterling" sub="Ticketmaster" />
        <StatTile label="In-app spend" value={`£${fan.stats.appSpend}`} icon="Smartphone" sub="concourse & extras" />
        <StatTile label="Social interactions" value={fan.stats.socialEng} icon="Share2" sub="last 90 days" />
      </div>

      {/* What do we know about this fan? */}
      <Card title="What do we know about this fan?" subtitle="Assembled from every connected source" className="mt-16">
        <div className="grid cols-2" style={{ gap: 18 }}>
          <div className="flex gap-12" style={{ alignItems: 'flex-start' }}>
            <span className="stat__icon" style={{ background: 'var(--brand-050)', color: 'var(--brand-600)' }}>
              <TicketCheck size={17} />
            </span>
            <div>
              <div className="muted small">Ticket type purchased</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{fan.ticketType}</div>
            </div>
          </div>
          <div className="flex gap-12" style={{ alignItems: 'flex-start' }}>
            <span className="stat__icon" style={{ background: 'var(--brand-050)', color: 'var(--brand-600)' }}>
              <LogIn size={17} />
            </span>
            <div>
              <div className="muted small">How they entered the system</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{fan.entryPoint}</div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="muted small" style={{ fontWeight: 700, marginBottom: 10 }}>WHAT ELSE WE'VE GATHERED</div>
        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
          {fan.knowledge.map((k, i) => (
            <li key={i} className="flex gap-8" style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.45 }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: 2, color: 'var(--brand-600)' }} />
              {k}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid cols-3 mt-16">
        {/* Timeline */}
        <Card
          title="Unified activity timeline"
          subtitle="Every touchpoint, stitched across sources in chronological order"
          className="span-2"
        >
          <div className="timeline">
            {fan.timeline.map((t, i) => {
              const Icon = timelineIcons[t.type] || Circle
              return (
                <div className="tl-item" key={i}>
                  <span className="tl-dot"><Icon size={11} /></span>
                  <h4>{t.title}</h4>
                  <div className="tl-meta">{t.meta}</div>
                  <div className="flex gap-12 items-center" style={{ marginTop: 4 }}>
                    <span className="tl-src">{t.source}</span>
                    <span className="muted small">{t.when}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Connected sources */}
          <Card title="Connected sources" subtitle="Where this profile is assembled from" bodyClass="tight">
            <div style={{ padding: 4 }}>
              {sources.map((s) => {
                const on = connected.has(s.name) || connected.has(s.name.split(' ')[0])
                return (
                  <div
                    key={s.id}
                    className="flex between items-center"
                    style={{ padding: '9px 8px', borderBottom: '1px solid var(--line-soft)' }}
                  >
                    <div className="flex items-center gap-8">
                      <span
                        className="source-logo"
                        style={{ background: s.color, width: 30, height: 30, fontSize: 11, borderRadius: 8 }}
                      >
                        {s.abbr}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                    </div>
                    {on ? (
                      <span className="badge good"><CheckCircle2 size={12} /> Linked</span>
                    ) : (
                      <span className="badge gray">—</span>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Next best action — driven by retention status first */}
          <Card title="Recommended action">
            <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.5 }}>
              {fan.status === 'At risk'
                ? 'At risk of dropping off — attended once but no return within 60 days. Send a personalised "come back for match #2" offer now, while the window is open.'
                : fan.status === 'First-time only'
                ? 'First-time attendee. Nurture toward a crucial second visit — a tailored next-fixture invite is the highest-impact action.'
                : fan.status === 'Lapsed'
                ? 'Lapsed supporter. In win-back territory — historically responsive to targeted discount offers; prioritise for the next reactivation send.'
                : fan.status === 'Not yet attended'
                ? 'Highly engaged online but has never attended. Strong candidate for a first-match conversion or streaming upsell.'
                : fan.segmentId === 'superfans'
                ? 'High-value returning advocate. Ideal for referral, ambassador and premium hospitality offers.'
                : 'Returning fan with strong potential — include in the season-ticket / membership upsell audience.'}
            </p>
            <button className="btn primary sm" style={{ marginTop: 12 }}>
              <Send size={14} /> Send communication
            </button>
          </Card>
        </div>
      </div>
    </>
  )
}

function FootStat({ label, value }) {
  return (
    <div>
      <div className="muted small">{label}</div>
      <div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 2 }}>{value}</div>
    </div>
  )
}
