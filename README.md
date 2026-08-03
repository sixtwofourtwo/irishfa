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
> **What this is *not*:** a live data integration. All figures are realistic but
> **illustrative mock data** — no real personal data and no live connections to
> Ticketmaster, Opta, Mailchimp, etc. Those integrations would require API
> credentials, commercial agreements and GDPR/data-sharing controls that sit
> outside the scope of a prototype.

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

- **Executive Dashboard** — cross-source KPIs, engagement & the consolidation story
- **Alerts & Insights** — auto-surfaced opportunities and risks
- **Fan 360 Profiles** — every supporter as one unified record, with a full activity timeline
- **Segmentation** — behavioural audiences for personalised targeting
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

*Prototype — illustrative data only. Not affiliated with, or endorsed by, the
Irish Football Association. Third-party names (Ticketmaster, Opta, Mailchimp,
Tableau, etc.) are used only to illustrate data-source types.*
