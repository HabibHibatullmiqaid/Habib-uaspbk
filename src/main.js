import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Impor createPinia

import App from './App.vue'
import router from './router'
import axios from 'axios' // Pastikan axios terpasang jika belum

// Impor CSS global jika ada
import './assets/main.css'

// Buat aplikasi Vue
const app = createApp(App)

// 2. Buat instance Pinia
const pinia = createPinia()

// 3. Gunakan Pinia di dalam aplikasi Anda
// PENTING: Ini harus dilakukan SEBELUM app.use(router)
app.use(pinia)

// 4. Gunakan Router
app.use(router)

// 5. Mount aplikasi ke elemen #app di index.html
app.mount('#app')

// Konfigurasi default untuk Axios (opsional tapi direkomendasikan)
axios.defaults.baseURL = 'http://localhost:3000';
