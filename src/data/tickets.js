// ---------------------------------------------------------------------------
// Ticket types — every attendee carries a ticket-type flag. Counts are derived
// illustratively from real attendance (tickets ≈ attendance), split by typical
// proportions. Campaign Cards are a planned future development, so always 0.
// Prices are chosen so the season's paid/discounted/group income lands close to
// the £152k ticketing figure used elsewhere.
// ---------------------------------------------------------------------------
import { matchHistory, NI_GROUNDS } from './matchHistory.js'

const NI = new Set(NI_GROUNDS)

export const TICKET_TYPES = [
  { key: 'paid', label: 'Paid', prop: 0.62, price: 16, color: 'var(--series-1)', icon: 'Ticket' },
  { key: 'discounted', label: 'Discounted', prop: 0.18, price: 7, color: 'var(--series-3)', icon: 'TicketPercent' },
  { key: 'group', label: 'Group Allocation', prop: 0.12, price: 9, color: 'var(--series-2)', icon: 'Users' },
  { key: 'complimentary', label: 'Complimentary', prop: 0.08, price: 0, color: 'var(--series-7)', icon: 'Gift' },
  { key: 'campaign', label: 'Campaign Cards', prop: 0, price: 0, color: 'var(--series-4)', icon: 'CreditCard', planned: true },
]

// Split a ticket total into the five types (Campaign Cards = 0; Paid takes the
// remainder so the parts always sum exactly to the total).
export function ticketCounts(total) {
  const complimentary = Math.round(total * 0.08)
  const discounted = Math.round(total * 0.18)
  const group = Math.round(total * 0.12)
  const campaign = 0
  const paid = Math.max(0, total - complimentary - discounted - group - campaign)
  return { paid, discounted, group, complimentary, campaign }
}

// Aggregate ticket counts across a list of fixtures.
export function ticketsForMatches(list) {
  const total = list.reduce((s, m) => s + (m.attendance || 0), 0)
  return { total, counts: ticketCounts(total) }
}

// Home fixtures at NI grounds with a recorded attendance (where tickets sell).
export const homeTicketMatches = matchHistory.filter(
  (m) => m.home && NI.has(m.venue) && typeof m.attendance === 'number',
)

// Latest season aggregate — used for the Revenue income-by-ticket-type cards.
const seasons = [...new Set(homeTicketMatches.map((m) => m.season))].sort()
export const latestSeason = seasons[seasons.length - 1]

const seasonMatches = homeTicketMatches.filter((m) => m.season === latestSeason)
export const seasonTickets = ticketsForMatches(seasonMatches)

export const ticketIncome = TICKET_TYPES.map((t) => ({
  ...t,
  count: seasonTickets.counts[t.key],
  income: seasonTickets.counts[t.key] * t.price,
}))
