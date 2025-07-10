<script setup>
import { onMounted } from 'vue';
import { useNatunaStore } from '../stores/natuna';
import { RouterLink } from 'vue-router';

const natunaStore = useNatunaStore();

onMounted(() => {
  natunaStore.fetchArticles();
});
</script>

<template>
  <div class="page-container">
    <h1>📝 Artikel & Wawasan Natuna</h1>
    <p>Baca lebih dalam tentang budaya, sejarah, dan keunikan Kepulauan Natuna.</p>
    
    <div v-if="natunaStore.loading" class="loading">
      Memuat artikel...
    </div>

    <div v-else class="article-list">
      <div v-for="article in natunaStore.articles" :key="article.id" class="article-card">
        <img :src="article.image" :alt="article.title" class="article-image">
        <div class="article-content">
          <h2>{{ article.title }}</h2>
          <div class="meta">
            <span>Oleh: {{ article.author }}</span> | 
            <span>Diterbitkan: {{ article.publish_date }}</span>
          </div>
          <p class="summary">{{ article.summary }}</p>
          <RouterLink :to="{ name: 'artikel-detail', params: { id: article.id } }" class="read-more-btn">
            Baca Selengkapnya &rarr;
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 2rem;
}
.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
}
.article-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2rem;
}
.article-card {
  display: flex;
  gap: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}
.article-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}
.article-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
.article-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}
.article-content h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}
.meta {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}
.summary {
  flex-grow: 1;
  color: #34495e;
}
.read-more-btn {
  align-self: flex-start;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}
</style>
