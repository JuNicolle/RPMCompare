<template>
  <div class="scan-screen">
    <div class="scan-header">
      <button class="back-btn" @click="$router.push('/')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <span class="scan-label">SCANNER</span>
    </div>

    <div class="viewfinder">
      <div class="vf-grid"></div>

      <!-- Plate guide corners -->
      <div class="plate-guide">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
        <div class="scan-line"></div>
      </div>

      <!-- Readout -->
      <div class="readout">
        <div class="detected-plate">{{ displayPlate }}</div>
        <div class="status-label" :class="{ detected, blinking: !detected }">
          {{ detected ? '✓  Véhicule identifié' : 'Lecture de la plaque…' }}
        </div>
      </div>
    </div>

    <!-- Shutter -->
    <div class="shutter-bar">
      <button class="shutter-btn" @click="goToFiche">
        <div class="shutter-inner"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const detected = ref(false)
const displayPlate = ref('–  –  –')

let t1, t2

function goToFiche() {
  store.plate = 'GT-550-MS'
  router.push('/fiche')
}

onMounted(() => {
  t1 = setTimeout(() => {
    detected.value = true
    displayPlate.value = 'GT-550-MS'
    store.plate = 'GT-550-MS'
    t2 = setTimeout(() => {
      router.push('/fiche')
    }, 950)
  }, 2400)
})

onUnmounted(() => {
  clearTimeout(t1)
  clearTimeout(t2)
})
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
  background: radial-gradient(ellipse at 50% 42%, #0e1114 0%, #040507 100%);
}

.vf-grid {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,.01) 0 1px, transparent 1px 4px);
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

.tl {
  top: 0; left: 0;
  border-top: 2.5px solid #db3b2e;
  border-left: 2.5px solid #db3b2e;
  border-radius: 4px 0 0 0;
}

.tr {
  top: 0; right: 0;
  border-top: 2.5px solid #db3b2e;
  border-right: 2.5px solid #db3b2e;
  border-radius: 0 4px 0 0;
}

.bl {
  bottom: 0; left: 0;
  border-bottom: 2.5px solid #db3b2e;
  border-left: 2.5px solid #db3b2e;
  border-radius: 0 0 0 4px;
}

.br {
  bottom: 0; right: 0;
  border-bottom: 2.5px solid #db3b2e;
  border-right: 2.5px solid #db3b2e;
  border-radius: 0 0 4px 0;
}

.scan-line {
  position: absolute;
  left: 4px;
  right: 4px;
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
  width: 250px;
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

.status-label.detected {
  color: #4ade80;
}

.status-label.blinking {
  animation: rpm-blink 1.2s ease-in-out infinite;
}

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
}

.shutter-inner {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #e0e0e0;
}
</style>
