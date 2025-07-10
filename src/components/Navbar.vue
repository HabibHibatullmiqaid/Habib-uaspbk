<template>
  <header class="site-header">
    <nav class="nav-container">
      <div class="nav-brand">
        <RouterLink to="/">
          Info Natuna 🏝️
        </RouterLink>
      </div>

      <ul class="nav-links">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/destinasi">Destinasi</RouterLink>
        </li>
        <li>
          <RouterLink to="/artikel">Artikel</RouterLink>
        </li>
        <li>
          <RouterLink to="/tentang">Tentang</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.site-header {
  /* Membuat navbar menempel di atas saat di-scroll */
  position: sticky;
  top: 0;
  z-index: 1000;

  /* Efek glassmorphism modern */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 2rem;
}

.nav-container {
  display: flex;
  justify-content: space-between; /* Mendorong brand ke kiri dan links ke kanan */
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-brand a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50; /* Warna biru gelap */
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem; /* Jarak antar link */
  margin: 0;
  padding: 0;
}

.nav-links a {
  font-size: 1rem;
  font-weight: 600;
  color: #34495e; /* Warna abu-abu kebiruan */
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db; /* Warna biru cerah */
  transform: scaleX(0); /* Awalnya garis tidak terlihat */
  transform-origin: center;
  transition: transform 0.3s ease;
}

.nav-links a:hover {
  color: #3498db;
}

.nav-links a:hover::after {
  transform: scaleX(1); /* Tampilkan garis saat di-hover */
}

/* Style khusus untuk link yang sedang aktif */
.nav-links a.router-link-exact-active {
  color: #2980b9; /* Warna biru lebih gelap untuk link aktif */
  font-weight: 700;
}

.nav-links a.router-link-exact-active::after {
  transform: scaleX(1);
  background-color: #2980b9;
}
</style>