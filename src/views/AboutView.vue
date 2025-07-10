<template>
  <div class="about-page">
    <div class="hero-section">
      <h1>Tentang Info Pulau Natuna</h1>
      <p class="subtitle">
        Membawa Pesona Tersembunyi dari Gerbang Utara Indonesia ke Dunia.
      </p>
    </div>

    <div class="content-wrapper">
      <section class="about-section">
        <h2>Misi Kami</h2>
        <p>
          "Info Pulau Natuna" lahir dari kecintaan kami terhadap keindahan alam, kekayaan budaya, dan potensi luar biasa yang dimiliki Kepulauan Natuna. Misi kami adalah menjadi sumber informasi digital yang terpercaya dan komprehensif, yang tidak hanya mempromosikan pariwisata tetapi juga mengedukasi masyarakat tentang pentingnya menjaga kelestarian surga tersembunyi ini.
        </p>
      </section>

      <section class="team-section">
        <h2>Pengembang</h2>
        <div class="team-member">
          <img src="" alt="Foto Pengembang" class="team-photo">
          <div class="team-info">
            <h3>Habib Hibatullmi'qaid.</h3>
            <p class="role">Mahasiswa</p>
            <p class="bio">
              Mahasiswa yang bersemangat dalam pengembangan web dan teknologi. Proyek ini didedikasikan untuk mengeksplorasi kekuatan Vue.js dan membangun aplikasi yang bermanfaat dan informatif.
            </p>
          </div>
        </div>
      </section>

      <section class="tech-stack-section">
        <h2>Teknologi yang Digunakan</h2>
        <p>Website ini dibangun menggunakan tumpukan teknologi modern untuk memastikan performa yang cepat, antarmuka yang responsif, dan pengelolaan data yang efisien.</p>
        <div class="tech-grid">
          <div class="tech-item">Vue.js 3</div>
          <div class="tech-item">Vite</div>
          <div class="tech-item">Pinia</div>
          <div class="tech-item">Vue Router</div>
          <div class="tech-item">Axios</div>
          <div class="tech-item">Vitest</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Tidak ada logika JavaScript yang kompleks yang dibutuhkan untuk halaman statis ini.
</script>

<style scoped>
.about-page {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1596328546124-24213c4d14b6?q=80&w=1974&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 0 0 15px 15px;
}

.hero-section h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
}

.content-wrapper {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.about-section, .team-section, .tech-stack-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #3498db;
  padding-bottom: 0.5rem;
  display: inline-block;
}

p {
  line-height: 1.8;
  color: #34495e;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.team-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3498db;
}

.team-info h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.role {
  font-weight: bold;
  color: #3498db;
  margin: 0.25rem 0;
}

.bio {
  font-size: 0.95rem;
  color: #7f8c8d;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.tech-item {
  background-color: #ecf0f1;
  color: #34495e;
  padding: 0.75rem;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background-color: #3498db;
  color: white;
  transform: translateY(-3px);
}
</style>
