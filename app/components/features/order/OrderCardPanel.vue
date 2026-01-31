<script setup lang="ts">
const showCheckoutModal = ref(false);
const cartStore = useCartStore();
const toast = useToast();
const { t } = useI18n();

function openCheckout() {
  if (cartStore.orderType === "dine-in") {
    if (cartStore.tableNumber === "") {
      toast.add({
        title: t("message.pleaseSelectTable"),
        color: "warning",
        duration: 5000,
        icon: "i-lucide-exclamation-triangle",
      });
      return;
    }
  }
  if (cartStore.totalItems > 0) {
    toast.clear();
    showCheckoutModal.value = true;
  }
}
function openOrder() {
  if (cartStore.orderType === "dine-in") {
    if (cartStore.tableNumber === "") {
      toast.add({
        title: t("message.pleaseSelectTable"),
        color: "warning",
        duration: 5000,
        icon: "i-lucide-exclamation-triangle",
      });
      return;
    }
  }
}
</script>

<template>
  <main class="flex flex-col justify-between h-full">
    <h1 class="text-2xl overflow-hidden font-bold py-3">
      {{ t("label.orderDetails") }}
    </h1>
    <OrderOptions />
    <OrderCardGrid> </OrderCardGrid>
    <OrderCardSummary @open-order="openOrder" @open-checkout="openCheckout" />
    <CheckoutModal v-model:open="showCheckoutModal" />
  </main>
</template>
