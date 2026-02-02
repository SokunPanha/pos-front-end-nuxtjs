    import { useCartStore } from "~/stores/cart";
import { useOrders } from "~/composables/useOrders";
import type { PaymentMethod, ReceiptData } from "~~/shared/types/payment";
import type { ModelRef } from "vue";

export default function useCheckout({ isOpen }: { isOpen: ModelRef<boolean> }) {

const cartStore = useCartStore();
const { createOrder, processPayment, loading, error } = useOrders();
const { t } = useI18n();

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

return {
    isOpen,
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
    error,
    cartStore,
}
}