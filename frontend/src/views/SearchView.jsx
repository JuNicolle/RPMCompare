import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './SearchView.css'

const TITLES = ['Choisir une marque', 'Choisir une gamme', 'Choisir un modèle']

export default function SearchView() {
  const navigate = useNavigate()
  const { setPlate, setSearchBrand, setSearchRange, setSearchModel } = useStore()
  const [step, setStep] = useState(0)
  const [brand, setBrand] = useState('')
  const [range, setRange] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const title = TITLES[step]
  const crumb = [brand, range].filter(Boolean).join('  ›  ')

  async function fetchList(url) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error()
      setList(await res.json())
    } catch {
      setError('Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (step === 0) fetchList('/api/brands')
  }, [])

  useEffect(() => {
    if (step === 1) fetchList(`/api/brands/${encodeURIComponent(brand)}/ranges`)
    if (step === 2) fetchList(`/api/brands/${encodeURIComponent(brand)}/ranges/${encodeURIComponent(range)}/models`)
  }, [step])

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
      setSearchModel(item)
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
        {loading && <div className="list-status">Chargement…</div>}
        {error && <div className="list-status list-error">{error}</div>}
        {!loading && !error && list.map(item => (
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
