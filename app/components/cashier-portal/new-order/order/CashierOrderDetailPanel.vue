<script setup lang="ts">
const { showCheckoutModal, openCheckout, openOrder } = useOrders();
const cartStore = useCartStore();
</script>

<template>
  <main class="flex flex-col justify-between h-full">
    <h1 class="text-2xl overflow-hidden font-bold py-3">
      {{ $t("label.orderDetails") }}
    </h1>
    <CashierOrderOptions />
    <OrderCardGrid :items="cartStore.items">
      <template #order-cards="{ items }">
        <OrderCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          @decrease="cartStore.decrease(item.productId)"
          @increase="cartStore.increase(item.productId)"
          @remove="cartStore.remove(item.productId)"
        />
      </template>
    </OrderCardGrid>
    <CashierOrderCardSummary @open-order="openOrder" @open-checkout="openCheckout" />
    <CashierCheckoutModal v-model:open="showCheckoutModal" />
  </main>
</template>
