// Small, shared presentational components used across pages.
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import * as Icons from 'lucide-react'

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="flex gap-8 wrap items-center">{children}</div>}
    </div>
  )
}

export function Delta({ value, dir, suffix = '%' }) {
  const d = dir || (value > 0 ? 'up' : value < 0 ? 'down' : 'flat')
  const Icon = d === 'up' ? TrendingUp : d === 'down' ? TrendingDown : Minus
  return (
    <span className={`delta ${d}`}>
      <Icon size={13} strokeWidth={2.5} />
      {Math.abs(value)}
      {suffix}
    </span>
  )
}

export function StatTile({ label, value, icon, delta, deltaDir, sub, suffix }) {
  const Icon = icon ? Icons[icon] || Icons.Activity : null
  return (
    <div className="stat">
      <div className="stat__label">
        {Icon && (
          <span className="stat__icon">
            <Icon size={17} />
          </span>
        )}
        {label}
      </div>
      <div className="stat__value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>
      <div className="stat__meta">
        {typeof delta === 'number' && <Delta value={delta} dir={deltaDir} />}
        {sub && <span className="stat__sub">{sub}</span>}
      </div>
    </div>
  )
}

export function Card({ title, subtitle, action, children, className = '', bodyClass = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="card__head">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={`card__body ${bodyClass}`}>{children}</div>
    </div>
  )
}

export function Badge({ children, tone = '', dot = false }) {
  return (
    <span className={`badge ${tone}`}>
      {dot && <span className="dot-s" />}
      {children}
    </span>
  )
}

// A labelled horizontal bar list — clearer than a bare bar chart for rankings.
export function BarList({ items, max, unit = '', money = false }) {
  const top = max || Math.max(...items.map((i) => i.value))
  return (
    <div className="bar-list">
      {items.map((it) => (
        <div className="bar-row" key={it.label}>
          <span className="bl-label">{it.label}</span>
          <span className="bar-track">
            <span style={{ width: `${(it.value / top) * 100}%`, background: it.color || 'var(--brand-500)' }} />
          </span>
          <span className="bl-val">
            {money ? '£' : ''}
            {it.display ?? it.value.toLocaleString()}
            {unit}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Legend({ items }) {
  return (
    <div className="legend">
      {items.map((it) => (
        <span className="legend-item" key={it.label}>
          <span className="legend-swatch" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  )
}

// Status pill for good/warn/serious/critical — always icon + label, never colour alone.
export function StatusPill({ level, children }) {
  const map = {
    good: { tone: 'good', Icon: Icons.CheckCircle2 },
    warn: { tone: 'warn', Icon: Icons.AlertCircle },
    crit: { tone: 'crit', Icon: Icons.AlertTriangle },
    info: { tone: 'info', Icon: Icons.Info },
  }
  const { tone, Icon } = map[level] || map.info
  return (
    <span className={`badge ${tone}`}>
      <Icon size={13} />
      {children}
    </span>
  )
}
