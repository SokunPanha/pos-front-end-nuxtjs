<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useOrders } from "~/composables/useOrders";
import type { PaymentMethod, ReceiptData } from "~~/shared/types/payment";

const cartStore = useCartStore();
const { createOrder, processPayment, loading, error } = useOrders();
const { t } = useI18n();

const isOpen = defineModel<boolean>("open", { default: false });
const paymentMethod = ref<PaymentMethod | null>(null);
const cashReceived = ref(0);
const isPaid = ref(false);
const receiptData = ref<ReceiptData | null>(null);
const processingError = ref<string | null>(null);

const change = computed(() => {
  if (cashReceived.value >= cartStore.total) {
    return cashReceived.value - cartStore.total;
  }
  return 0;
});

function selectMethod(method: PaymentMethod) {
  paymentMethod.value = method;
  cashReceived.value = 0;
  processingError.value = null;
}

async function confirmCashCheckout() {
  if (cashReceived.value >= cartStore.total) {
    await completeCheckout("cash");
  }
}

async function confirmQRCheckout() {
  await completeCheckout("qr");
}

async function completeCheckout(method: PaymentMethod) {
  processingError.value = null;

  // Step 1: Create the order
  const order = await createOrder({
    orderType: cartStore.orderType,
    tableNumber:
      cartStore.orderType === "dine-in" ? cartStore.tableNumber : undefined,
    note: cartStore.orderNote || undefined,
    items: cartStore.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
    })),
    subtotal: cartStore.subTotal,
    discount: cartStore.discount,
    total: cartStore.total,
  });

  if (!order) {
    processingError.value = error.value || t("message.failedToCreateOrder");
    return;
  }

  // Step 2: Process the payment
  const paymentResult = await processPayment({
    orderId: order.id,
    method,
    amount: cartStore.total,
    cashReceived: method === "cash" ? cashReceived.value : undefined,
  });

  if (!paymentResult) {
    processingError.value = error.value || t("message.failedToProcessPayment");
    return;
  }

  // Step 3: Show receipt
  receiptData.value = paymentResult.receipt;
  isPaid.value = true;
}

function closeAndReset() {
  cartStore.clear();
  paymentMethod.value = null;
  cashReceived.value = 0;
  isPaid.value = false;
  receiptData.value = null;
  processingError.value = null;
  isOpen.value = false;
}
function closeModal() {
  isOpen.value = false;
}

function goBack() {
  paymentMethod.value = null;
  cashReceived.value = 0;
  processingError.value = null;
}
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
        <CheckoutReceipt
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
          <p class="mt-2 text-gray-500">{{ t('label.checkout.processing') }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="processingError" class="py-4 text-center">
          <div class="text-red-500 mb-4">{{ processingError }}</div>
          <UButton @click="goBack">{{ t('label.checkout.tryAgain') }}</UButton>
        </div>

        <!-- Payment Method Selection -->
        <div v-else-if="!paymentMethod" class="space-y-4">
          <h2 class="text-xl font-bold text-center">{{ t('label.checkout.selectPaymentMethod') }}</h2>

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
              <span>{{ t('label.checkout.cash') }}</span>
            </UButton>

            <UButton
              size="xl"
              color="primary"
              variant="outline"
              class="flex flex-col items-center py-6"
              @click="selectMethod('qr')"
            >
              <UIcon name="i-heroicons-qr-code" class="text-3xl mb-2" />
              <span>{{ t('label.checkout.qrCode') }}</span>
            </UButton>
          </div>
        </div>

        <!-- Cash Checkout -->
        <CheckoutCash
          v-else-if="paymentMethod === 'cash'"
          v-model:cash-received="cashReceived"
          :total="cartStore.total"
          :change="change"
          @confirm="confirmCashCheckout"
          @back="goBack"
        />

        <!-- QR Checkout -->
        <CheckoutQR
          v-else-if="paymentMethod === 'qr'"
          :total="cartStore.total"
          @confirm="confirmQRCheckout"
          @back="goBack"
        />
      </div>
    </template>
  </UModal>
</template>
