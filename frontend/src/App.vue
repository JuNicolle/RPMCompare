<template>
  <div class="phone-shell">
    <!-- Status bar -->
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="notch"></div>
      <div class="status-icons">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="#f2f3f5"/>
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#f2f3f5"/>
          <rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="#f2f3f5"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#f2f3f5" opacity=".3"/>
        </svg>
        <div class="battery">
          <div class="battery-body">
            <div class="battery-fill"></div>
          </div>
          <div class="battery-tip"></div>
        </div>
      </div>
    </div>
    <!-- Screen content -->
    <div class="screen-area">
      <router-view v-slot="{ Component }">
        <transition name="screen">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.phone-shell {
  width: 100%;
  max-width: 390px;
  height: 100vh;
  background: #0b0c10;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.status-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 24px 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: #f2f3f5;
  flex: none;
  z-index: 10;
}

.notch {
  position: absolute;
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
  width: 96px;
  height: 26px;
  background: #000;
  border-radius: 14px;
  z-index: 20;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.battery {
  display: flex;
  align-items: center;
  gap: 1px;
}

.battery-body {
  width: 24px;
  height: 11px;
  border: 1.5px solid #f2f3f5;
  border-radius: 3px;
  padding: 1.5px;
}

.battery-fill {
  height: 100%;
  width: 78%;
  background: #f2f3f5;
  border-radius: 1px;
}

.battery-tip {
  width: 2px;
  height: 5px;
  background: #f2f3f5;
  border-radius: 0 1px 1px 0;
  opacity: .6;
  margin-left: -1px;
}

.screen-area {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.screen-area > * {
  position: absolute;
  inset: 0;
}
</style>
