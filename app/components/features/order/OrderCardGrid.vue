<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
</script>

<template>
  <div class="overflow-y-auto flex-1 py-4">
    <div
      v-if="cartStore.totalItems > 0"
      class="space-y-3 overflow-y-auto h-full"
    >
      <OrderCard
        v-for="item in cartStore.items"
        :key="item.id"
        :item="item"
        @increase="cartStore.increase"
        @decrease="cartStore.decrease"
        @remove="cartStore.remove"
      />
    </div>
    <div v-else class="flex items-center justify-center h-full">
      <span class="text-gray-500">{{ $t("label.emptyCart") }}</span>
    </div>
  </div>
</template>
