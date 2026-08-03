import { useLocation } from 'react-router-dom'
import { Search, Bell, Menu, CalendarDays } from 'lucide-react'
import { titleByPath } from '../nav.js'

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation()
  // Longest matching prefix so detail routes still resolve a title.
  const title =
    titleByPath[pathname] ||
    (pathname.startsWith('/fans') ? 'Fan 360 Profiles' : 'Fan Intelligence Platform')

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <div>
        <div className="topbar__title">{title}</div>
        <div className="topbar__crumb">Irish Football Association · Women's Senior Team</div>
      </div>

      <div className="topbar__spacer" />

      <div className="search">
        <Search size={16} />
        <input placeholder="Search fans, segments, campaigns…" aria-label="Search" />
      </div>

      <div className="badge gray" title="Reporting period">
        <CalendarDays size={14} /> 2025/26 Season
      </div>

      <button className="topbar__icon" aria-label="Notifications">
        <Bell size={18} />
        <span className="dot" />
      </button>

      <div className="avatar" title="Signed in (demo)">IFA</div>
    </header>
  )
}
