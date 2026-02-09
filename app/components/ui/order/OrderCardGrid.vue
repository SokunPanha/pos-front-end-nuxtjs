<script setup lang="ts">
const props = defineProps<{
  items: CartItem[];
}>();
</script>

<template>
  <div class="overflow-y-auto flex-1 py-4 h-fit">
    <slot name="order-cards" :items="items" v-if="items.length > 0"></slot>
    <div
      v-else
      class="flex items-center justify-center h-full"
    >
      <span class="text-gray-500">{{ $t("label.emptyCart") }}</span>
    </div>
  </div>
</template>
