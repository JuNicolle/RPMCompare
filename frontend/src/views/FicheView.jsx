import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './FicheView.css'

const car = {
  full: 'BMW M3 CS',
  year: '2023',
  engine: '3.0L 6-cyl. biturbo',
  code: 'S58',
  displacement: '2 993 cm³',
  fuel: 'Essence',
  gearbox: 'Auto. 8 rapports',
  drive: 'M xDrive intégrale',
  power: '550',
  torque: '650',
  weight: '1 765 kg',
  accel: '3,4 s',
  vmax: '302 km/h'
}

export default function FicheView() {
  const navigate = useNavigate()
  const { plate } = useStore()
  const plateDisplay = plate || 'GT-550-MS'
  const powerFill = Math.min(parseInt(car.power) / 600, 1) * 235.6
  const torqueFill = Math.min(parseInt(car.torque) / 700, 1) * 235.6

  return (
    <div className="fiche-screen">
      <div className="photo-header">
        <div className="photo-placeholder">BMW M3 CS · photo</div>
        <div className="photo-overlay"></div>

        <button className="back-pill" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {plateDisplay && <div className="plate-badge">{plateDisplay}</div>}

        <div className="photo-title">
          <div className="car-full">{car.full}</div>
          <div className="car-meta">
            <span>{car.year}</span>
            <span className="dot"></span>
            <span>{car.fuel}</span>
            <span className="dot"></span>
            <span>{car.code}</span>
          </div>
        </div>
      </div>

      <div className="accent-line"></div>

      <div className="gauges">
        <div className="gauge-card">
          <div className="gauge-svg-wrap">
            <svg width="110" height="110" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1e2a" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="235.6 314.16" transform="rotate(135 60 60)"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#db3b2e" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${powerFill} 314.16`} transform="rotate(135 60 60)"
                style={{ filter: 'drop-shadow(0 0 8px rgba(219,59,46,.6))' }}/>
            </svg>
            <div className="gauge-value">
              <span className="gauge-number">{car.power}</span>
              <span className="gauge-unit power-unit">CH</span>
            </div>
          </div>
          <div className="gauge-label">PUISSANCE</div>
        </div>

        <div className="gauge-card">
          <div className="gauge-svg-wrap">
            <svg width="110" height="110" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1e2a" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="235.6 314.16" transform="rotate(135 60 60)"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#8a2820" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${torqueFill} 314.16`} transform="rotate(135 60 60)"
                style={{ filter: 'drop-shadow(0 0 8px rgba(138,40,32,.6))' }}/>
            </svg>
            <div className="gauge-value">
              <span className="gauge-number">{car.torque}</span>
              <span className="gauge-unit torque-unit">NM</span>
            </div>
          </div>
          <div className="gauge-label">COUPLE</div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-value">{car.accel}</div>
          <div className="stat-label">0–100 KM/H</div>
        </div>
        <div className="stat-card">
          <div className="stat-value stat-red">{car.vmax}</div>
          <div className="stat-label">V-MAX</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{car.weight}</div>
          <div className="stat-label">POIDS</div>
        </div>
      </div>

      <div className="specs-section">
        <div className="specs-title">CARACTÉRISTIQUES</div>
        <div className="spec-row">
          <span className="spec-key">Motorisation</span>
          <span className="spec-val">{car.engine}</span>
        </div>
        <div className="spec-row">
          <span className="spec-key">Boîte de vitesse</span>
          <span className="spec-val">{car.gearbox}</span>
        </div>
        <div className="spec-row">
          <span className="spec-key">Transmission</span>
          <span className="spec-val">{car.drive}</span>
        </div>
        <div className="spec-row">
          <span className="spec-key">Cylindrée</span>
          <span className="spec-val">{car.displacement}</span>
        </div>
        <div className="spec-row spec-row-last">
          <span className="spec-key">Carburant</span>
          <span className="spec-val">{car.fuel}</span>
        </div>
      </div>

      <div className="comparateur-wrap">
        <button className="comparateur-btn">+ COMPARATEUR · BIENTÔT</button>
      </div>
    </div>
  )
}
