<script setup>
import { onMounted, computed, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useNatunaStore } from '../stores/natuna';
import ReviewForm from '../components/ReviewForm.vue';

const route = useRoute();
const natunaStore = useNatunaStore();

// <-- PERBAIKAN: Ambil data dari state Pinia, bukan state lokal.
// Gunakan computed property agar reaktif terhadap perubahan di store.
const item = computed(() => natunaStore.singleItem);

// Fungsi untuk memanggil action di store
const fetchData = () => {
  // <-- PERBAIKAN: Panggil action untuk mengambil data dari API, bukan localStorage.
  natunaStore.fetchItemById('destinations', route.params.id);
  // TODO: Tambahkan fungsi untuk memuat ulasan dari API/store
};

// Ambil data saat komponen pertama kali dimuat
onMounted(fetchData);

// Ambil data lagi jika ID di URL berubah (misalnya, saat bernavigasi dari satu detail ke detail lain)
watch(() => route.params.id, fetchData);
</script>

<template>
  <div class="detail-view">
    <!-- Tampilkan pesan loading saat data diambil -->
    <div v-if="natunaStore.loading" class="loading-indicator">
      <h2>Memuat Detail Destinasi...</h2>
    </div>
    
    <!-- Tampilkan konten jika data sudah ada -->
    <div v-else-if="item" class="content-container">
      <!-- Bagian Gambar Utama (Hero) -->
      <div class="hero-image-wrapper">
        <img :src="item.imageUrl" :alt="item.name" class="hero-image">
        <div class="hero-title-overlay">
          <span class="category-tag">{{ item.category }}</span>
          <h1>{{ item.name }}</h1>
          <p class="location-tag">{{ item.location }}</p>
        </div>
      </div>

      <!-- Konten Utama (Deskripsi & Ulasan) -->
      <div class="main-content">
        <div class="description-section">
          <h2>Deskripsi</h2>
          <p>{{ item.description }}</p>
        </div>

        <ReviewForm :item-id="item.id" item-type="destinations" />

        <div class="review-section">
          <h3 class="review-list-title">Ulasan Pengguna</h3>
          <div class="no-reviews">
            Belum ada ulasan. Jadilah yang pertama!
          </div>
          <!-- TODO: Ganti ini dengan loop untuk menampilkan daftar ulasan dari store -->
        </div>
      </div>
    </div>

    <!-- Tampilkan pesan jika item tidak ditemukan -->
    <div v-else class="not-found">
      <h2>Destinasi Tidak Ditemukan</h2>
      <p>Destinasi yang Anda cari mungkin telah dihapus atau URL tidak valid.</p>
      <RouterLink to="/destinasi" class="back-link">&larr; Kembali ke Daftar Destinasi</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.loading-indicator, .not-found {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-light);
}

.not-found h2 {
  margin-bottom: 1rem;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  height: 65vh;
  background-color: #eee;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 20%, transparent);
  color: white;
  text-align: center;
}

.hero-title-overlay h1 {
  color: white;
  font-size: 3.5rem;
  margin: 0.5rem 0;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
}

.category-tag {
  background-color: var(--accent-color);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.location-tag {
  font-size: 1.2rem;
  opacity: 0.9;
  font-style: italic;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.description-section, .review-section {
  margin-bottom: 4rem;
}

.main-content h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: 0.75rem;
  display: inline-block;
}

.description-section p {
  line-height: 1.9;
  font-size: 1.1rem;
  color: var(--text-light);
}

.review-list-title {
  margin-top: 3rem;
  font-size: 1.8rem;
  color: var(--text-dark);
}

.no-reviews {
  font-style: italic;
  color: var(--text-light);
  background-color: var(--background-light);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px dashed var(--border-color);
}

.back-link {
  font-weight: bold;
  color: var(--primary-color);
}
</style>
