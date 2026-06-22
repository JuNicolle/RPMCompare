<template>
  <div class="fiche-screen">
    <!-- Photo header -->
    <div class="photo-header">
      <div class="photo-placeholder">BMW M3 CS · photo</div>
      <div class="photo-overlay"></div>

      <button class="back-pill" @click="$router.push('/')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <div v-if="plateDisplay" class="plate-badge">{{ plateDisplay }}</div>

      <div class="photo-title">
        <div class="car-full">{{ car.full }}</div>
        <div class="car-meta">
          <span>{{ car.year }}</span>
          <span class="dot"></span>
          <span>{{ car.fuel }}</span>
          <span class="dot"></span>
          <span>{{ car.code }}</span>
        </div>
      </div>
    </div>

    <!-- Red accent line -->
    <div class="accent-line"></div>

    <!-- Gauges -->
    <div class="gauges">
      <!-- Power -->
      <div class="gauge-card">
        <div class="gauge-svg-wrap">
          <svg width="110" height="110" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1e2a" stroke-width="8" stroke-linecap="round"
              :stroke-dasharray="`235.6 314.16`" transform="rotate(135 60 60)"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#db3b2e" stroke-width="8" stroke-linecap="round"
              :stroke-dasharray="`${powerFill} 314.16`" transform="rotate(135 60 60)"
              style="filter:drop-shadow(0 0 8px rgba(219,59,46,.6))"/>
          </svg>
          <div class="gauge-value">
            <span class="gauge-number">{{ car.power }}</span>
            <span class="gauge-unit power-unit">CH</span>
          </div>
        </div>
        <div class="gauge-label">PUISSANCE</div>
      </div>

      <!-- Torque -->
      <div class="gauge-card">
        <div class="gauge-svg-wrap">
          <svg width="110" height="110" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1e2a" stroke-width="8" stroke-linecap="round"
              :stroke-dasharray="`235.6 314.16`" transform="rotate(135 60 60)"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#8a2820" stroke-width="8" stroke-linecap="round"
              :stroke-dasharray="`${torqueFill} 314.16`" transform="rotate(135 60 60)"
              style="filter:drop-shadow(0 0 8px rgba(138,40,32,.6))"/>
          </svg>
          <div class="gauge-value">
            <span class="gauge-number">{{ car.torque }}</span>
            <span class="gauge-unit torque-unit">NM</span>
          </div>
        </div>
        <div class="gauge-label">COUPLE</div>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="quick-stats">
      <div class="stat-card">
        <div class="stat-value">{{ car.accel }}</div>
        <div class="stat-label">0–100 KM/H</div>
      </div>
      <div class="stat-card">
        <div class="stat-value stat-red">{{ car.vmax }}</div>
        <div class="stat-label">V-MAX</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ car.weight }}</div>
        <div class="stat-label">POIDS</div>
      </div>
    </div>

    <!-- Specs -->
    <div class="specs-section">
      <div class="specs-title">CARACTÉRISTIQUES</div>
      <div class="spec-row">
        <span class="spec-key">Motorisation</span>
        <span class="spec-val">{{ car.engine }}</span>
      </div>
      <div class="spec-row">
        <span class="spec-key">Boîte de vitesse</span>
        <span class="spec-val">{{ car.gearbox }}</span>
      </div>
      <div class="spec-row">
        <span class="spec-key">Transmission</span>
        <span class="spec-val">{{ car.drive }}</span>
      </div>
      <div class="spec-row">
        <span class="spec-key">Cylindrée</span>
        <span class="spec-val">{{ car.displacement }}</span>
      </div>
      <div class="spec-row spec-row-last">
        <span class="spec-key">Carburant</span>
        <span class="spec-val">{{ car.fuel }}</span>
      </div>
    </div>

    <!-- Comparateur ghost -->
    <div class="comparateur-wrap">
      <button class="comparateur-btn">+ COMPARATEUR · BIENTÔT</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store.js'

const car = {
  brand: 'BMW',
  model: 'M3 CS',
  full: 'BMW M3 CS',
  year: '2023',
  engine: '3.0L 6-cyl. biturbo',
  code: 'S58',
  displacement: '2 993 cm³',
  fuel: 'Essence',
  gearbox: 'Auto. 8 rapports',
  drive: 'M xDrive intégrale',
  power: '550',
  torque: '650',
  weight: '1 765 kg',
  accel: '3,4 s',
  vmax: '302 km/h'
}

const plateDisplay = computed(() => store.plate || 'GT-550-MS')
const powerFill = computed(() => Math.min(parseInt(car.power) / 600, 1) * 235.6)
const torqueFill = computed(() => Math.min(parseInt(car.torque) / 700, 1) * 235.6)
</script>

<style scoped>
.fiche-screen {
  height: 100%;
  overflow-y: auto;
}

/* Photo header */
.photo-header {
  height: 226px;
  background: repeating-linear-gradient(140deg, #171b24 0 16px, #111520 16px 32px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-placeholder {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: #262c38;
  padding-top: 16px;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,.35) 0%, transparent 45%, rgba(11,12,16,0) 60%, rgba(11,12,16,1) 100%);
}

.back-pill {
  position: absolute;
  top: 12px;
  left: 14px;
  width: 36px;
  height: 36px;
  background: rgba(0,0,0,.55);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.plate-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(0,0,0,.6);
  border: 1px solid rgba(219,59,46,.45);
  border-radius: 9px;
  padding: 5px 11px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11.5px;
  font-weight: 700;
  color: #db3b2e;
  letter-spacing: 2px;
  z-index: 2;
}

.photo-title {
  position: absolute;
  bottom: 18px;
  left: 18px;
  right: 18px;
  z-index: 2;
}

.car-full {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 1px;
  line-height: 1.1;
}

.car-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
  font-size: 13px;
  color: #8b9099;
}

.dot {
  width: 3px;
  height: 3px;
  background: #3a4050;
  border-radius: 50%;
}

/* Accent line */
.accent-line {
  height: 2px;
  background: linear-gradient(90deg, #db3b2e 0%, rgba(219,59,46,.2) 70%, transparent 100%);
}

/* Gauges */
.gauges {
  display: flex;
  gap: 10px;
  padding: 16px 16px 10px;
}

.gauge-card {
  flex: 1;
  background: #0d0f16;
  border: 1px solid #1a1e2a;
  border-radius: 18px;
  padding: 14px 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-svg-wrap {
  position: relative;
  width: 110px;
  height: 110px;
}

.gauge-value {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gauge-number {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
}

.gauge-unit {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  margin-top: 3px;
  letter-spacing: 2.5px;
}

.power-unit { color: #db3b2e; }
.torque-unit { color: #8a2820; }

.gauge-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 3px;
  color: #424855;
  margin-top: 8px;
}

/* Quick stats */
.quick-stats {
  display: flex;
  gap: 8px;
  padding: 0 16px 14px;
}

.stat-card {
  flex: 1;
  background: #0d0f16;
  border: 1px solid #1a1e2a;
  border-radius: 13px;
  padding: 11px 10px;
  text-align: center;
}

.stat-value {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.stat-red {
  color: #db3b2e;
}

.stat-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.5px;
  color: #424855;
  margin-top: 4px;
}

/* Specs */
.specs-section {
  padding: 4px 18px 8px;
  border-top: 1px solid #131620;
}

.specs-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2.5px;
  color: #424855;
  padding: 10px 0 6px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #131620;
}

.spec-row-last {
  border-bottom: none;
}

.spec-key {
  color: #5a6272;
  font-size: 13.5px;
}

.spec-val {
  font-size: 13.5px;
  font-weight: 600;
  text-align: right;
  max-width: 170px;
}

/* Comparateur */
.comparateur-wrap {
  padding: 4px 16px 32px;
}

.comparateur-btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background: transparent;
  border: 1px dashed #222630;
  color: #363d4a;
  font-size: 12px;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 2px;
  cursor: default;
}
</style>
