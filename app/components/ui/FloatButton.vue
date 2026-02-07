<script setup lang="ts">
const cartStore = useCartStore();

</script>
<template>
  <UButton class="absolute bottom-4 right-4 text-white">
    <span
      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2"
      >{{ cartStore.totalItems }}</span
    >
  </UButton>
</template>
