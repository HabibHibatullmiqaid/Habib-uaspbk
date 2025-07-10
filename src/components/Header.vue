<template>
  <header class="app-header">
    <h1>Informasi Pulau Natuna</h1>
    <nav v-if="isAdminLoggedIn">
      <router-link to="/admin/dashboard" class="admin-link">Admin Dashboard</router-link>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, logout } from '../router/auth'; // Import fungsi auth

const router = useRouter();
const isAdminLoggedIn = computed(() => isAuthenticated());

const handleLogout = () => {
  logout();
  router.push('/admin/login');
};
</script>

<style scoped>
.app-header {
  background-color: #007bff;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 1.8em;
}

.app-header nav {
  display: flex;
  align-items: center;
}

.admin-link {
  color: white;
  text-decoration: none;
  margin-right: 15px;
  font-weight: bold;
}

.admin-link:hover {
  text-decoration: underline;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>