// Reusable chart components built on Recharts, styled to the design system.
import {
  ResponsiveContainer,
  AreaChart, Area,
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts'
import { INK, SERIES_ORDER, BRAND } from '../theme.js'

const axisProps = {
  tick: { fontSize: 11.5, fill: INK[3] },
  tickLine: false,
  axisLine: { stroke: INK.axis },
}

// Compact large numbers on axes so 4-5 digit values are not clipped (6000 -> 6k).
const compact = (v) => {
  if (typeof v !== 'number') return v
  if (Math.abs(v) >= 1000) return `${+(v / 1000).toFixed(1)}k`
  return v
}
const yAxis = { ...axisProps, width: 50, tickFormatter: compact }

// Shared custom tooltip — clean card, colour swatches, tabular values.
function ChartTip({ active, payload, label, prefix = '', suffix = '', formatter }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="chart-tip">
      {label != null && <div className="tt-label">{label}</div>}
      {payload.map((p, i) => (
        <div className="tt-row" key={i}>
          <span className="tt-key">
            <span className="tt-swatch" style={{ background: p.color || p.fill }} />
            {p.name}
          </span>
          <span className="tt-val">
            {prefix}
            {formatter ? formatter(p.value) : Number(p.value).toLocaleString()}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  )
}

// ---- Multi-series stacked area (cross-platform engagement) --------------------
export function StackedArea({ data, keys, height = 280, prefix = '', suffix = '' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -6, bottom: 0 }}>
        <defs>
          {keys.map((k, i) => (
            <linearGradient key={k.key} id={`grad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={k.color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={k.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke={INK.grid} vertical={false} />
        <XAxis dataKey="x" {...axisProps} />
        <YAxis {...yAxis} />
        <Tooltip content={<ChartTip prefix={prefix} suffix={suffix} />} />
        {keys.map((k) => (
          <Area
            key={k.key}
            type="monotone"
            dataKey={k.key}
            name={k.label}
            stroke={k.color}
            strokeWidth={2}
            fill={`url(#grad-${k.key})`}
            stackId="1"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ---- Simple line trend (single or dual) --------------------------------------
export function LineTrend({ data, keys, height = 260, prefix = '', suffix = '', onPointClick }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 8, right: 12, left: -6, bottom: 0 }}
        onClick={onPointClick ? (e) => e && e.activeLabel != null && onPointClick(e.activeLabel) : undefined}
        style={onPointClick ? { cursor: 'pointer' } : undefined}
      >
        <CartesianGrid stroke={INK.grid} vertical={false} />
        <XAxis dataKey="x" {...axisProps} />
        <YAxis {...yAxis} />
        <Tooltip content={<ChartTip prefix={prefix} suffix={suffix} />} />
        {keys.map((k) => (
          <Line
            key={k.key}
            type="monotone"
            dataKey={k.key}
            name={k.label}
            stroke={k.color}
            strokeWidth={2.4}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

// ---- Area (single, filled) — good for a headline growth curve ----------------
export function AreaTrend({ data, dataKey, name, color = BRAND[600], height = 240, prefix = '', suffix = '' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -6, bottom: 0 }}>
        <defs>
          <linearGradient id={`area-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.26} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={INK.grid} vertical={false} />
        <XAxis dataKey="x" {...axisProps} />
        <YAxis {...yAxis} />
        <Tooltip content={<ChartTip prefix={prefix} suffix={suffix} />} />
        <Area
          type="monotone"
          dataKey={dataKey}
          name={name}
          stroke={color}
          strokeWidth={2.6}
          fill={`url(#area-${dataKey})`}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ---- Vertical bar chart -------------------------------------------------------
export function BarsV({ data, keys, height = 260, prefix = '', suffix = '', stacked = false }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -6, bottom: 0 }} barCategoryGap="24%">
        <CartesianGrid stroke={INK.grid} vertical={false} />
        <XAxis dataKey="x" {...axisProps} />
        <YAxis {...yAxis} />
        <Tooltip cursor={{ fill: 'rgba(10,125,60,0.05)' }} content={<ChartTip prefix={prefix} suffix={suffix} />} />
        {keys.map((k) => (
          <Bar
            key={k.key}
            dataKey={k.key}
            name={k.label}
            fill={k.color}
            radius={stacked ? 0 : [4, 4, 0, 0]}
            stackId={stacked ? '1' : undefined}
            maxBarSize={46}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

// ---- Horizontal bar chart (rankings) -----------------------------------------
export function BarsH({ data, dataKey, color = BRAND[500], height = 260, prefix = '', suffix = '' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart layout="vertical" data={data} margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
        <CartesianGrid stroke={INK.grid} horizontal={false} />
        <XAxis type="number" {...axisProps} />
        <YAxis type="category" dataKey="x" {...axisProps} width={130} />
        <Tooltip cursor={{ fill: 'rgba(10,125,60,0.05)' }} content={<ChartTip prefix={prefix} suffix={suffix} />} />
        <Bar dataKey={dataKey} name={dataKey} radius={[0, 4, 4, 0]} maxBarSize={22}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color || color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ---- Donut -------------------------------------------------------------------
export function Donut({ data, height = 240, centerLabel, centerValue, suffix = '%' }) {
  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip content={<ChartTip suffix={suffix} />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="88%"
            paddingAngle={2}
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color || SERIES_ORDER[i % SERIES_ORDER.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(centerValue || centerLabel) && (
        <div
          style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            pointerEvents: 'none', textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>{centerValue}</div>
            <div style={{ fontSize: 11.5, color: INK[3], marginTop: 2 }}>{centerLabel}</div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---- Funnel (horizontal, from bars) ------------------------------------------
export function Funnel({ data, prefix = '', color = BRAND[500] }) {
  const top = data[0]?.value || 1
  return (
    <div className="bar-list">
      {data.map((d, i) => {
        const pct = Math.round((d.value / top) * 100)
        return (
          <div key={d.stage}>
            <div className="flex between small" style={{ marginBottom: 5 }}>
              <span style={{ fontWeight: 600 }}>{d.stage}</span>
              <span className="muted">
                {prefix}{d.value.toLocaleString()} · {pct}%
              </span>
            </div>
            <div className="bar-track" style={{ height: 14 }}>
              <span style={{ width: `${pct}%`, background: color, opacity: 1 - i * 0.16 }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
