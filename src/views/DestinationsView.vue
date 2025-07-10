<script setup>
import { onMounted, computed } from 'vue';
import { useNatunaStore } from '../stores/natuna';

const natunaStore = useNatunaStore();
const destinations = computed(() => natunaStore.destinations);

onMounted(() => {
  natunaStore.fetchData('destinations', 'destinations');
});
</script>

<template>
  <div class="list-container">
    <h2>Daftar Destinasi Wisata Pulau Natuna</h2>
    <div v-if="natunaStore.loading">Loading...</div>
    <div v-else-if="destinations.length === 0" class="no-data-message">
      Belum ada destinasi wisata yang tersedia.
    </div>
    <div v-else class="card-grid">
      <div v-for="item in destinations" :key="item.id" class="card">
        <img :src="item.imageUrl || '/placeholder.jpg'" alt="Gambar Destinasi" class="card-image">
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description ? item.description.substring(0, 120) + '...' : 'Tidak ada deskripsi.' }}</p>
          <router-link :to="`/destinasi/${item.id}`" class="detail-link">Lihat Detail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style tidak berubah, tetap sama seperti yang Anda berikan */
.list-container { padding: 30px; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
.card { border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; }
.card-image { width: 100%; height: 200px; object-fit: cover; }
.card-content { padding: 18px; }
.detail-link { display: inline-block; background-color: #007bff; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none; }
</style>
