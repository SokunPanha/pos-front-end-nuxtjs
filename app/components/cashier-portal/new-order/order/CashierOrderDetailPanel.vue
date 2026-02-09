<script setup lang="ts">
import usePlaceOrder from '~/composables/store/usePlaceOrder';

const { showCheckoutModal, openCheckout, openOrder } = useOrders();
const { onPlaceOrder, isLoading } = usePlaceOrder();
const cartStore = useCartStore();
</script>

<template>
  <main class="flex flex-col justify-between h-full  p-2 ">
    <h1 class="md:text-2xl text-md overflow-hidden font-bold py-3">
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
    <CashierOrderCardSummary :isLoading="isLoading" @open-order="onPlaceOrder" @open-checkout="openCheckout" />
    <CashierCheckoutModal v-model:open="showCheckoutModal" />
  </main>
</template>
