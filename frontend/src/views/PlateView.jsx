import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './PlateView.css'

export default function PlateView() {
  const navigate = useNavigate()
  const { setPlate } = useStore()
  const [val, setVal] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!val.trim()) return
    setPlate(val.toUpperCase())
    navigate('/fiche')
  }

  return (
    <div className="plate-screen">
      <div className="top-tab-bar">
        <button className="tab" onClick={() => navigate('/scan')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          Scan
        </button>
        <button className="tab active">
          <span className="tab-hash">#</span> Plaque
        </button>
        <button className="tab" onClick={() => navigate('/search')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Modèle
        </button>
      </div>

      <div className="plate-content">
        <div className="plate-icon-wrap">
          <div className="plate-icon-bg">
            <svg width="32" height="24" viewBox="0 0 28 20" fill="none" stroke="#AC53F2" strokeWidth="2" strokeLinecap="round">
              <rect x="1" y="1" width="26" height="18" rx="3"/>
              <path d="M6 10h16"/>
              <path d="M9 14.5h10"/>
            </svg>
          </div>
        </div>

        <h1 className="plate-title">Saisir une plaque</h1>
        <p className="plate-desc">Entrez le numéro d'immatriculation du véhicule pour obtenir sa fiche technique complète.</p>

        <form onSubmit={submit} className="plate-form">
          <input
            type="text"
            className="plate-input"
            placeholder="AA-000-AA"
            value={val}
            onChange={e => setVal(e.target.value.toUpperCase())}
            autoFocus
          />
          <button type="submit" className="plate-submit">
            Go !
          </button>
        </form>
      </div>
    </div>
  )
}
