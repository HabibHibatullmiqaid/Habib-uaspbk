<template>
  <div class="admin-login-container">
    <h2>Admin Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../router/auth'; // Fungsi untuk set status login (misal: localStorage)

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`);
    const data = await response.json();

    if (data.length > 0 && data[0].role === 'admin') {
      login(); // tandai user sebagai login
      router.push('/admin/dashboard');
    } else {
      error.value = 'Username atau password salah!';
    }
  } catch (err) {
    error.value = 'Gagal terhubung ke server!';
    console.error(err);
  }
};
</script>

<style scoped>
.admin-login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

.admin-login-container h2 {
  margin-bottom: 25px;
  color: #333;
}

.login-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
  font-size: 0.9em;
}
</style>
