// src/router/auth.js
export function isAuthenticated() {
  // Ini adalah simulasi. Di aplikasi nyata, Anda akan memeriksa token di localStorage/sessionStorage
  // atau dari state management (Pinia/Vuex) setelah login berhasil.
  return localStorage.getItem('adminLoggedIn') === 'true';
}

export function login() {
  localStorage.setItem('adminLoggedIn', 'true');
}

export function logout() {
  localStorage.removeItem('adminLoggedIn');
}