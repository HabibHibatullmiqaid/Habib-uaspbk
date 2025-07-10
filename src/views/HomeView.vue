<script setup>
import { onMounted, computed } from 'vue';
import { useNatunaStore } from '../stores/natuna';
import { RouterLink } from 'vue-router';

const natunaStore = useNatunaStore();
const featuredDestinations = computed(() => natunaStore.featuredDestinations);

onMounted(() => {
  if (natunaStore.destinations.length === 0) {
    natunaStore.fetchData('destinations', 'destinations');
  }
});
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Temukan Surga Tersembunyi di Natuna</h1>
        <p>Jelajahi keindahan alam, kekayaan budaya, dan pesona bahari di gerbang utara Indonesia.</p>
        <RouterLink to="/destinasi" class="hero-button">Mulai Menjelajah</RouterLink>
      </div>
    </section>

    <!-- Featured Destinations Section -->
    <section class="featured-section">
      <h2 class="section-title">Destinasi Unggulan</h2>
      <div v-if="natunaStore.loading">Loading...</div>
      <div v-else class="destinations-grid">
        <!-- Loop melalui destinasi unggulan -->
        <RouterLink 
          v-for="destinasi in featuredDestinations" 
          :key="destinasi.id" 
          :to="`/destinasi/${destinasi.id}`" 
          class="destination-card"
        >
          <img :src="destinasi.imageUrl" :alt="destinasi.name" class="card-image">
          <div class="card-overlay">
            <h3>{{ destinasi.name }}</h3>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-image: url('https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1949&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 90, 156, 0.7), rgba(0, 0, 0, 0.3));
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  color: white;
}

.hero-content p {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 1rem auto 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.hero-button {
  background-color: var(--accent-color);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(247, 148, 29, 0.4);
}

.hero-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(247, 148, 29, 0.6);
}

.featured-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background-color: var(--secondary-color);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.destination-card {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.destination-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.destination-card:hover .card-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 1.5rem 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.card-overlay h3 {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}
</style>
