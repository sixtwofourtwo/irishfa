// A real map of Northern Ireland (11 council districts) with the Women's Senior
// Team's home grounds plotted at their true coordinates.
//   • bubble SIZE   = average attendance at that ground
//   • bubble COLOUR = average utilisation (avg attendance ÷ capacity)
//   • number        = rank by average attendance (matches the table)
//
// The boundary is a bundled TopoJSON (public/topo_lgd.json, OSNI/OGL), decoded
// with topojson-client and projected with d3-geo — all client-side and
// same-origin, so it renders on the live site and in previews alike. If the
// file ever fails to load, we fall back to a simple schematic outline.
import { useEffect, useMemo, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature, mesh } from 'topojson-client'

const W = 340
const H = 300
const PAD = 14

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
function radius(avg, maxAvg) {
  return 6 + (Math.sqrt(avg) / Math.sqrt(maxAvg)) * 10
}

// Fallback schematic outline (used only if the boundary file can't be loaded).
const SCHEMATIC =
  'M113,79 L100,52 L120,30 L178,26 L208,34 L216,64 L262,96 L272,126 ' +
  'L250,150 L288,140 L302,146 L298,190 L278,196 L262,216 L214,248 ' +
  'L150,236 L32,178 L28,120 L60,86 Z'

export default function VenueMap({ venues }) {
  const [topo, setTopo] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch('/topo_lgd.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('load failed'))))
      .then((d) => alive && setTopo(d))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  const geo = useMemo(() => {
    if (!topo || !topo.objects) return null
    try {
      const obj = topo.objects.lgd || topo.objects[Object.keys(topo.objects)[0]]
      const fc = feature(topo, obj)
      const inner = mesh(topo, obj, (a, b) => a !== b)
      const outer = mesh(topo, obj, (a, b) => a === b)
      const projection = geoMercator().fitExtent([[PAD, PAD], [W - PAD, H - PAD]], fc)
      const path = geoPath(projection)
      return { fc, inner, outer, projection, path }
    } catch {
      return null
    }
  }, [topo])

  const maxAvg = Math.max(...venues.map((v) => v.avg || 0))
  const ordered = [...venues].sort((a, b) => (b.avg || 0) - (a.avg || 0))
  const useReal = geo && !failed

  // Project a venue to x/y — real projection if available, else schematic x/y.
  // dx/dy are small legibility nudges for grounds that sit on top of each other
  // (e.g. the two Belfast venues), applied only on the real map.
  const pos = (v) => {
    if (useReal && v.lng != null && v.lat != null) {
      const p = geo.projection([v.lng, v.lat])
      return p ? { x: p[0] + (v.dx || 0), y: p[1] + (v.dy || 0) } : null
    }
    return v.x != null ? { x: v.x, y: v.y } : null
  }

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Map of Northern Ireland home venues" style={{ display: 'block' }}>
        <rect x="0" y="0" width={W} height={H} rx="12" fill="#eef5fb" />

        {useReal ? (
          <>
            {geo.fc.features.map((f, i) => (
              <path key={i} d={geo.path(f)} fill="#e7f0ea" />
            ))}
            <path d={geo.path(geo.inner)} fill="none" stroke="#cfdbd2" strokeWidth="0.6" />
            <path d={geo.path(geo.outer)} fill="none" stroke="#b3c4ba" strokeWidth="1.3" strokeLinejoin="round" />
          </>
        ) : (
          <path d={SCHEMATIC} fill="#e7f0ea" stroke="#c6d4cb" strokeWidth="1.5" strokeLinejoin="round" />
        )}

        {/* Markers */}
        {ordered.map((v) => {
          const p = pos(v)
          if (!p) return null
          const r = radius(v.avg, maxAvg)
          return (
            <g key={v.venue}>
              <title>
                {`${v.venue} — avg ${v.avg?.toLocaleString()}${v.avgUtil != null ? ` (${v.avgUtil}% of capacity)` : ''}`}
              </title>
              <circle cx={p.x} cy={p.y} r={r} fill={bandColor(v.avgUtil)} fillOpacity="0.85" stroke="#fff" strokeWidth="2" />
              <text x={p.x} y={p.y + 3.4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" style={{ pointerEvents: 'none' }}>
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
