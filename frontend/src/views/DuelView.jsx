import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { DUEL_STATS } from '../constants'
import { BackIcon, ShareIcon, TrophyIcon, CameraIcon } from '../components/Icons'
import './DuelView.css'

export default function DuelView() {
  const navigate = useNavigate()
  const { 
    primaryCar, setPrimaryCar, 
    plate, setPlate, 
    searchBrand, setSearchBrand, 
    searchRange, setSearchRange, 
    searchModel, setSearchModel, 
    setDuelMode 
  } = useStore()
  
  const [competitorCar, setCompetitorCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // If no primary car, this screen makes no sense, go home
    if (!primaryCar) {
      navigate('/')
      return
    }

    async function loadCompetitor() {
      try {
        let url
        if (plate) {
          url = `/api/vehicle/by-plate/${encodeURIComponent(plate)}`
        } else if (searchBrand && searchModel) {
          url = `/api/vehicle/by-model?brand=${encodeURIComponent(searchBrand)}&range=${encodeURIComponent(searchRange)}&model=${encodeURIComponent(searchModel)}`
        } else {
          throw new Error("Concurrent introuvable (pas de données de recherche)")
        }

        const res = await fetch(url)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Véhicule concurrent introuvable')
        setCompetitorCar(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    loadCompetitor()
  }, [])

  if (loading) {
    return (
      <div className="duel-screen duel-centered">
        <div>Chargement du duel…</div>
      </div>
    )
  }

  if (error || !competitorCar) {
    return (
      <div className="duel-screen duel-centered">
        <div style={{ color: '#db3b2e', marginBottom: '20px' }}>{error}</div>
        <button className="rescan-btn" onClick={() => navigate('/')}>Retour</button>
      </div>
    )
  }

  // Parse stats safely
  const parseStat = (val) => {
    if (!val || val === 'N/A') return 0
    const num = parseFloat(String(val).replace(/[^0-9.]/g, ''))
    return isNaN(num) ? 0 : num
  }

  let primaryWins = 0
  let competitorWins = 0

  const statRows = DUEL_STATS.map(stat => {
    const val1 = parseStat(primaryCar[stat.key])
    const val2 = parseStat(competitorCar[stat.key])

    let leftWins = false
    let rightWins = false

    if (val1 !== 0 && val2 !== 0 && val1 !== val2) {
      if (stat.higherIsBetter) {
        leftWins = val1 > val2
        rightWins = val2 > val1
      } else {
        leftWins = val1 < val2
        rightWins = val2 < val1
      }
    }

    if (leftWins) primaryWins++
    if (rightWins) competitorWins++

    const display1 = val1 ? `${val1} ${stat.unit}` : 'N/A'
    const display2 = val2 ? `${val2} ${stat.unit}` : 'N/A'

    return (
      <div className="stat-row" key={stat.key}>
        <div className="stat-header">
          <span className={`brand left ${leftWins ? 'winner' : ''}`}>{primaryCar.brand}</span>
          <span className="stat-title">{stat.label}</span>
          <span className={`brand right ${rightWins ? 'winner' : ''}`}>{competitorCar.brand}</span>
        </div>
        <div className="stat-bars">
          <div className={`stat-bar left ${leftWins ? 'winner' : ''}`}>
            {display1}
          </div>
          <div className={`stat-bar right ${rightWins ? 'winner' : ''}`}>
            {display2}
          </div>
        </div>
      </div>
    )
  })

  let winnerText = "ÉGALITÉ"
  let winnerClass = "tie"
  let winnerDesc = "Les deux véhicules font jeu égal."

  if (primaryWins > competitorWins) {
    winnerText = primaryCar.full || primaryCar.name
    winnerClass = "left"
    winnerDesc = `${primaryCar.brand} domine avec de meilleures performances globales.`
  } else if (competitorWins > primaryWins) {
    winnerText = competitorCar.full || competitorCar.name
    winnerClass = "right"
    winnerDesc = `${competitorCar.brand} domine avec de meilleures performances globales.`
  }

  const goRescan = () => {
    setPlate('')
    setSearchBrand('')
    setSearchRange('')
    setSearchModel('')
    setPrimaryCar(null)
    setDuelMode(false)
    navigate('/')
  }

  return (
    <div className="duel-screen">
      <div className="duel-header">
        <button className="back-btn" onClick={() => navigate('/fiche')}>
          <BackIcon />
        </button>
        <div className="header-title">RÉSULTAT DU DUEL</div>
        <button className="share-btn">
          <ShareIcon />
        </button>
      </div>

      <div className="duel-photos">
        <div className="photo-left">
          <div className="photo-plate">{primaryCar.plate || 'N/A'}</div>
          <div className="photo-name">{primaryCar.full || primaryCar.name}</div>
          <div className="photo-sub">plaque scannée</div>
        </div>
        <div className="vs-badge">
          <span className="vs-v">V</span><span className="vs-s">S</span>
        </div>
        <div className="photo-right">
          <div className="photo-plate">{competitorCar.plate || 'N/A'}</div>
          <div className="photo-name">{competitorCar.full || competitorCar.name}</div>
          <div className="photo-sub">plaque competitor</div>
        </div>
      </div>

      <div className="duel-stats">
        {statRows}
      </div>

      <div className="duel-summary">
        <div className="summary-title">VAINQUEUR</div>
        <div className={`summary-winner ${winnerClass}`}>
          {winnerClass !== 'tie' && <TrophyIcon />}
          {winnerText}
        </div>
        <div className="summary-desc">{winnerDesc}</div>

        <button className="rescan-btn" onClick={goRescan}>
          <CameraIcon />
          RESCANNER UNE PLAQUE
        </button>
      </div>
    </div>
  )
}
