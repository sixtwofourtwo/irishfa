// Chart palette as concrete hex values (Recharts needs real colours, not CSS vars).
// These mirror the validated categorical palette in index.css.
export const SERIES = {
  1: '#2a78d6', // blue
  2: '#eb6834', // orange
  3: '#1baf7a', // aqua
  4: '#eda100', // yellow
  5: '#e87ba4', // magenta
  6: '#008300', // green
  7: '#4a3aa7', // violet
  8: '#e34948', // red
}

export const BRAND = {
  600: '#0a7d3c',
  500: '#10914a',
  400: '#37a869',
  100: '#e2f2e8',
}

export const INK = {
  1: '#0f1a14',
  2: '#45514a',
  3: '#77837b',
  grid: '#e8ebe9',
  axis: '#c3c2b7',
}

export const STATUS = {
  good: '#0ca30c',
  warning: '#e19305',
  serious: '#d9722f',
  critical: '#d03b3b',
}

// Convenience ordered list for cycling in fixed order (never generated hues).
export const SERIES_ORDER = [SERIES[1], SERIES[2], SERIES[3], SERIES[4], SERIES[5], SERIES[6], SERIES[7], SERIES[8]]
