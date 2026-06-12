<template>
  <nav class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

      
      <h1
        @click="$router.push('/')"
        class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap cursor-pointer"
      >
        🛒 Shopyfy
      </h1>

      
      <input
        v-model="searchQuery"
        @input="$emit('search', searchQuery)"
        type="text"
        placeholder="Search products..."
        class="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      
      <div class="flex items-center gap-3">

        
        <button
          @click="toggleDark"
          class="text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        
        <button
          @click="$router.push('/cart')"
          class="relative text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          🛍️
          <span
  v-if="cartCount > 0"
  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
         font-bold rounded-full w-5 h-5 flex items-center justify-center
         animate-bounce"
>
  {{ cartCount }}
</span>
        </button>

        
        <div v-if="authStore.isLoggedIn" class="flex items-center gap-2">
          <img
            :src="authStore.user?.image"
            class="w-8 h-8 rounded-full border-2 border-indigo-400"
          />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 hidden sm:block">
            {{ authStore.user?.firstName }}
          </span>
          <button
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>

        
        <button
          v-else
          @click="$router.push('/login')"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
        >
          Login
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const { totalItems: cartCount } = storeToRefs(cartStore)

const searchQuery = ref('')
const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

defineEmits<{
  (e: 'search', query: string): void
}>()
</script>