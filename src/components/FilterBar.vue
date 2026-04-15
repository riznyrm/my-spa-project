<template>
  <div class="flex gap-2 flex-wrap justify-center py-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('filter', category)"
      :class="[
        'px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all',
        selected === category
          ? 'bg-indigo-600 text-white shadow-md scale-105'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900'
      ]"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[]
  selected: string
}>()

defineEmits<{
  (e: 'filter', category: string): void
}>()
</script>