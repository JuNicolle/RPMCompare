import { Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView'
import ScanView from './views/ScanView'
import PlateView from './views/PlateView'
import SearchView from './views/SearchView'
import FicheView from './views/FicheView'
import DuelView from './views/DuelView'
import './App.css'

export default function App() {
  return (
    <div className="phone-shell">
      <div className="screen-area">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/scan" element={<ScanView />} />
          <Route path="/plate" element={<PlateView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/fiche" element={<FicheView />} />
          <Route path="/duel" element={<DuelView />} />
        </Routes>
      </div>
    </div>
  )
}
