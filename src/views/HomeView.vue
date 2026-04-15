<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

    <!-- Navbar -->
    <NavBar @search="handleSearch" />

    <div class="max-w-7xl mx-auto px-4 py-6">

      <!-- Filter Bar -->
      <FilterBar
        :categories="['all', ...categories]"
        :selected="selectedCategory"
        @filter="handleFilter"
      />

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center text-red-500 text-xl mt-20">
        ⚠️ {{ error }}
      </div>

      <!-- Empty -->
      <div v-else-if="filteredProducts.length === 0" class="text-center text-gray-500 mt-20 text-xl">
        😕 No products found
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import NavBar from '../components/NavBar.vue'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const { products, loading, error, fetchProducts } = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('all')

// Get unique categories
const categories = computed(() => {
  const cats = products.value.map(p => p.category)
  return [...new Set(cats)]
})

// Filter + Search logic
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

onMounted(() => {
  fetchProducts()
})
</script>