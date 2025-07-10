import { defineStore } from 'pinia';
import axios from 'axios';

export const useNatunaStore = defineStore('natuna', {
  state: () => ({
    destinations: [],
    kuliner: [],
    articles: [],
    reviews: [],
    singleItem: null,
    loading: false,
  }),
  getters: {
    totalDestinations: (state) => state.destinations.length,
    totalKuliner: (state) => state.kuliner.length,
  },
  actions: {
    // --- Generic Fetch Actions ---
    async fetchData(endpoint, stateProperty) {
      this.loading = true;
      try {
        const response = await axios.get(`/${endpoint}`);
        this[stateProperty] = response.data;
      } catch (error) {
        console.error(`Gagal mengambil data dari ${endpoint}:`, error);
      } finally {
        this.loading = false;
      }
    },
    async fetchItemById(endpoint, id) {
      this.loading = true;
      this.singleItem = null;
      try {
        const response = await axios.get(`/${endpoint}/${id}`);
        this.singleItem = response.data;
      } catch (error) {
        console.error(`Gagal mengambil item ID ${id} dari ${endpoint}:`, error);
      } finally {
        this.loading = false;
      }
    },

    // --- CRUD Actions for Destinations ---
    async addDestination(destination) {
      try {
        await axios.post('/destinations', destination);
        await this.fetchData('destinations', 'destinations'); // <-- PERBAIKAN: Refresh data setelah menambah
      } catch (error) {
        console.error('Gagal menambah destinasi:', error);
      }
    },
    async updateDestination(destination) {
      try {
        await axios.put(`/destinations/${destination.id}`, destination);
        await this.fetchData('destinations', 'destinations'); // <-- PERBAIKAN: Refresh data setelah update
      } catch (error) {
        console.error('Gagal mengupdate destinasi:', error);
      }
    },
    async deleteDestination(id) {
      try {
        await axios.delete(`/destinations/${id}`);
        await this.fetchData('destinations', 'destinations'); // <-- PERBAIKAN: Refresh data setelah menghapus
      } catch (error) {
        console.error('Gagal menghapus destinasi:', error);
      }
    },

    // --- CRUD Actions for Kuliner (Pola yang sama) ---
    async addKuliner(item) {
      try {
        await axios.post('/kuliner', item);
        await this.fetchData('kuliner', 'kuliner');
      } catch (error) {
        console.error('Gagal menambah kuliner:', error);
      }
    },
    async updateKuliner(item) {
      try {
        await axios.put(`/kuliner/${item.id}`, item);
        await this.fetchData('kuliner', 'kuliner');
      } catch (error) {
        console.error('Gagal mengupdate kuliner:', error);
      }
    },
    async deleteKuliner(id) {
      try {
        await axios.delete(`/kuliner/${id}`);
        await this.fetchData('kuliner', 'kuliner');
      } catch (error) {
        console.error('Gagal menghapus kuliner:', error);
      }
    },
    async addReview(reviewData) {
      try {
        // Kirim data ulasan baru ke endpoint /reviews menggunakan metode POST
        await axios.post('/reviews', reviewData);
        // Anda bisa menambahkan logika untuk refresh daftar ulasan di sini jika perlu
        // contoh: this.fetchReviewsByItemId(reviewData.itemId);
      } catch (error) {
        console.error('Gagal mengirim ulasan:', error);
        alert('Maaf, terjadi kesalahan saat mengirim ulasan Anda.');
      }
    },
  }
});
