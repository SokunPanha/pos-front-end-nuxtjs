<script setup lang="ts">
const isOpen = defineModel<boolean>("open", { default: false });

const {
  paymentMethod,
  cashReceived,
  isPaid,
  receiptData,
  processingError,
  change,
  selectMethod,
  confirmCashCheckout,
  confirmQRCheckout,
  completeCheckout,
  closeAndReset,
  closeModal,
  goBack,
  loading,
  cartStore,
} = useCheckout({ isOpen });
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <UButton
        @click="closeModal"
        icon="i-heroicons-x-mark"
        class="absolute top-2 right-2 cursor-pointer"
        color="neutral"
        variant="ghost"
      >
      </UButton>
      <div class="p-4">
        <!-- Receipt View -->
        <CashierCheckoutReceipt
          v-if="isPaid && receiptData"
          :receipt="receiptData"
          @done="closeAndReset"
        />

        <!-- Loading State -->
        <div v-else-if="loading" class="py-8 text-center">
          <UIcon
            name="i-heroicons-arrow-path"
            class="text-4xl animate-spin text-primary"
          />
          <p class="mt-2 text-gray-500">{{ $t("label.processing") }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="processingError" class="py-4 text-center">
          <div class="text-red-500 mb-4">{{ processingError }}</div>
          <UButton @click="goBack">{{ $t("label.tryAgain") }}</UButton>
        </div>

        <!-- Payment Method Selection -->
        <div v-else-if="!paymentMethod" class="space-y-4">
          <h2 class="text-xl font-bold text-center">
            {{ $t("label.selectPaymentMethod") }}
          </h2>

          <div class="text-center text-2xl font-bold text-primary">
            ${{ cartStore.total.toFixed(2) }}
          </div>

          <div class="grid grid-cols-2 gap-3">
            <UButton
              size="xl"
              color="primary"
              variant="outline"
              class="flex flex-col items-center cursor-pointer py-6"
              @click="selectMethod('cash')"
            >
              <UIcon name="i-heroicons-banknotes" class="text-3xl mb-2" />
              <span>{{ $t("label.cash") }}</span>
            </UButton>

            <UButton
              size="xl"
              color="primary"
              variant="outline"
              class="flex flex-col items-center cursor-pointer py-6"
              @click="selectMethod('qr')"
            >
              <UIcon name="i-heroicons-qr-code" class="text-3xl mb-2" />
              <span>{{ $t("label.qrCode") }}</span>
            </UButton>
          </div>
        </div>

        <!-- Cash Checkout -->
        <CashierCheckoutCash
          v-else-if="paymentMethod === 'cash'"
          v-model:cash-received="cashReceived"
          :total="cartStore.total"
          :change="change"
          @confirm="confirmCashCheckout"
          @back="goBack"
        />

        <!-- QR Checkout -->
        <CashierCheckoutQR
          v-else-if="paymentMethod === 'qr'"
          :total="cartStore.total"
          @confirm="confirmQRCheckout"
          @back="goBack"
        />
      </div>
    </template>
  </UModal>
</template>
