<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center text-center px-4">
    <p class="text-9xl font-black text-indigo-600 dark:text-indigo-400">404</p>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mt-4">Page Not Found</h1>
    <p class="text-gray-500 dark:text-gray-400 mt-2">
      Oops! The page you're looking for doesn't exist.
    </p>
    <button
      @click="$router.push('/')"
      class="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition active:scale-95"
    >
      Back to Home
    </button>
  </div>
</template>