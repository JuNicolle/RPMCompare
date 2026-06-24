import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './SearchView.css'

const BRANDS = ['BMW', 'Audi', 'Mercedes-AMG', 'Porsche', 'Renault']

const RANGES = {
  'BMW':          ['Série 1', 'Série 3', 'Série 4', 'Série 5', 'X3 M'],
  'Audi':         ['A3', 'A5', 'RS3', 'RS6', 'TT RS'],
  'Mercedes-AMG': ['A 45 S', 'C 63', 'E 63', 'GT', 'G 63'],
  'Porsche':      ['718', '911', 'Taycan', 'Panamera', 'Cayenne'],
  'Renault':      ['Clio', 'Mégane RS', 'Alpine A110', 'Austral', 'Arkana']
}

const MODELS = ['M3 Compétition', 'M3 CS', 'M3 Touring', '320d xDrive']

const TITLES = ['Choisir une marque', 'Choisir une gamme', 'Choisir un modèle']

export default function SearchView() {
  const navigate = useNavigate()
  const { setPlate, setSearchBrand, setSearchRange } = useStore()
  const [step, setStep] = useState(0)
  const [brand, setBrand] = useState('')
  const [range, setRange] = useState('')

  const title = TITLES[step]
  const crumb = [brand, range].filter(Boolean).join('  ›  ')

  function currentList() {
    if (step === 0) return BRANDS
    if (step === 1) return RANGES[brand] || []
    return MODELS
  }

  function pick(item) {
    if (step === 0) {
      setBrand(item)
      setStep(1)
    } else if (step === 1) {
      setRange(item)
      setStep(2)
    } else {
      setPlate('')
      setSearchBrand(brand)
      setSearchRange(range)
      navigate('/fiche')
    }
  }

  function goBack() {
    if (step === 0) {
      navigate('/')
    } else {
      if (step === 1) setRange('')
      setStep(s => s - 1)
    }
  }

  return (
    <div className="search-screen">
      <div className="search-header">
        <button className="back-btn" onClick={goBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="header-text">
          <div className="header-title">{title}</div>
          {crumb && <div className="header-crumb">{crumb}</div>}
        </div>
      </div>

      <div className="list-area">
        {currentList().map(item => (
          <button key={item} className="list-item" onClick={() => pick(item)}>
            <span className="item-label">{item}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#424855" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
