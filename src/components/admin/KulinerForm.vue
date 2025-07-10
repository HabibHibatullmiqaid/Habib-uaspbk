<template>
  <div class="admin-form-overlay" @click.self="$emit('close')">
    <div class="admin-form-modal">
      <h3>{{ editingCulinary ? 'Edit' : 'Tambah' }} Kuliner</h3>
      <form @submit.prevent="saveCulinary">
        <div class="form-group">
          <label for="name">Nama Kuliner:</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="description">Deskripsi:</label>
          <textarea id="description" v-model="form.description" rows="5"></textarea>
        </div>
        <div class="form-group">
          <label for="imageUrl">URL Gambar:</label>
          <input type="text" id="imageUrl" v-model="form.imageUrl">
          <img v-if="form.imageUrl" :src="form.imageUrl" alt="Preview" class="image-preview">
        </div>
        <div class="form-actions">
          <button type="submit" class="save-btn">Simpan</button>
          <button type="button" @click="$emit('close')" class="cancel-btn">Batal</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  editingCulinary: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save', 'close']);

const form = ref({
  id: null,
  name: '',
  description: '',
  imageUrl: ''
});

// Watch for changes in editingCulinary prop to populate form
watch(() => props.editingCulinary, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
  } else {
    // Reset form if no item is being edited
    form.value = { id: null, name: '', description: '', imageUrl: '' };
  }
}, { immediate: true });

const saveCulinary = () => {
  // Simulasi menyimpan ke localStorage. Di aplikasi nyata, ini akan memanggil API.
  let culinaries = JSON.parse(localStorage.getItem('culinaries')) || [];
  if (form.value.id) {
    // Edit existing
    const index = culinaries.findIndex(c => c.id === form.value.id);
    if (index !== -1) {
      culinaries[index] = { ...form.value };
    }
  } else {
    // Add new
    form.value.id = Date.now(); // Simple ID generation
    culinaries.push({ ...form.value });
  }
  localStorage.setItem('culinaries', JSON.stringify(culinaries));
  emit('save'); // Memberitahu parent untuk refresh data
  emit('close'); // Menutup form
};
</script>

<style scoped>
/* Styling for modal overlay and form - reused from DestinasiForm.vue */
.admin-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.admin-form-modal {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 500px;
  max-width: 90%;
}

.admin-form-modal h3 {
  margin-top: 0;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.image-preview {
  max-width: 100px;
  height: auto;
  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

.save-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #007bff;
  color: white;
}

.save-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #5a6268;
}
</style>