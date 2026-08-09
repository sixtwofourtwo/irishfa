import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { titleByPath } from '../nav.js'
import Logo from './Logo.jsx'

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
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

      <button
        className="topbar__icon"
        aria-label="Alerts & Insights"
        title="Alerts & Insights"
        onClick={() => navigate('/alerts')}
      >
        <Bell size={18} />
        <span className="dot" />
      </button>

      <div className="avatar" title="Irish Football Association">
        <Logo size={30} fallback={<span>IFA</span>} />
      </div>
    </header>
  )
}
