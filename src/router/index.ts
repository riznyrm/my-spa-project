import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/product/:id', name: 'product', component: () => import('../views/ProductView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue'), meta: { requiresAuth: true } }
  ]
})


router.beforeEach((to) => {
  const user = localStorage.getItem('user')
  if (to.meta.requiresAuth && !user) {
    return { name: 'login' }
  }
})

export default router