# Fan Intelligence Platform — IFA Women's Senior Team

A **clickable shell prototype** of a consolidated fan-data platform for the
**Irish Football Association (Northern Ireland) Women's Senior Team**.

Built for the *Evolving Technologies in Sport* module (PgDip Sports Analytics,
Technology & Innovation), addressing the challenge of
**Multi-Platform Fan Engagement and Personalisation**.

> **What this is:** a high-fidelity, front-end demonstrator that shows what a
> unified "single pane of glass" for supporter data would look and feel like for
> IFA decision-makers.
>
> **What this is *not*:** a live data integration. Most figures are realistic but
> **illustrative mock data** — no real personal data and no live connections to
> Ticketmaster, Opta, Mailchimp, etc. Those integrations would require API
> credentials, commercial agreements and GDPR/data-sharing controls that sit
> outside the scope of a prototype.
>
> **One dataset is real:** the **Match-day & Attendance** screen is powered by an
> actual IFA record of 73 Northern Ireland Women's Senior Team fixtures
> (2017–2026) — real dates, competitions, venues, capacities, attendances and
> results (`src/data/matchHistory.js`). It demonstrates the platform working with
> genuine data, including the "assortment of venues" reality: home games rotate
> across six grounds around Northern Ireland (Seaview, Windsor Park, Mourneview
> Park, Shamrock Park, Inver Park and the Ballymena Showgrounds).

---

## The problem it addresses

Supporter data for the Women's Senior Team currently lives in **seven
disconnected systems**. No single view of a fan exists, so decision-makers
cannot see the whole picture. This platform demonstrates how those silos could
be consolidated into one unified fan record.

| # | Source | What it holds |
|---|--------|---------------|
| 1 | **Stadium App** | Match-day behaviour & concourse spend |
| 2 | **Ticketmaster** | Ticketing, attendance & renewals |
| 3 | **Opta** | On-pitch match & performance data |
| 4 | **Social Media** | Instagram, TikTok, X & Facebook engagement |
| 5 | **Mailchimp** | Email marketing & subscriber CRM |
| 6 | **Winners (Tableau)** | Operational & commercial dashboards |
| 7 | **Web & Fan Accounts** | Registrations, consent & preferences |

## Modules (screens)

- **Fanbase Overview** — cross-source KPIs, a **retention "second-match" band** (returning fans, at-risk fans), engagement, gender split & the consolidation story
- **Alerts & Insights** — auto-surfaced opportunities and risks
- **Fan Segmentation** — attendee personas (Families, Young Female Fans, Group & Club Bookers) and lifecycle segments, each linking to its fans
- **Fan 360 Profiles** — every supporter (female *and* male) as one unified record, filterable by segment and retention status, with a "What do we know about this fan?" view, activity timeline and next-best-action
- **Campaigns & Content** — cross-platform activity, personalisation & performance
- **Match-day / Opta** — on-pitch data joined to fan behaviour
- **Revenue & Monetisation** — consolidated commercial view by stream & segment
- **Data Sources** — the seven connectors and how consolidation works

---

## Running locally

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Deployment

The app is a static single-page app and deploys to **Vercel** or **Netlify**
with zero configuration — both config files are included.

### Netlify
1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project** → pick this repo.
3. Settings are auto-detected from `netlify.toml` (build `npm run build`,
   publish `dist`). Click **Deploy**.

### Vercel
1. Push this repo to GitHub.
2. In Vercel: **Add New → Project** → import this repo.
3. Settings are auto-detected from `vercel.json` (framework: Vite). Click
   **Deploy**.

Both configs include an SPA fallback so client-side routes (e.g. `/fans/1`)
resolve correctly on refresh and deep links.

---

## Tech stack

- **React 18** + **Vite** — fast, modern SPA tooling
- **React Router** — client-side navigation across the eight modules
- **Recharts** — charts (using a colourblind-safe, validated categorical palette)
- **lucide-react** — icons
- Plain CSS design system (`src/index.css`) themed to Irish FA green

## Project structure

```
src/
  components/   # Sidebar, Topbar, charts, shared UI primitives
  data/         # Mock data for all sources, fans, segments, campaigns, etc.
  pages/        # The eight module screens
  theme.js      # Chart palette (hex)
  nav.js        # Navigation config
  App.jsx       # Routes
  index.css     # Design system & tokens
```

---

*Prototype — illustrative data only. The Irish Football Association crest
(`public/ifa-crest.png`) is used with the IFA's permission for illustrative
purposes as part of this academic project. Third-party names (Ticketmaster,
Opta, Mailchimp, Tableau, etc.) are used only to illustrate data-source types.*
