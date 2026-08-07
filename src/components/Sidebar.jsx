import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { nav } from '../nav.js'

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <Icons.ShieldCheck size={22} color="#fff" />
        </div>
        <div>
          <h1>Fan Intelligence</h1>
          <span>Irish FA · Women's Senior Team</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {nav.map((group) => (
          <div key={group.section}>
            <div className="sidebar__section">{group.section}</div>
            {group.items.map((item) => {
              const Icon = Icons[item.icon] || Icons.Circle
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="nav-link"
                  onClick={onClose}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span>{item.label}</span>
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar__foot">
        <div><strong>Prototype</strong> · shell demonstrator</div>
        <div style={{ marginTop: 4 }}>Illustrative data only</div>
      </div>
    </aside>
  )
}
