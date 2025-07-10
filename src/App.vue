<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';

// Impor semua komponen layout yang dibutuhkan
import Navbar from './components/Navbar.vue'; // Navbar untuk halaman publik
import Sidebar from './components/Sidebar.vue'; // Sidebar untuk halaman admin/dashboard
import Footer from './components/Footer.vue'; // Footer untuk halaman publik

// Mengambil informasi route saat ini untuk logika kondisional
const route = useRoute();

// Computed property untuk mengecek apakah route saat ini adalah halaman login admin
// Logika ini tetap sama seperti kode Anda sebelumnya.
const isAdminLoginRoute = computed(() => route.path === '/admin/login');
</script>

<template>
  <div id="app-container">
    
    <!-- Tampilkan Navbar HANYA JIKA BUKAN halaman login admin -->
    <Navbar v-if="!isAdminLoginRoute" />

    <div class="main-content">
      
      <!-- Tampilkan Sidebar HANYA JIKA BUKAN halaman login admin -->
      <!-- Logika ini juga tetap sama seperti kode Anda sebelumnya. -->
      <Sidebar v-if="!isAdminLoginRoute" />
      
      <!-- Area konten utama -->
      <!-- Class akan berubah secara dinamis berdasarkan route -->
      <div :class="{'content-area': !isAdminLoginRoute, 'full-width-content': isAdminLoginRoute}">
        <router-view />
      </div>

    </div>

    <!-- Tampilkan Footer HANYA JIKA BUKAN halaman login admin -->
    <Footer v-if="!isAdminLoginRoute" />

  </div>
</template>

<style>
/* Styling dasar untuk layout (tetap sama seperti kode Anda) */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.content-area {
  flex: 1;
  padding: 20px;
}

.full-width-content {
  flex: 1;
  /* Dihapus padding agar bisa di-style dari komponen login itu sendiri */
  /* padding: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
