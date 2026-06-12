<template>
  <div class="flex gap-2 flex-wrap justify-center py-4">
    <button
      v-for="(category, index) in categories"
      :key="category"
      @click="$emit('filter', category)"
      :style="{ animationDelay: `${index * 0.05}s` }"
      :class="[
        'px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 animate-fadeIn',
        selected === category
          ? 'bg-indigo-600 text-white shadow-md scale-105'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:scale-105'
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

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>