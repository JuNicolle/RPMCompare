import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import './ScanView.css'

export default function ScanView() {
  const navigate = useNavigate()
  const { setPlate } = useStore()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraError, setCameraError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [detected, setDetected] = useState(false)
  const [displayPlate, setDisplayPlate] = useState('–  –  –')
  const [ocrError, setOcrError] = useState('')

  function statusText() {
    if (detected) return '✓  Véhicule identifié'
    if (processing) return 'Analyse en cours…'
    if (ocrError) return ocrError
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
  }

  function leave() {
    stopCamera()
    navigate('/')
  }

  async function capture() {
    if (processing || !videoRef.current) return
    setProcessing(true)

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)

    canvas.toBlob(async (blob) => {
      try {
        const formData = new FormData()
        formData.append('image', blob, 'plate.jpg')
        const res = await fetch('/api/vehicle/scan', { method: 'POST', body: formData })
        const data = await res.json()

        if (!res.ok) {
          setOcrError(data.error || 'Plaque non reconnue, réessayez')
          setProcessing(false)
          return
        }

        setDisplayPlate(data.plate)
        setPlate(data.plate)
        setDetected(true)
        setOcrError('')

        setTimeout(() => {
          stopCamera()
          navigate('/fiche')
        }, 950)
      } catch {
        setOcrError('Erreur réseau')
        setProcessing(false)
      }
    }, 'image/jpeg', 0.92)
  }

  useEffect(() => {
    startCamera()
    return stopCamera
  }, [])

  const statusClass = `status-label${detected ? ' detected' : ''}${!detected && !processing ? ' blinking' : ''}`

  return (
    <div className="scan-screen">
      <div className="scan-header">
        <button className="back-btn" onClick={leave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="scan-label">SCANNER</span>
      </div>

      <div className="viewfinder">
        {!cameraError ? (
          <video ref={videoRef} className="camera-feed" autoPlay playsInline muted />
        ) : (
          <div className="camera-error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#db3b2e" strokeWidth="1.5" strokeLinecap="round">
              <path d="M23 7l-7 5 7 5V7z"/>
              <rect x="1" y="5" width="15" height="14" rx="2"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
            <p>Caméra inaccessible</p>
            <button className="fallback-btn" onClick={leave}>Saisir manuellement</button>
          </div>
        )}

        <div className="vf-grid"></div>

        <div className="plate-guide">
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>
          {!processing && <div className="scan-line"></div>}
        </div>

        <div className="readout">
          <div className="detected-plate">{displayPlate}</div>
          <div className={statusClass}>{statusText()}</div>
        </div>
      </div>

      <div className="shutter-bar">
        <button
          className={`shutter-btn${processing ? ' processing' : ''}`}
          disabled={processing || cameraError}
          onClick={capture}
        >
          <div className="shutter-inner"></div>
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
