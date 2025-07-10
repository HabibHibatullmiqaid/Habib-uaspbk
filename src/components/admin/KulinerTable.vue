<template>
  <div class="admin-table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Nama Kuliner</th>
          <th>Deskripsi Singkat</th>
          <th>Gambar</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="culinaries.length === 0">
          <td colspan="4" class="no-data">Belum ada kuliner.</td>
        </tr>
        <tr v-for="item in culinaries" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.description ? item.description.substring(0, 100) + '...' : '-' }}</td>
          <td>
            <img v-if="item.imageUrl" :src="item.imageUrl" alt="Kuliner" class="table-image">
            <span v-else>-</span>
          </td>
          <td>
            <button @click="$emit('edit', item)" class="action-btn edit-btn">Edit</button>
            <button @click="$emit('delete', item.id)" class="action-btn delete-btn">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  culinaries: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>

<style scoped>
/* Styling for table - reused from DestinasiTable.vue */
.admin-table-container {
  margin-top: 20px;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden; /* For rounded corners */
}

.data-table th, .data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

.data-table tbody tr:hover {
  background-color: #f5f5f5;
}

.table-image {
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.action-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #777;
}
</style>