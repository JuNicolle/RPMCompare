import { Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView'
import ScanView from './views/ScanView'
import PlateView from './views/PlateView'
import SearchView from './views/SearchView'
import FicheView from './views/FicheView'
import './App.css'

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="time">9:41</span>
      <div className="notch"></div>
      <div className="status-icons">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="#f2f3f5"/>
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#f2f3f5"/>
          <rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="#f2f3f5"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#f2f3f5" opacity=".3"/>
        </svg>
        <div className="battery">
          <div className="battery-body">
            <div className="battery-fill"></div>
          </div>
          <div className="battery-tip"></div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="screen-area">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/scan" element={<ScanView />} />
          <Route path="/plate" element={<PlateView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/fiche" element={<FicheView />} />
        </Routes>
      </div>
    </div>
  )
}
