import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './FicheView.css'

export default function FicheView() {
  const navigate = useNavigate()
  const { plate, searchBrand, searchRange, searchModel } = useStore()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        let url
        if (plate) {
          url = `/api/vehicle/by-plate/${encodeURIComponent(plate)}`
        } else {
          url = `/api/vehicle/by-model?brand=${encodeURIComponent(searchBrand)}&range=${encodeURIComponent(searchRange)}&model=${encodeURIComponent(searchModel)}`
        }
        const res = await fetch(url)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Véhicule introuvable')
        setCar(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="fiche-screen fiche-centered">
        <div className="fiche-status">Chargement…</div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="fiche-screen fiche-centered">
        <div className="fiche-status fiche-error">{error || 'Données introuvables'}</div>
        <button className="fiche-back-btn" onClick={() => navigate('/')}>Retour</button>
      </div>
    )
  }

  return (
    <div className="fiche-screen">
      <div className="photo-placeholder-area">
        <div className="header-nav">
          <button className="back-icon-btn" onClick={() => navigate('/')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className="page-title">Modèle</div>
        </div>
      </div>

      <div className="main-card">
        <div className="car-title">{car.full}</div>

        <div className="stats-circles">
          <div className="stat-circle stat-cyan">
            <div className="stat-circle-label">Chevaux</div>
            <div className="stat-circle-val">{car.power || '-'} ch</div>
          </div>
          <div className="stat-circle stat-red">
            <div className="stat-circle-label">Couple</div>
            <div className="stat-circle-val">{car.torque || '-'} nm</div>
          </div>
          <div className="stat-circle stat-purple">
            <div className="stat-circle-label">0-100</div>
            <div className="stat-circle-val">{car.accel || '-'} s</div>
          </div>
        </div>
      </div>

      <div className="specs-list">
        <div className="spec-item">
          <div className="spec-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="spec-text">
            <div className="spec-name">Moteur</div>
            <div className="spec-desc">{car.engine || '-'} · {car.fuel || '-'}</div>
          </div>
        </div>

        <div className="spec-separator"></div>

        <div className="spec-item">
          <div className="spec-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="spec-text">
            <div className="spec-name">Transmission</div>
            <div className="spec-desc">{car.drive || '-'} · {car.gearbox || '-'}</div>
          </div>
        </div>

        <div className="spec-separator"></div>

        <div className="spec-item">
          <div className="spec-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="spec-text">
            <div className="spec-name">Performances</div>
            <div className="spec-desc">V-Max : {car.vmax || '-'} · Poids : {car.weight || '-'}</div>
          </div>
        </div>
      </div>

      <div className="pro-wrap">
        <button className="get-pro-btn">Get PRO</button>
      </div>
    </div>
  )
}
