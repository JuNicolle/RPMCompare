import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './ScanView.css'

export default function ScanView() {
  const navigate = useNavigate()
  const { setPlate } = useStore()
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraError, setCameraError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [cameraStopped, setCameraStopped] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [detected, setDetected] = useState(false)
  const [displayPlate, setDisplayPlate] = useState('–  –  –')
  const [ocrError, setOcrError] = useState('')

  function statusText() {
    if (detected) return '✓  Véhicule identifié'
    if (processing) return 'Analyse en cours…'
    if (ocrError) return ocrError
    if (!videoReady) return 'Initialisation caméra…'
    return 'Centrez la plaque et déclenchez'
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      setCameraError(true)
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }

  function leave() {
    stopCamera()
    navigate('/')
  }

  function handleShutter() {
    if (processing || cameraStopped) return
    // Arrête le preview, ouvre la caméra native iOS via file input
    stopCamera()
    setCameraStopped(true)
    fileInputRef.current?.click()
  }

  async function handleFileSelected(e) {
    const file = e.target.files?.[0]
    if (!file) {
      // L'utilisateur a annulé → relance le preview
      setCameraStopped(false)
      setVideoReady(false)
      startCamera()
      return
    }

    setProcessing(true)
    setOcrError('')

    const formData = new FormData()
    formData.append('image', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/vehicle/scan')
    xhr.timeout = 20000

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300 && data.plate) {
          setDisplayPlate(data.plate)
          setPlate(data.plate)
          setDetected(true)
          setTimeout(() => navigate('/fiche'), 950)
        } else {
          setOcrError(`[${xhr.status}] ${data.error || 'Plaque non reconnue'}`)
          setProcessing(false)
        }
      } catch {
        setOcrError(xhr.responseText.slice(0, 120) || `Réponse invalide [${xhr.status}]`)
        setProcessing(false)
      }
    }

    xhr.onerror = () => { setOcrError('Erreur réseau XHR'); setProcessing(false) }
    xhr.ontimeout = () => { setOcrError('Délai dépassé (20s)'); setProcessing(false) }

    xhr.send(formData)
  }

  function retry() {
    setOcrError('')
    setProcessing(false)
    setCameraStopped(false)
    setVideoReady(false)
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ''
    startCamera()
  }

  useEffect(() => {
    startCamera()
    return stopCamera
  }, [])

  const statusClass = `status-label${detected ? ' detected' : ''}${!detected && !processing && !ocrError ? ' blinking' : ''}${ocrError ? ' error' : ''}`
  const shutterDisabled = processing || cameraStopped

  return (
    <div className="scan-screen">
      <div className="top-tab-bar">
        <button className="tab active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          Scan
        </button>
        <button className="tab" onClick={() => { leave(); navigate('/plate') }}>
          <span className="tab-hash">#</span> Plaque
        </button>
        <button className="tab" onClick={() => { leave(); navigate('/search') }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Modèle
        </button>
      </div>

      <div className="viewfinder">
        {!cameraError && !cameraStopped && (
          <video ref={videoRef} className="camera-feed" autoPlay playsInline muted
            onLoadedMetadata={() => setVideoReady(true)} />
        )}

        {cameraStopped && processing && !ocrError && !detected && (
          <div className="camera-stopped">
            <div className="spinner"></div>
          </div>
        )}

        {cameraError && (
          <div className="camera-error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#db3b2e" strokeWidth="1.5" strokeLinecap="round">
              <path d="M23 7l-7 5 7 5V7z"/>
              <rect x="1" y="5" width="15" height="14" rx="2"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
            <p>Appuyez sur le bouton pour prendre une photo</p>
          </div>
        )}

        <div className="vf-grid"></div>

        <div className="plate-guide">
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>
          {!processing && !cameraStopped && <div className="scan-line"></div>}
        </div>

        <div className="readout">
          <div className="detected-plate">{displayPlate}</div>
          <div className={statusClass}>{statusText()}</div>
          {ocrError && (
            <button className="retry-btn" onClick={retry}>Réessayer</button>
          )}
        </div>
      </div>

      <div className="shutter-bar">
        <button
          className={`shutter-btn${shutterDisabled ? ' processing' : ''}`}
          disabled={shutterDisabled}
          onClick={handleShutter}
        >
          <div className="shutter-inner"></div>
        </button>
      </div>

      {/* Input caméra natif iOS — déclenché par le bouton shutter */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileSelected}
      />
    </div>
  )
}
