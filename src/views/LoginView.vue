<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md">

      
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">🛒 Shopyfy</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
      </div>

      
      <div
        v-if="errorMsg"
        class="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl mb-6 text-sm text-center"
      >
        ⚠️ {{ errorMsg }}
      </div>

      
      <div class="flex flex-col gap-5">

        <!-- Username -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              @click="showPassword = !showPassword"
              class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        
        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-lg"
        >
          <span v-if="loading">⏳ Signing in...</span>
          <span v-else>Sign In</span>
        </button>

      </div>

      
      <div class="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-sm text-center">
        <p class="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">🧪 Demo Credentials</p>
        <p class="text-gray-600 dark:text-gray-400">Username: <span class="font-bold">emilys</span></p>
        <p class="text-gray-600 dark:text-gray-400">Password: <span class="font-bold">emilyspass</span></p>
        <button
          @click="fillDemo"
          class="mt-2 text-indigo-600 dark:text-indigo-400 underline text-xs hover:text-indigo-800"
        >
          Click to fill automatically
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = 'Please enter username and password'
    return
  }

  loading.value = true
  errorMsg.value = ''

  const success = await authStore.login(username.value, password.value)

  if (success) {
    router.push('/')
  } else {
    errorMsg.value = 'Invalid username or password. Try demo credentials!'
  }

  loading.value = false
}

const fillDemo = () => {
  username.value = 'emilys'
  password.value = 'emilyspass'
}
</script>