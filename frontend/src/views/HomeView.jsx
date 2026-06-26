import { useNavigate } from 'react-router-dom'
import './HomeView.css'

export default function HomeView() {
  const navigate = useNavigate()
  return (
    <div className="home">
      <div className="header">
        <div className="wordmark">RPM<span className="accent">COMPARE</span></div>
        <div className="tagline">IDENTIFIEZ INSTANTANÉMENT</div>
      </div>

      <div className="cards">
        <button className="card card-scan" onClick={() => navigate('/scan')}>
          <div className="card-icon">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
              <path d="M2 7.5V4a2 2 0 0 1 2-2h3.5"/>
              <path d="M24 7.5V4a2 2 0 0 0-2-2h-3.5"/>
              <path d="M2 18.5V22a2 2 0 0 0 2 2h3.5"/>
              <path d="M24 18.5V22a2 2 0 0 1-2 2h-3.5"/>
              <circle cx="13" cy="13" r="3.5"/>
            </svg>
          </div>
          <div className="card-text">
            <div className="card-title">Scanner une plaque</div>
            <div className="card-sub">Reconnaissance auto · instantané</div>
          </div>
          <svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </button>

        <button className="card card-dark" onClick={() => navigate('/plate')}>
          <div className="card-icon card-icon-dark">
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="#db3b2e" strokeWidth="2" strokeLinecap="round">
              <rect x="1" y="1" width="26" height="18" rx="3"/>
              <path d="M6 10h16"/>
              <path d="M9 14.5h10"/>
            </svg>
          </div>
          <div className="card-text">
            <div className="card-title">Saisir une plaque</div>
            <div className="card-sub card-sub-dark">Entrée manuelle · AA-000-AA</div>
          </div>
          <svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3e4455" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </button>

        <button className="card card-dark card-disabled" disabled>
          <div className="card-icon card-icon-dark">
            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke="#db3b2e" strokeWidth="2.2" strokeLinecap="round">
              <path d="M2 4h22"/>
              <path d="M5.5 10h15"/>
              <path d="M10 16h6"/>
            </svg>
          </div>
          <div className="card-text">
            <div className="card-title">Recherche par modèle</div>
            <div className="card-sub card-sub-dark">Bientôt disponible</div>
          </div>
          <span className="card-badge">SOON</span>
        </button>
      </div>

      <div className="footer">v0.1 PROTOTYPE · JUIN 2026</div>
    </div>
  )
}
