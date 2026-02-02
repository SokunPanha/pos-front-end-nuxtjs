<script setup lang="ts">
const { showCheckoutModal, openCheckout, openOrder } = useOrders();
</script>

<template>
  <main class="flex flex-col justify-between h-full">
    <h1 class="text-2xl overflow-hidden font-bold py-3">
      {{ $t("label.orderDetails") }}
    </h1>
    <OrderOptions />
    <OrderCardGrid> </OrderCardGrid>
    <OrderCardSummary @open-order="openOrder" @open-checkout="openCheckout" />
    <CheckoutModal v-model:open="showCheckoutModal" />
  </main>
</template>
