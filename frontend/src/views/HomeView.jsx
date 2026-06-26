import { useNavigate } from 'react-router-dom'
import './HomeView.css'

export default function HomeView() {
  const navigate = useNavigate()
  return (
    <div className="home">
      <div className="header">
        <div className="wordmark">RPM<span className="accent"> COMPARE</span></div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-gradient" onClick={() => navigate('/scan')}>
          Scanner une plaque
        </button>

        <button className="btn btn-cyan" onClick={() => navigate('/plate')}>
          Saisir une plaque
        </button>

        <button className="btn btn-outline" onClick={() => navigate('/search')}>
          Recherche par modèle
        </button>
      </div>
    </div>
  )
}
