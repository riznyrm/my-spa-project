<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
    <NavBar @search="() => {}" />

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-500 mt-20 text-xl">
      ⚠️ {{ error }}
    </div>

    <!-- Product Detail -->
    <div v-else-if="product" class="max-w-6xl mx-auto px-4 py-10">

      <!-- Back Button -->
      <button
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
      >
        ← Back to Products
      </button>

      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">

        <!-- Images Section -->
        <div class="p-6 bg-gray-50 dark:bg-gray-900">
          <!-- Main Image -->
          <img
            :src="selectedImage"
            :alt="product.title"
            class="w-full h-80 object-contain rounded-2xl mb-4"
          />
          <!-- Thumbnail Row -->
          <div class="flex gap-2 flex-wrap">
            <img
              v-for="img in product.images"
              :key="img"
              :src="img"
              @click="selectedImage = img"
              :class="[
                'w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition',
                selectedImage === img ? 'border-indigo-500' : 'border-transparent hover:border-indigo-300'
              ]"
            />
          </div>
        </div>

        <!-- Info Section -->
        <div class="p-8 flex flex-col justify-between">
          <div>
            <!-- Category -->
            <span class="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full font-semibold capitalize">
              {{ product.category }}
            </span>

            <!-- Title -->
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-3">
              {{ product.title }}
            </h1>

            <!-- Brand -->
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              by <span class="font-semibold">{{ product.brand }}</span>
            </p>

            <!-- Rating -->
            <div class="flex items-center gap-2 mt-3">
              <div class="flex">
                <span
                  v-for="i in 5"
                  :key="i"
                  :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                >★</span>
              </div>
              <span class="text-sm text-gray-500">{{ product.rating }} / 5</span>
            </div>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Stock -->
            <p class="mt-4 text-sm">
              <span class="font-semibold text-gray-700 dark:text-gray-300">Stock: </span>
              <span :class="product.stock > 10 ? 'text-green-500' : 'text-red-500'" class="font-bold">
                {{ product.stock > 0 ? `${product.stock} available` : 'Out of Stock' }}
              </span>
            </p>
          </div>

          <!-- Price + Button -->
          <div class="mt-8">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                ${{ product.price }}
              </span>
              <span class="text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded-full">
                {{ product.discountPercentage }}% OFF
              </span>
            </div>

            <button
              @click="handleAddToCart"
              :disabled="product.stock === 0"
              class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-2xl transition-all active:scale-95 text-lg"
            >
              🛒 Add to Cart
            </button>

            <!-- Added feedback -->
            <p v-if="added" class="text-center text-green-500 font-semibold mt-3 animate-pulse">
              ✅ Added to cart!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const selectedImage = ref('')
const added = ref(false)

const fetchProduct = async () => {
  loading.value = true
  try {
    const res = await axios.get<Product>(`https://dummyjson.com/products/${route.params.id}`)
    product.value = res.data
    selectedImage.value = res.data.thumbnail
  } catch {
    error.value = 'Product not found'
  } finally {
    loading.value = false
  }
}

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    added.value = true
    setTimeout(() => { added.value = false }, 2000)
  }
}

onMounted(() => fetchProduct())
</script>