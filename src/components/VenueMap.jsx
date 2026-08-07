// A schematic (not survey-accurate) map of Northern Ireland with the Women's
// Senior Team's home grounds marked. External map tiles are blocked in this
// environment, so the outline and Lough Neagh are hand-drawn inline SVG; marker
// positions are approximate but geographically sensible.
//
//   • bubble SIZE  = average attendance at that ground
//   • bubble COLOUR = average utilisation (avg attendance ÷ capacity)
//   • number       = rank by average attendance (matches the table)

// Simplified NI coastline (clockwise from the north-west / Foyle).
const LAND =
  'M113,79 L100,52 L120,30 L178,26 L208,34 L216,64 L262,96 L272,126 ' +
  'L250,150 L288,140 L302,146 L298,190 L278,196 L262,216 L214,248 ' +
  'L150,236 L32,178 L28,120 L60,86 Z'

const UTIL_BANDS = [
  { min: 30, color: '#0ca30c', label: '30%+ full' },
  { min: 15, color: '#e19305', label: '15–29% full' },
  { min: 0, color: '#d03b3b', label: 'Under 15% full' },
]
const UNKNOWN = { color: '#8a938c', label: 'Capacity not recorded' }

function bandColor(avgUtil) {
  if (avgUtil == null) return UNKNOWN.color
  return UTIL_BANDS.find((b) => avgUtil >= b.min).color
}

// Bubble radius scaled by average attendance (max ~5,500 -> r 16).
function radius(avg, maxAvg) {
  return 6 + (Math.sqrt(avg) / Math.sqrt(maxAvg)) * 10
}

export default function VenueMap({ venues }) {
  const maxAvg = Math.max(...venues.map((v) => v.avg || 0))
  // Draw largest first so smaller markers sit on top and stay legible.
  const ordered = [...venues].sort((a, b) => (b.avg || 0) - (a.avg || 0))

  return (
    <div>
      <svg viewBox="0 0 340 270" width="100%" role="img" aria-label="Map of Northern Ireland home venues" style={{ display: 'block' }}>
        <rect x="0" y="0" width="340" height="270" rx="12" fill="#eef5fb" />
        {/* Land */}
        <path d={LAND} fill="#e7f0ea" stroke="#c6d4cb" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Lough Neagh */}
        <ellipse cx="199" cy="149" rx="14" ry="26" fill="#dcebf8" stroke="#c6d4cb" strokeWidth="1" />
        <text x="199" y="151" textAnchor="middle" fontSize="6.5" fill="#8aa0b4" style={{ pointerEvents: 'none' }}>
          Lough
        </text>
        <text x="199" y="158" textAnchor="middle" fontSize="6.5" fill="#8aa0b4" style={{ pointerEvents: 'none' }}>
          Neagh
        </text>

        {/* Markers */}
        {ordered.map((v) => {
          if (v.x == null) return null
          const r = radius(v.avg, maxAvg)
          const color = bandColor(v.avgUtil)
          return (
            <g key={v.venue}>
              <title>
                {`${v.venue} — avg ${v.avg?.toLocaleString()}${v.avgUtil != null ? ` (${v.avgUtil}% of capacity)` : ''}`}
              </title>
              <circle cx={v.x} cy={v.y} r={r} fill={color} fillOpacity="0.85" stroke="#fff" strokeWidth="2" />
              <text x={v.x} y={v.y + 3.4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" style={{ pointerEvents: 'none' }}>
                {v.rank}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex between wrap gap-12" style={{ marginTop: 10 }}>
        <div className="legend">
          {UTIL_BANDS.map((b) => (
            <span className="legend-item" key={b.label}>
              <span className="legend-swatch" style={{ background: b.color, borderRadius: '50%' }} />
              {b.label}
            </span>
          ))}
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: UNKNOWN.color, borderRadius: '50%' }} />
            {UNKNOWN.label}
          </span>
        </div>
        <span className="muted small">Bubble size = average attendance</span>
      </div>
    </div>
  )
}
