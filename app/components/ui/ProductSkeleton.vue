<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
});
</script>
    
<template>
  <div
    class="grid grid-cols-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4"
  >
    <UCard v-for="item in count" :key="item" class="animate-pulse">
      <!-- Image skeleton -->
      <div class="relative">
        <div
          class="h-40 w-full rounded-lg bg-gray-200 dark:bg-gray-700"
        />

        <!-- Discount badge placeholder -->
        <div
          class="absolute top-2 left-2 h-5 w-12 rounded bg-gray-300 dark:bg-gray-600"
        />
      </div>

      <!-- Content skeleton -->
      <div class="mt-3 space-y-2">
        <!-- Product name -->
        <div
          class="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"
        />

        <!-- Category -->
        <div
          class="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"
        />

        <!-- Price -->
        <div class="flex gap-2 mt-2">
          <div
            class="h-5 w-20 rounded bg-gray-300 dark:bg-gray-600"
          />
          <div
            class="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"
          />
        </div>
      </div>

      <!-- Footer skeleton -->
      <template #footer>
        <div
          class="h-9 w-full rounded bg-gray-300 dark:bg-gray-600"
        />
      </template>
    </UCard>
  </div>
</template>