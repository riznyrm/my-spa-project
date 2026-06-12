<template>
  <div
    @click="$router.push(`/product/${product.id}`)"
    class="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-2xl 
           transition-all duration-300 cursor-pointer group overflow-hidden
           hover:-translate-y-2 hover:scale-[1.02] active:scale-95"
  >
    
    <div class="overflow-hidden rounded-t-2xl">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    
    <div class="p-4">

      <!-- Category Badge -->
      <span class="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full font-medium capitalize">
        {{ product.category }}
      </span>

    
      <h2 class="mt-2 font-semibold text-gray-800 dark:text-white text-sm line-clamp-2">
        {{ product.title }}
      </h2>

      
      <div class="flex items-center gap-1 mt-1">
        <span class="text-yellow-400">⭐</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.rating }}</span>
      </div>

      
      <div class="flex items-center justify-between mt-3">
        <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          ${{ product.price }}
        </span>
        <button
          @click.stop="addToCart"
          class="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm px-3 py-1.5 rounded-full font-semibold transition-all"
        >
          + Cart
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addToCart(props.product)
}
</script>