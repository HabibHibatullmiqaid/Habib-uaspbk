<script setup>
import { ref } from 'vue';
import { useNatunaStore } from '../stores/natuna';

const props = defineProps({
  itemId: { type: [String, Number], required: true },
  itemType: { type: String, required: true }
});
const emit = defineEmits(['reviewSubmitted']);
const natunaStore = useNatunaStore();

// State reaktif untuk form
const user = ref('');
const reviewText = ref('');
const rating = ref(0); // State baru untuk menyimpan rating bintang
const hoverRating = ref(0); // State untuk efek hover pada bintang
const isSubmitting = ref(false);

// Fungsi untuk mengatur rating saat bintang diklik
const setRating = (star) => {
  rating.value = star;
};

// Fungsi yang dijalankan saat form di-submit
const submitReview = async () => {
  if (rating.value === 0) {
    alert('Harap berikan rating bintang terlebih dahulu!');
    return;
  }
  if (reviewText.value.trim() === '') {
    alert('Ulasan tidak boleh kosong!');
    return;
  }

  isSubmitting.value = true;

  const newReview = {
    itemId: props.itemId,
    itemType: props.itemType,
    user: user.value.trim() || 'Anonim',
    text: reviewText.value,
    rating: rating.value, // <-- Sertakan rating dalam data yang dikirim
    timestamp: new Date().toISOString()
  };

  await natunaStore.addReview(newReview);
  isSubmitting.value = false;

  // Reset form
  user.value = '';
  reviewText.value = '';
  rating.value = 0;
  
  alert('Terima kasih! Ulasan Anda telah berhasil dikirim.');
  emit('reviewSubmitted');
};
</script>

<template>
  <form @submit.prevent="submitReview" class="review-form">
    <!-- Bagian Rating Bintang -->
    <div class="form-group rating-group">
      <label>Rating Anda</label>
      <div class="star-rating">
        <span 
          v-for="star in 5" 
          :key="star"
          class="star"
          :class="{ 'filled': star <= (hoverRating || rating) }"
          @click="setRating(star)"
          @mouseenter="hoverRating = star"
          @mouseleave="hoverRating = 0"
        >
          ★
        </span>
      </div>
    </div>

    <!-- Input Nama -->
    <div class="form-group">
      <label for="reviewUser">Nama Anda (Opsional)</label>
      <input type="text" id="reviewUser" v-model="user" placeholder="Contoh: Budi">
    </div>

    <!-- Input Ulasan -->
    <div class="form-group">
      <label for="reviewText">Ulasan Anda</label>
      <textarea 
        id="reviewText" 
        v-model="reviewText" 
        rows="5" 
        placeholder="Tulis pengalaman Anda di sini..." 
        required
      ></textarea>
    </div>

    <!-- Tombol Submit -->
    <button type="submit" class="submit-review-btn" :disabled="isSubmitting">
      {{ isSubmitting ? 'Mengirim...' : 'Kirim Ulasan' }}
    </button>
  </form>
</template>

<style scoped>
.review-form {
  background-color: var(--white-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--text-dark);
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.15);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* --- Star Rating Styles --- */
.rating-group {
  text-align: center;
  margin-bottom: 2rem;
}
.star-rating {
  display: inline-flex;
  flex-direction: row-reverse; /* Membuat hover dari kanan ke kiri */
  font-size: 2.5rem;
}
.star {
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease-out;
}
.star-rating:hover .star {
  color: var(--accent-color);
}
.star:hover ~ .star {
  color: var(--accent-color);
}
.star.filled {
  color: var(--accent-color);
}
/* --- End Star Rating Styles --- */

.submit-review-btn {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.9rem 2.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: block;
  margin: 1rem auto 0;
  box-shadow: 0 4px 15px rgba(0, 169, 224, 0.3);
}

.submit-review-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 169, 224, 0.4);
}

.submit-review-btn:disabled {
  background: #b0bec5;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
