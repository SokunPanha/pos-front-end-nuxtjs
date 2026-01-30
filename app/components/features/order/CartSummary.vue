<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const showPaymentModal = ref(false)

function openPayment() {
  if (cartStore.totalItems > 0) {
    showPaymentModal.value = true
  }
}
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

      <div v-if="cartStore.discount > 0" class="flex justify-between text-green-600">
        <span>Discount</span>
        <span>- ${{ cartStore.discount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>${{ cartStore.total.toFixed(2) }}</span>
      </div>
    </div>

    <template #footer>
      <UButton
        block
        size="lg"
        color="primary"
        :disabled="cartStore.totalItems === 0"
        @click="openPayment"
      >
        Place Order
      </UButton>
    </template>
  </UCard>

  <PaymentModal v-model:open="showPaymentModal" />
</template>
