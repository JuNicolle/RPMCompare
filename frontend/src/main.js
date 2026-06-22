import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import HomeView from './views/HomeView.vue'
import ScanView from './views/ScanView.vue'
import PlateView from './views/PlateView.vue'
import SearchView from './views/SearchView.vue'
import FicheView from './views/FicheView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/scan', component: ScanView },
    { path: '/plate', component: PlateView },
    { path: '/search', component: SearchView },
    { path: '/fiche', component: FicheView }
  ]
})

createApp(App).use(router).mount('#app')
