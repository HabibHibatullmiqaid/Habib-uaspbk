<template>
  <div class="list-container">
    <h2>Daftar Kuliner Khas Pulau Natuna</h2>
    <div v-if="culinaries.length === 0" class="no-data-message">
      Belum ada informasi kuliner yang tersedia.
    </div>
    <div v-else class="card-grid">
      <div v-for="item in culinaries" :key="item.id" class="card">
        <img :src="item.imageUrl || '/placeholder.jpg'" alt="Gambar Kuliner" class="card-image">
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description ? item.description.substring(0, 120) + '...' : 'Tidak ada deskripsi.' }}</p>
          <router-link :to="`/kuliner/${item.id}`" class="detail-link">Lihat Detail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const culinaries = ref([]);

onMounted(() => {
  // Ambil data kuliner dari localStorage (simulasi backend)
  const storedCulinaries = JSON.parse(localStorage.getItem('culinaries')) || [];
  culinaries.value = storedCulinaries;
});
</script>

<style scoped>
/* Styling for list - reused from DestinasiList.vue */
.list-container {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.list-container h2 {
  color: #007bff;
  margin-bottom: 30px;
  text-align: center;
}

.no-data-message {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin-top: 30px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #e0e0e0;
}

.card-content {
  padding: 18px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.4em;
}

.card-content p {
  color: #666;
  font-size: 0.95em;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 15px;
}

.detail-link {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  align-self: flex-start;
}

.detail-link:hover {
  background-color: #0056b3;
}
</style>