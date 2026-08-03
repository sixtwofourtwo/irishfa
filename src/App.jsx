import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Alerts from './pages/Alerts.jsx'
import Fans from './pages/Fans.jsx'
import FanDetail from './pages/FanDetail.jsx'
import Segments from './pages/Segments.jsx'
import Campaigns from './pages/Campaigns.jsx'
import Matches from './pages/Matches.jsx'
import Revenue from './pages/Revenue.jsx'
import Sources from './pages/Sources.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile drawer and scroll to top on navigation.
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
      <div className="main">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/fans" element={<Fans />} />
            <Route path="/fans/:id" element={<FanDetail />} />
            <Route path="/segments" element={<Segments />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
