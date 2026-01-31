<script setup lang="ts">
import { useCartStore } from '~/stores/cart'


const emit = defineEmits(['openOrder', 'openPayment'])

const cartStore = useCartStore()
const showPaymentModal = ref(false)
const toast = useToast()
function openPayment() {
  if(cartStore.orderType === 'dine-in'){
    if(cartStore.tableNumber === ""){
      toast.add({
        title: 'Please select a table',
        color: 'warning',
        duration: 5000,
        icon: 'i-lucide-exclamation-triangle'
      })
      return
    }
  }
  if (cartStore.totalItems > 0) {
    toast.clear()
    showPaymentModal.value = true
  }
}
function openOrder() {
  if(cartStore.orderType === 'dine-in'){
    if(cartStore.tableNumber === ""){
      toast.add({
        title: 'Please select a table',
        color: 'warning',
        duration: 5000,
        icon: 'i-lucide-exclamation-triangle'
      })
      return
    }
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
        @click="emit('openPayment')"
      >
        Check Out
      </UButton>
     </div>
    </template>
  </UCard>

  <PaymentModal v-model:open="showPaymentModal" />
</template>
