<template>
  <div class="scan-screen">
    <div class="scan-header">
      <button class="back-btn" @click="leave">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <span class="scan-label">SCANNER</span>
    </div>

    <div class="viewfinder">
      <!-- Flux caméra -->
      <video v-if="!cameraError" ref="videoRef" class="camera-feed" autoplay playsinline muted></video>

      <!-- Fallback si caméra indisponible -->
      <div v-else class="camera-error">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#db3b2e" stroke-width="1.5" stroke-linecap="round">
          <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <p>Caméra inaccessible</p>
        <button class="fallback-btn" @click="leave">Saisir manuellement</button>
      </div>

      <div class="vf-grid"></div>

      <!-- Cadre de visée plaque -->
      <div class="plate-guide">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
        <div v-if="!processing" class="scan-line"></div>
      </div>

      <!-- Readout -->
      <div class="readout">
        <div class="detected-plate">{{ displayPlate }}</div>
        <div class="status-label" :class="{ detected, blinking: !detected && !processing }">
          {{ statusText }}
        </div>
      </div>
    </div>

    <!-- Déclencheur -->
    <div class="shutter-bar">
      <button class="shutter-btn" :class="{ processing }" :disabled="processing || cameraError" @click="capture">
        <div class="shutter-inner"></div>
      </button>
    </div>

    <canvas ref="canvasRef" style="display:none"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const videoRef = ref(null)
const canvasRef = ref(null)
const streamRef = ref(null)
const cameraError = ref(false)
const processing = ref(false)
const detected = ref(false)
const displayPlate = ref('–  –  –')

const ocrError = ref('')

const statusText = computed(() => {
  if (detected.value) return '✓  Véhicule identifié'
  if (processing.value) return 'Analyse en cours…'
  if (ocrError.value) return ocrError.value
  return 'Centrez la plaque et déclenchez'
})

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    })
    streamRef.value = stream
    videoRef.value.srcObject = stream
  } catch {
    cameraError.value = true
  }
}

function stopCamera() {
  streamRef.value?.getTracks().forEach(t => t.stop())
}

function leave() {
  stopCamera()
  router.push('/')
}

async function capture() {
  if (processing.value || !videoRef.value) return
  processing.value = true

  const video = videoRef.value
  const canvas = canvasRef.value
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
        ocrError.value = data.error || 'Plaque non reconnue, réessayez'
        processing.value = false
        return
      }

      displayPlate.value = data.plate
      store.plate = data.plate
      detected.value = true
      ocrError.value = ''

      setTimeout(() => {
        stopCamera()
        router.push('/fiche')
      }, 950)
    } catch {
      ocrError.value = 'Erreur réseau'
      processing.value = false
    }
  }, 'image/jpeg', 0.92)
}

onMounted(startCamera)
onUnmounted(stopCamera)
</script>

<style scoped>
.scan-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #060709;
}

.scan-header {
  display: flex;
  align-items: center;
  padding: 14px 18px 10px;
  gap: 12px;
  flex: none;
}

.back-btn {
  background: rgba(255,255,255,.07);
  border-radius: 12px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f2f3f5;
}

.scan-label {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 3px;
  color: #9aa0aa;
}

.viewfinder {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #040507;
}

.camera-feed {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #5a6272;
  font-size: 14px;
  font-family: 'IBM Plex Mono', monospace;
}

.fallback-btn {
  margin-top: 8px;
  padding: 10px 20px;
  background: #db3b2e;
  color: #fff;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.vf-grid {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,.015) 0 1px, transparent 1px 4px);
  pointer-events: none;
}

.plate-guide {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 72px;
}

.corner {
  position: absolute;
  width: 24px;
  height: 24px;
}
.tl { top:0;left:0; border-top:2.5px solid #db3b2e; border-left:2.5px solid #db3b2e; border-radius:4px 0 0 0; }
.tr { top:0;right:0; border-top:2.5px solid #db3b2e; border-right:2.5px solid #db3b2e; border-radius:0 4px 0 0; }
.bl { bottom:0;left:0; border-bottom:2.5px solid #db3b2e; border-left:2.5px solid #db3b2e; border-radius:0 0 0 4px; }
.br { bottom:0;right:0; border-bottom:2.5px solid #db3b2e; border-right:2.5px solid #db3b2e; border-radius:0 0 4px 0; }

.scan-line {
  position: absolute;
  left: 4px; right: 4px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #db3b2e 30%, #ff7060 50%, #db3b2e 70%, transparent 100%);
  animation: rpm-scanline 1.8s ease-in-out infinite;
  border-radius: 1px;
  box-shadow: 0 0 12px rgba(219,59,46,.8), 0 0 24px rgba(219,59,46,.3);
  pointer-events: none;
}

.readout {
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 260px;
}

.detected-plate {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 7px;
  color: #f2f3f5;
  margin-bottom: 11px;
}

.status-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 1px;
  color: #8b9099;
}
.status-label.detected { color: #4ade80; }
.status-label.blinking { animation: rpm-blink 1.2s ease-in-out infinite; }

.shutter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex: none;
}

.shutter-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 5px rgba(255,255,255,.15);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.shutter-btn.processing { opacity: 0.4; }
.shutter-btn:disabled { cursor: not-allowed; }

.shutter-inner {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #e0e0e0;
}
</style>
