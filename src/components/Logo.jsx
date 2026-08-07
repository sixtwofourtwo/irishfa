import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

// Renders the Irish FA crest from /public. Tries the SVG, then a PNG, then
// falls back to a neutral shield mark if neither file is present yet — so the
// UI never shows a broken image before the real logo has been added to the repo.
// To brand the platform, drop the crest into:  public/ifa-crest.svg  (or .png)
const SOURCES = ['/ifa-crest.svg', '/ifa-crest.png']

export default function Logo({ size = 32, fallback = null, alt = 'Irish Football Association crest' }) {
  const [stage, setStage] = useState(0)

  if (stage >= SOURCES.length) {
    return fallback ?? <ShieldCheck size={size} color="var(--brand-600)" />
  }

  return (
    <img
      src={SOURCES[stage]}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={() => setStage((s) => s + 1)}
    />
  )
}
