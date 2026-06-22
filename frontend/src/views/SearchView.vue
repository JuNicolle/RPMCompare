<template>
  <div class="search-screen">
    <div class="search-header">
      <button class="back-btn" @click="goBack">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <div class="header-text">
        <div class="header-title">{{ title }}</div>
        <div v-if="crumb" class="header-crumb">{{ crumb }}</div>
      </div>
    </div>

    <div class="list-area">
      <button
        v-for="item in currentList"
        :key="item"
        class="list-item"
        @click="pick(item)"
      >
        <span class="item-label">{{ item }}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#424855" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const step = ref(0)
const brand = ref('')
const range = ref('')

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

const title = computed(() => TITLES[step.value])

const crumb = computed(() => {
  const parts = [brand.value, range.value].filter(Boolean)
  return parts.join('  ›  ')
})

const currentList = computed(() => {
  if (step.value === 0) return BRANDS
  if (step.value === 1) return RANGES[brand.value] || []
  return MODELS
})

function pick(item) {
  if (step.value === 0) {
    brand.value = item
    step.value = 1
  } else if (step.value === 1) {
    range.value = item
    step.value = 2
  } else {
    store.plate = ''
    store.searchBrand = brand.value
    store.searchRange = range.value
    router.push('/fiche')
  }
}

function goBack() {
  if (step.value === 0) {
    router.push('/')
  } else {
    step.value--
    if (step.value === 0) range.value = ''
  }
}
</script>

<style scoped>
.search-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 14px 18px 12px;
  gap: 12px;
  flex: none;
  border-bottom: 1px solid #151820;
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
  flex: none;
}

.header-text {
  flex: 1;
}

.header-title {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 2.5px;
  color: #f2f3f5;
}

.header-crumb {
  font-size: 11px;
  color: #db3b2e;
  margin-top: 2px;
  font-family: 'IBM Plex Mono', monospace;
}

.list-area {
  flex: 1;
  overflow-y: auto;
}

.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: transparent;
  border-bottom: 1px solid #131620;
  color: #f2f3f5;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s;
}

.list-item:active {
  background: #131620;
}

.item-label {
  font-size: 15.5px;
  font-weight: 500;
}
</style>
