import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  const isLoggedIn = computed(() => user.value !== null)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 })
      })

      if (!response.ok) return false

      const data: User = await response.json()
      user.value = data

      
      localStorage.setItem('user', JSON.stringify(data))
      return true

    } catch {
      return false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isLoggedIn, login, logout }
})