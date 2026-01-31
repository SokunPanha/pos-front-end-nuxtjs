<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const emit = defineEmits(["openOrder", "openCheckout"]);
const cartStore = useCartStore();
</script>

<template>
  <UCard>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span>Items</span>
        <span>{{ cartStore.totalItems }}</span>
      </div>

      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>${{ cartStore.subTotal.toFixed(2) }}</span>
      </div>

      <div
        v-if="cartStore.discount > 0"
        class="flex justify-between text-green-600"
      >
        <span>Discount</span>
        <span>- ${{ cartStore.discount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>${{ cartStore.total.toFixed(2) }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2 flex-col">
        <UButton
          block
          size="lg"
          color="primary"
          class="cursor-pointer"
          :disabled="cartStore.totalItems === 0"
          @click="emit('openOrder')"
        >
          Place Order
        </UButton>
        <UButton
          block
          size="lg"
          class="bg-green-800! cursor-pointer"
          :disabled="cartStore.totalItems === 0"
          @click="emit('openCheckout')"
        >
          Check Out
        </UButton>
      </div>
    </template>
  </UCard>
</template>
