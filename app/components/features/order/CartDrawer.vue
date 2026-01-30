<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()
</script>
<template>
  <UDrawer direction="right">
    <UButton class="absolute bottom-10 right-10 cursor-pointer rounded-full p-5"  color="primary" trailing-icon="i-lucide-shopping-cart" >
      <div v-if="cartStore.totalItems > 0" class="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white"> {{ cartStore.totalItems }}</div>
    </UButton>
    <template #content>
      <div class="p-3">
        <OrderCartPanel />
      </div>
    </template>
  </UDrawer>
</template>
