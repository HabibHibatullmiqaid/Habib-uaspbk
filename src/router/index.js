import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from './auth';

// Impor komponen View
import HomeView from '../views/HomeView.vue';
import DestinationsView from '../views/DestinationsView.vue';
import DetailView from '../views/DetailView.vue';
import KulinerList from '../views/KulinerList.vue';
import KulinerDetail from '../views/KulinerDetail.vue';
import ArticleListView from '../views/ArticleListView.vue';
import ArticleDetailView from '../views/ArticleDetailView.vue';
import AboutView from '../views/AboutView.vue';
import AdminLogin from '../views/AdminLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  // Public Routes
  { path: '/', name: 'home', component: HomeView },
  { path: '/destinasi', name: 'destinations', component: DestinationsView },
  { path: '/destinasi/:id', name: 'destination-detail', component: DetailView, props: true },
  { path: '/kuliner', name: 'kuliner', component: KulinerList },
  { path: '/kuliner/:id', name: 'kuliner-detail', component: KulinerDetail, props: true },
  { path: '/artikel', name: 'articles', component: ArticleListView },
  { path: '/artikel/:id', name: 'article-detail', component: ArticleDetailView, props: true },
  { path: '/tentang', name: 'about', component: AboutView },

  // Admin Routes
  { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true } // Lindungi route ini
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'admin-login' });
  } else {
    next();
  }
});

export default router;
