<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  editingDestination: {
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

// Watch for changes in prop to populate form for editing
watch(() => props.editingDestination, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
  } else {
    form.value = { id: null, name: '', description: '', imageUrl: '' };
  }
}, { immediate: true });

const saveDestination = () => {
  // <-- PERBAIKAN: Tambahkan validasi sebelum mengirim data.
  if (!form.value.name || !form.value.name.trim()) {
    alert('Nama destinasi tidak boleh kosong!');
    return; // Hentikan fungsi jika validasi gagal
  }

  // Hanya emit data jika validasi berhasil
  emit('save', { ...form.value });
};
</script>

<template>
  <div class="admin-form-overlay" @click.self="$emit('close')">
    <div class="admin-form-modal">
      <h3>{{ editingDestination ? 'Edit' : 'Tambah' }} Destinasi</h3>
      <form @submit.prevent="saveDestination">
        <div class="form-group">
          <label for="name">Nama Destinasi:</label>
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

<style scoped>
/* Style tidak berubah, tetap sama seperti yang Anda berikan */
.admin-form-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
.admin-form-modal { background-color: white; padding: 30px; border-radius: 8px; width: 500px; }
.form-group { margin-bottom: 18px; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; }
.image-preview { max-width: 100px; margin-top: 10px; }
</style>
