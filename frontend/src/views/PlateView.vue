<template>
  <div class="plate-screen">
    <div class="plate-header">
      <button class="back-btn" @click="$router.push('/')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <span class="header-label">SAISIE MANUELLE</span>
    </div>

    <div class="plate-body">
      <p class="hint">
        Immatriculation au format <span class="mono">AA-000-AA</span>
      </p>

      <!-- EU-style plate input -->
      <div class="plate-input-wrap">
        <div class="eu-band">
          <div class="eu-stars">
            <span v-for="i in 9" :key="i" class="star" :class="{ hidden: [5].includes(i) }">★</span>
          </div>
          <span class="eu-letter">F</span>
        </div>
        <input
          ref="inputRef"
          type="text"
          v-model="plate"
          @input="onInput"
          placeholder="AB-123-CD"
          maxlength="9"
          class="plate-text-input"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
        />
      </div>

      <button class="validate-btn" @click="submit">Valider</button>

      <div class="example">EX : GT-550-MS</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const plate = ref('')

function onInput(e) {
  plate.value = e.target.value.toUpperCase().slice(0, 9)
}

function submit() {
  const clean = plate.value.replace(/[\s-]/g, '')
  if (clean.length >= 4) {
    store.plate = plate.value
    router.push('/fiche')
  }
}
</script>

<style scoped>
.plate-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.plate-header {
  display: flex;
  align-items: center;
  padding: 14px 18px 10px;
  gap: 12px;
  flex: none;
}

.back-btn {
  background: #1a1e28;
  border-radius: 12px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f2f3f5;
}

.header-label {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 3px;
  color: #9aa0aa;
}

.plate-body {
  padding: 22px 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hint {
  font-size: 14.5px;
  color: #8b9099;
  line-height: 1.65;
  margin: 0;
}

.mono {
  font-family: 'IBM Plex Mono', monospace;
  color: #c8ccd2;
}

.plate-input-wrap {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #ced2d8;
  background: #f2f4f0;
  height: 68px;
}

.eu-band {
  width: 34px;
  background: #1b3fae;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0 6px;
  flex: none;
}

.eu-stars {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5px;
}

.star {
  font-size: 3px;
  color: #ffd700;
  line-height: 1;
}

.star.hidden {
  visibility: hidden;
}

.eu-letter {
  font-size: 11px;
  font-weight: 800;
  color: #ffd700;
}

.plate-text-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #0f1115;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 4px;
  padding: 0 14px;
  text-transform: uppercase;
}

.plate-text-input::placeholder {
  color: #b0b8c0;
  letter-spacing: 2px;
}

.validate-btn {
  background: #db3b2e;
  border-radius: 16px;
  padding: 17px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  width: 100%;
  border: none;
  cursor: pointer;
}

.validate-btn:active {
  background: #c43327;
}

.example {
  font-size: 12px;
  color: #424855;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 1px;
}
</style>
