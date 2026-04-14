<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
      🛒 My Shop
    </h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-500 text-xl">
      Loading products...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500 text-xl">
      {{ error }}
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow"
        @click="$router.push(`/product/${product.id}`)"
      >
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover rounded-lg mb-3" />
        <h2 class="font-semibold text-gray-800 dark:text-white text-sm">{{ product.title }}</h2>
        <p class="text-green-600 font-bold mt-1">${{ product.price }}</p>
        <p class="text-yellow-500 text-sm">⭐ {{ product.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>