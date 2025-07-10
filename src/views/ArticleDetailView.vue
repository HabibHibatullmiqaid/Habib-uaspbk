<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNatunaStore } from '../stores/natuna';

const route = useRoute();
const natunaStore = useNatunaStore();

onMounted(() => {
  natunaStore.fetchArticleById(route.params.id);
});
</script>

<template>
  <div class="detail-container">
    <div v-if="natunaStore.loading" class="loading">
      Memuat...
    </div>
    
    <article v-else-if="natunaStore.singleArticle" class="article-content">
      <h1>{{ natunaStore.singleArticle.title }}</h1>
      <div class="meta">
        <span>Oleh: {{ natunaStore.singleArticle.author }}</span> | 
        <span>Diterbitkan: {{ natunaStore.singleArticle.publish_date }}</span>
      </div>
      <img :src="natunaStore.singleArticle.image" :alt="natunaStore.singleArticle.title" class="main-image">
      
      <!-- Di sini kita akan menampilkan konten lengkap artikel -->
      <div class="full-content" v-html="natunaStore.singleArticle.content"></div>

      <RouterLink to="/artikel" class="back-button">
        &larr; Kembali ke Daftar Artikel
      </RouterLink>
    </article>

    <div v-else class="not-found">
      <p>Artikel tidak ditemukan.</p>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
}
.loading, .not-found {
  text-align: center;
  font-size: 1.5rem;
}
.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin: 1.5rem 0;
}
h1 {
  font-size: 2.8rem;
  line-height: 1.2;
}
.meta {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
}
.full-content {
  margin-top: 2rem;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #34495e;
}
.back-button {
  display: inline-block;
  margin-top: 2rem;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
</style>
