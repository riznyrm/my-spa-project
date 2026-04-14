import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const totalItems = computed(() => items.value.length)

  const addToCart = (product: Product) => {
    items.value.push(product)
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(p => p.id !== productId)
  }

  return { items, totalItems, addToCart, removeFromCart }
})