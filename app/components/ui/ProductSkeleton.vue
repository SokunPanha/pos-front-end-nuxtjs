<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="flex flex-col p-2 gap-3">
    <UCard v-for="item in count" :key="item" :ui="{ body: 'p-0 sm:p-0' }">
      <div class="flex gap-3 p-3 animate-pulse">
        <!-- Image skeleton -->
        <div class="shrink-0 h-24 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />

        <!-- Content skeleton -->
        <div class="flex flex-col justify-between flex-1 py-1 min-w-0">
          <div class="space-y-2">
            <div class="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div class="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div class="flex gap-2 mt-2">
            <div class="h-5 w-16 rounded bg-gray-300 dark:bg-gray-600" />
            <div class="h-4 w-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        <!-- Arrow skeleton -->
        <div class="flex items-center shrink-0">
          <div class="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </UCard>
  </div>
</template>
