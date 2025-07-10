<script setup>
import { ref, onMounted, computed } from 'vue';
import { useNatunaStore } from '../stores/natuna';
import DestinasiForm from '../components/admin/DestinasiForm.vue';
import DestinasiTable from '../components/admin/DestinasiTable.vue';
import KulinerForm from '../components/admin/KulinerForm.vue';
import KulinerTable from '../components/admin/KulinerTable.vue';

const natunaStore = useNatunaStore();
const activeTab = ref('destinasi');

// State untuk mengontrol form modal
const showDestinasiForm = ref(false);
const showKulinerForm = ref(false);
const editingItem = ref(null);

// Ambil data dari store menggunakan computed property agar reaktif
const destinations = computed(() => natunaStore.destinations);
const kuliner = computed(() => natunaStore.kuliner);

// Ambil data saat komponen dimuat
onMounted(() => {
  natunaStore.fetchData('destinations', 'destinations');
  natunaStore.fetchData('kuliner', 'kuliner');
});

// --- Fungsi untuk Destinasi ---
const openDestinasiForm = (item = null) => {
  editingItem.value = item;
  showDestinasiForm.value = true;
};

const handleSaveDestination = async (destinationData) => {
  if (destinationData.id) {
    await natunaStore.updateDestination(destinationData);
  } else {
    await natunaStore.addDestination(destinationData);
  }
  showDestinasiForm.value = false;
  editingItem.value = null;
};

const handleDeleteDestination = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus destinasi ini?')) {
    await natunaStore.deleteDestination(id);
  }
};

// --- Fungsi untuk Kuliner ---
const openKulinerForm = (item = null) => {
  editingItem.value = item;
  showKulinerForm.value = true;
};

const handleSaveKuliner = async (kulinerData) => {
  if (kulinerData.id) {
    await natunaStore.updateKuliner(kulinerData);
  } else {
    await natunaStore.addKuliner(kulinerData);
  }
  showKulinerForm.value = false;
  editingItem.value = null;
};

const handleDeleteKuliner = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus kuliner ini?')) {
    await natunaStore.deleteKuliner(id);
  }
};
</script>

<template>
  <div class="admin-dashboard-container">
    <h2>Selamat Datang, Admin!</h2>
    <nav class="admin-nav">
      <button @click="activeTab = 'destinasi'" :class="{ active: activeTab === 'destinasi' }">
        Manajemen Destinasi
      </button>
      <button @click="activeTab = 'kuliner'" :class="{ active: activeTab === 'kuliner' }">
        Manajemen Kuliner
      </button>
    </nav>

    <div class="admin-content">
      <!-- Manajemen Destinasi -->
      <div v-if="activeTab === 'destinasi'">
        <h3>Daftar Destinasi</h3>
        <button @click="openDestinasiForm()" class="add-new-btn">Tambah Destinasi Baru</button>
        <DestinasiTable :destinations="destinations" @edit="openDestinasiForm" @delete="handleDeleteDestination" />
      </div>

      <!-- Manajemen Kuliner -->
      <div v-if="activeTab === 'kuliner'">
        <h3>Daftar Kuliner</h3>
        <button @click="openKulinerForm()" class="add-new-btn">Tambah Kuliner Baru</button>
        <KulinerTable :culinaries="kuliner" @edit="openKulinerForm" @delete="handleDeleteKuliner" />
      </div>
    </div>

    <!-- Form Modals -->
    <DestinasiForm 
      v-if="showDestinasiForm" 
      :editing-destination="editingItem"
      @close="showDestinasiForm = false" 
      @save="handleSaveDestination" 
    />
    <KulinerForm 
      v-if="showKulinerForm" 
      :editing-culinary="editingItem"
      @close="showKulinerForm = false" 
      @save="handleSaveKuliner" 
    />
  </div>
</template>

<style scoped>
/* Style tidak berubah, tetap sama seperti yang Anda berikan */
.admin-dashboard-container {
 padding: 30px;
 background-color: #f0f2f5;
}
.admin-nav {
 display: flex;
 justify-content: center;
 margin-bottom: 30px;
}
.admin-nav button {
 background: none;
 border: none;
 padding: 12px 25px;
 cursor: pointer;
 font-size: 1.1em;
 font-weight: bold;
}
.admin-nav button.active {
 background-color: #007bff;
 color: white;
}
.admin-content {
 background-color: white;
 padding: 30px;
 border-radius: 8px;
}
.add-new-btn {
 background-color: #28a745;
 color: white;
 padding: 10px 18px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 margin-bottom: 20px;
}
</style>
