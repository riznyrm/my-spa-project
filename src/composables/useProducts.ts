import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductsResponse } from '../types'

const BASE_URL = 'https://dummyjson.com'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<ProductsResponse>(`${BASE_URL}/products?limit=30`)
      products.value = response.data.products
    } catch (err) {
      error.value = 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}