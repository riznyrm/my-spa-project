<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
    <NavBar @search="() => {}" />

    <div class="max-w-4xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">🛍️ Your Cart</h1>

      
      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <p class="text-6xl mb-4">🛒</p>
        <p class="text-gray-500 dark:text-gray-400 text-xl">Your cart is empty</p>
        <button
          @click="$router.push('/')"
          class="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Continue Shopping
        </button>
      </div>

      
      <div v-else>
        <div class="flex flex-col gap-4">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex items-center gap-4"
          >
            
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-20 h-20 object-cover rounded-xl"
            />

        
            <div class="flex-1">
              <h2 class="font-semibold text-gray-800 dark:text-white">{{ item.product.title }}</h2>
              <p class="text-indigo-600 dark:text-indigo-400 font-bold">${{ item.product.price }}</p>
            </div>

        
            <div class="flex items-center gap-2">
              <button
                @click="cartStore.decreaseQty(item.product.id)"
                class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 font-bold hover:bg-indigo-200 transition"
              >−</button>
              <span class="font-bold text-gray-800 dark:text-white w-6 text-center">
                {{ item.quantity }}
              </span>
              <button
                @click="cartStore.increaseQty(item.product.id)"
                class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 font-bold hover:bg-indigo-200 transition"
              >+</button>
            </div>

            
            <p class="font-bold text-gray-700 dark:text-gray-300 w-20 text-right">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>

            
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="text-red-400 hover:text-red-600 text-xl transition"
            >✕</button>
          </div>
        </div>

        
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <div class="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
            <span>Total Items</span>
            <span class="font-bold">{{ cartStore.totalItems }}</span>
          </div>
          <div class="flex justify-between text-xl font-bold text-gray-800 dark:text-white border-t pt-4 mt-2">
            <span>Total Price</span>
            <span class="text-indigo-600 dark:text-indigo-400">
              ${{ cartStore.totalPrice.toFixed(2) }}
            </span>
          </div>

          <div class="flex gap-4 mt-6">
            <button
              @click="cartStore.clearCart()"
              class="flex-1 border border-red-400 text-red-400 hover:bg-red-50 dark:hover:bg-red-900 py-3 rounded-2xl font-semibold transition"
            >
              Clear Cart
            </button>
            <button
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import NavBar from '../components/NavBar.vue'

const cartStore = useCartStore()
</script>

<style scoped>
.flex-col > div {
  animation: slideIn 0.3s ease both;
}

.flex-col > div:nth-child(1) { animation-delay: 0.05s; }
.flex-col > div:nth-child(2) { animation-delay: 0.10s; }
.flex-col > div:nth-child(3) { animation-delay: 0.15s; }
.flex-col > div:nth-child(4) { animation-delay: 0.20s; }
.flex-col > div:nth-child(5) { animation-delay: 0.25s; }

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>