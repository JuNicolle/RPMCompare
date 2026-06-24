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
      <div className="plate-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="header-label">SAISIE MANUELLE</span>
      </div>

      <div className="plate-body">
        <p className="hint">
          Immatriculation au format <span className="mono">AA-000-AA</span>
        </p>

        <div className="plate-input-wrap">
          <div className="eu-band">
            <div className="eu-stars">
              {[1,2,3,4,5,6,7,8,9].map(i => (
                <span key={i} className={`star${i === 5 ? ' hidden' : ''}`}>★</span>
              ))}
            </div>
            <span className="eu-letter">F</span>
          </div>
          <input
            type="text"
            value={plate}
            onChange={onInput}
            placeholder="AB-123-CD"
            maxLength={9}
            className="plate-text-input"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
          />
        </div>

        <button className="validate-btn" onClick={submit}>Valider</button>

        <div className="example">EX : GT-550-MS</div>
      </div>
    </div>
  )
}
