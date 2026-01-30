<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { PaymentMethod, ReceiptData } from '~~/shared/types/payment'

const cartStore = useCartStore()

const isOpen = defineModel<boolean>('open', { default: false })
const paymentMethod = ref<PaymentMethod | null>(null)
const cashReceived = ref(0)
const isPaid = ref(false)
const receiptData = ref<ReceiptData | null>(null)

const change = computed(() => {
  if (cashReceived.value >= cartStore.total) {
    return cashReceived.value - cartStore.total
  }
  return 0
})

function selectMethod(method: PaymentMethod) {
  paymentMethod.value = method
  cashReceived.value = 0
}

function confirmCashPayment() {
  if (cashReceived.value >= cartStore.total) {
    completePayment('cash')
  }
}

function confirmQRPayment() {
  completePayment('qr')
}

function completePayment(method: PaymentMethod) {
  receiptData.value = {
    orderId: `ORD-${Date.now()}`,
    orderType: cartStore.orderType,
    tableNumber: cartStore.orderType === 'dine-in' ? cartStore.tableNumber : undefined,
    items: cartStore.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    subtotal: cartStore.subTotal,
    discount: cartStore.discount,
    total: cartStore.total,
    paymentMethod: method,
    cashReceived: method === 'cash' ? cashReceived.value : undefined,
    change: method === 'cash' ? change.value : undefined,
    timestamp: new Date()
  }
  isPaid.value = true
}

function closeAndReset() {
  cartStore.clear()
  paymentMethod.value = null
  cashReceived.value = 0
  isPaid.value = false
  receiptData.value = null
  isOpen.value = false
}

function goBack() {
  paymentMethod.value = null
  cashReceived.value = 0
}
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ width: 'sm:max-w-md' }">
    <template #content>
      <div class="p-4">
        <!-- Receipt View -->
        <PaymentReceipt
          v-if="isPaid && receiptData"
          :receipt="receiptData"
          @done="closeAndReset"
        />

        <!-- Payment Method Selection -->
        <div v-else-if="!paymentMethod" class="space-y-4">
          <h2 class="text-xl font-bold text-center">Select Payment Method</h2>

          <div class="text-center text-2xl font-bold text-primary">
            ${{ cartStore.total.toFixed(2) }}
          </div>

          <div class="grid grid-cols-2 gap-3">
            <UButton
              size="xl"
              color="primary"
              variant="outline"
              class="flex flex-col items-center py-6"
              @click="selectMethod('cash')"
            >
              <UIcon name="i-heroicons-banknotes" class="text-3xl mb-2" />
              <span>Cash</span>
            </UButton>

            <UButton
              size="xl"
              color="primary"
              variant="outline"
              class="flex flex-col items-center py-6"
              @click="selectMethod('qr')"
            >
              <UIcon name="i-heroicons-qr-code" class="text-3xl mb-2" />
              <span>QR Code</span>
            </UButton>
          </div>
        </div>

        <!-- Cash Payment -->
        <PaymentCash
          v-else-if="paymentMethod === 'cash'"
          v-model:cash-received="cashReceived"
          :total="cartStore.total"
          :change="change"
          @confirm="confirmCashPayment"
          @back="goBack"
        />

        <!-- QR Payment -->
        <PaymentQR
          v-else-if="paymentMethod === 'qr'"
          :total="cartStore.total"
          @confirm="confirmQRPayment"
          @back="goBack"
        />
      </div>
    </template>
  </UModal>
</template>
