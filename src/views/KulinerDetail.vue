<template>
  <div class="detail-page-container">
    <div v-if="item" class="item-detail">
      <h2>{{ item.name }}</h2>
      <img :src="item.imageUrl || '/placeholder.jpg'" :alt="item.name" class="detail-image">
      <p class="description">{{ item.description }}</p>

      <h3>Berikan Ulasan Anda</h3>
      <ReviewForm :itemId="item.id" itemType="kuliner" @reviewSubmitted="loadReviews" />

      <h3>Ulasan Pengguna</h3>
      <div v-if="reviews.length === 0" class="no-reviews">
        Belum ada ulasan untuk kuliner ini. Jadilah yang pertama!
      </div>
      <ul v-else class="review-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <p class="review-text">"{{ review.text }}"</p>
          <p class="review-meta">Oleh: {{ review.user || 'Anonim' }} pada {{ new Date(review.timestamp).toLocaleDateString() }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="not-found">
      <p>Kuliner tidak ditemukan.</p>
      <router-link to="/kuliner">Kembali ke Daftar Kuliner</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ReviewForm from '../components/ReviewForm.vue';

const route = useRoute();
const item = ref(null);
const reviews = ref([]);

const fetchItemDetail = () => {
  const itemId = route.params.id;
  const storedCulinaries = JSON.parse(localStorage.getItem('culinaries')) || [];
  item.value = storedCulinaries.find(c => c.id == itemId); // Gunakan == untuk komparasi ID yang mungkin string/number
};

const loadReviews = () => {
  const itemId = route.params.id;
  const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.value = allReviews.filter(r => r.itemId == itemId && r.itemType === 'kuliner');
};

onMounted(() => {
  fetchItemDetail();
  loadReviews();
});

// Watch route params to reload data if navigating between details of the same type
watch(() => route.params.id, () => {
  fetchItemDetail();
  loadReviews();
});
</script>

<style scoped>
/* Styling for detail page - reused from DestinasiDetail.vue */
.detail-page-container {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.item-detail h2 {
  color: #007bff;
  margin-bottom: 20px;
  text-align: center;
}

.detail-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.description {
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
  font-size: 1.1em;
}

.item-detail h3 {
  color: #333;
  margin-top: 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.no-reviews {
  font-style: italic;
  color: #777;
  text-align: center;
  padding: 15px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.review-list {
  list-style: none;
  padding: 0;
}

.review-item {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.review-text {
  font-style: italic;
  color: #333;
  margin-bottom: 8px;
}

.review-meta {
  font-size: 0.9em;
  color: #888;
  text-align: right;
}

.not-found {
  text-align: center;
  padding: 50px;
}

.not-found p {
  font-size: 1.2em;
  color: #dc3545;
  margin-bottom: 20px;
}

.not-found a {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.not-found a:hover {
  background-color: #5a6268;
}
</style>