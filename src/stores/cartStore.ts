import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../types'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  const addToCart = (product: Product) => {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(i => i.product.id !== productId)
  }

  const increaseQty = (productId: number) => {
    const item = items.value.find(i => i.product.id === productId)
    if (item) item.quantity++
  }

  const decreaseQty = (productId: number) => {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      if (item.quantity === 1) {
        removeFromCart(productId)
      } else {
        item.quantity--
      }
    }
  }

  const clearCart = () => {
    items.value = []
    localStorage.removeItem('cart')
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  }
})