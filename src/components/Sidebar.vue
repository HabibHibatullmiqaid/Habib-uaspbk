<template>
  <aside class="app-sidebar">
    <nav>
      <ul>
        <li><router-link to="/">Beranda</router-link></li>
        <li><router-link to="/destinasi">Daftar Destinasi Wisata</router-link></li>
        <li><router-link to="/kuliner">Daftar Kuliner</router-link></li>
      </ul>
    </nav>
    <div class="admin-login-link">
      <router-link to="/admin/login">Login Admin</router-link>
    </div>
  </aside>
</template>

<script setup>
// Tidak ada script khusus untuk sidebar ini, hanya navigasi statis
</script>

<style scoped>
.app-sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  border-right: 1px solid #e2e6ea;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Menempatkan login admin di bawah */
}

.app-sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.app-sidebar nav ul li {
  margin-bottom: 10px;
}

.app-sidebar nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1.1em;
  display: block;
  padding: 8px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.app-sidebar nav ul li a:hover,
.app-sidebar nav ul li a.router-link-active {
  background-color: #e9ecef;
  color: #007bff;
}

.admin-login-link {
  margin-top: auto; /* Mendorong ke bawah */
  padding-top: 20px;
  border-top: 1px solid #e2e6ea;
  text-align: center;
}

.admin-login-link a {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.admin-login-link a:hover {
  background-color: #0056b3;
}
</style>