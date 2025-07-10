<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-content">
        <p class="copyright">
          Hak Cipta © 2025 Info Pulau Natuna. All Rights Reserved.
        </p>
        <p class="tagline">
          Menjelajahi Pesona Gerbang Utara Indonesia.
        </p>
      </div>
      <div class="social-links">
        <a href="#" target="_blank" aria-label="Facebook">Facebook</a>
        <span>|</span>
        <a href="#" target="_blank" aria-label="Instagram">Instagram</a>
        <span>|</span>
        <a href="#" target="_blank" aria-label="Twitter">Twitter</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Untuk komponen footer sederhana ini, tidak diperlukan logika JavaScript.
// Script setup dibiarkan kosong namun tetap ada untuk potensi pengembangan di masa depan.
</script>

<style scoped>
/* 'scoped' berarti style ini hanya berlaku untuk komponen Footer.vue */
.site-footer {
  background-color: #2c3e50; /* Warna biru gelap yang elegan */
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  margin-bottom: 1rem;
}

.copyright {
  margin: 0;
  font-weight: 500;
}

.tagline {
  margin: 0.5rem 0 0;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
}

.social-links a {
  color: white;
  text-decoration: none;
  margin: 0 0.75rem;
  transition: color 0.3s ease;
  font-weight: bold;
}

.social-links a:hover {
  color: #3498db; /* Warna biru cerah saat di-hover */
}

.social-links span {
  color: rgba(255, 255, 255, 0.4);
}
</style>