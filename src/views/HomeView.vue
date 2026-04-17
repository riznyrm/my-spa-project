<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300 flex flex-col">

    <NavBar @search="handleSearch" />

    <div class="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">

      
      <FilterBar
        :categories="['all', ...categories]"
        :selected="selectedCategory"
        @filter="handleFilter"
      />

      
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <SkeletonCard v-for="n in 12" :key="n" />
      </div>

      
      <div v-else-if="error" class="text-center mt-20">
        <p class="text-6xl mb-4">⚠️</p>
        <p class="text-red-500 text-xl">{{ error }}</p>
        <button
          @click="fetchProducts"
          class="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>

      
      <div v-else-if="filteredProducts.length === 0" class="text-center mt-20">
        <p class="text-6xl mb-4">😕</p>
        <p class="text-gray-500 dark:text-gray-400 text-xl">No products found</p>
      </div>

      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

    </div>

    <FooterBar />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import NavBar from '../components/NavBar.vue'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import FooterBar from '../components/FooterBar.vue'

const { products, loading, error, fetchProducts } = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => {
  const cats = products.value.map(p => p.category)
  return [...new Set(cats)]
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesCategory = selectedCategory.value === 'all' || p.category === selectedCategory.value
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (category: string) => {
  selectedCategory.value = category
}

onMounted(() => fetchProducts())
</script>