<template>
  <div class="home">
    <div class="header">
      <div class="wordmark">RPM<span class="accent">COMPARE</span></div>
      <div class="tagline">IDENTIFIEZ INSTANTANÉMENT</div>
    </div>

    <div class="cards">
      <!-- Scanner -->
      <button class="card card-scan" @click="$router.push('/scan')">
        <div class="card-icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round">
            <path d="M2 7.5V4a2 2 0 0 1 2-2h3.5"/>
            <path d="M24 7.5V4a2 2 0 0 0-2-2h-3.5"/>
            <path d="M2 18.5V22a2 2 0 0 0 2 2h3.5"/>
            <path d="M24 18.5V22a2 2 0 0 1-2 2h-3.5"/>
            <circle cx="13" cy="13" r="3.5"/>
          </svg>
        </div>
        <div class="card-text">
          <div class="card-title">Scanner une plaque</div>
          <div class="card-sub">Reconnaissance auto · instantané</div>
        </div>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </button>

      <!-- Saisie manuelle -->
      <button class="card card-dark" @click="$router.push('/plate')">
        <div class="card-icon card-icon-dark">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="#db3b2e" stroke-width="2" stroke-linecap="round">
            <rect x="1" y="1" width="26" height="18" rx="3"/>
            <path d="M6 10h16"/>
            <path d="M9 14.5h10"/>
          </svg>
        </div>
        <div class="card-text">
          <div class="card-title">Saisir une plaque</div>
          <div class="card-sub card-sub-dark">Entrée manuelle · AA-000-AA</div>
        </div>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3e4455" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </button>

      <!-- Recherche -->
      <button class="card card-dark" @click="$router.push('/search')">
        <div class="card-icon card-icon-dark">
          <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke="#db3b2e" stroke-width="2.2" stroke-linecap="round">
            <path d="M2 4h22"/>
            <path d="M5.5 10h15"/>
            <path d="M10 16h6"/>
          </svg>
        </div>
        <div class="card-text">
          <div class="card-title">Recherche par modèle</div>
          <div class="card-sub card-sub-dark">Marque · Gamme · Modèle</div>
        </div>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3e4455" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </button>
    </div>

    <div class="footer">v0.1 PROTOTYPE · JUIN 2026</div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 18px 28px;
  overflow-y: auto;
}

.header {
  margin-bottom: 28px;
}

.wordmark {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 2px;
  line-height: 1.05;
}

.accent {
  color: #db3b2e;
}

.tagline {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #424855;
  letter-spacing: 2px;
  margin-top: 7px;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.card {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 22px;
  padding: 22px 20px;
  color: #fff;
  text-align: left;
  flex: 1;
  min-height: 112px;
  cursor: pointer;
}

.card-scan {
  background: linear-gradient(140deg, #a82820 0%, #db3b2e 55%, #ea4f42 100%);
  animation: rpm-pulseglow 2.8s ease-in-out infinite;
}

.card-dark {
  background: #131520;
  border: 1px solid #22263a;
  color: #f2f3f5;
}

.card-icon {
  flex: none;
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,.16);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon-dark {
  background: #1a1e30;
  border: 1px solid #28304a;
}

.card-text {
  flex: 1;
}

.card-title {
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 5px;
}

.card-sub {
  font-size: 12.5px;
  opacity: .82;
  line-height: 1.5;
}

.card-sub-dark {
  color: #5a6272;
  opacity: 1;
}

.chevron {
  flex: none;
}

.footer {
  margin-top: 20px;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: #282c38;
  letter-spacing: 2px;
}
</style>
