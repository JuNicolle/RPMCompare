import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './PlateView.css'

export default function PlateView() {
  const navigate = useNavigate()
  const { setPlate } = useStore()
  const [plate, setLocalPlate] = useState('')

  function onInput(e) {
    setLocalPlate(e.target.value.toUpperCase().slice(0, 9))
  }

  function submit() {
    const clean = plate.replace(/[\s-]/g, '')
    if (clean.length >= 4) {
      setPlate(plate)
      navigate('/fiche')
    }
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

      <div className="plate-body">
        <div className="plate-label">Entrez une plaque</div>
        
        <div className="plate-input-wrap">
          <input
            type="text"
            value={plate}
            onChange={onInput}
            placeholder="Ex : AB-123-CD"
            maxLength={9}
            className="plate-text-input"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
          />
        </div>

        <button className="validate-btn" onClick={submit}>Go</button>
      </div>
    </div>
  )
}
