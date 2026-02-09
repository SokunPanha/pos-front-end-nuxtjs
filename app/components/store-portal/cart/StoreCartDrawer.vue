<script setup lang="ts">
import usePlaceOrder from "~/composables/store/usePlaceOrder";

const cartStore = useCartStore();
const { onPlaceOrder, isLoading } = usePlaceOrder();
const open = defineModel<boolean>("open", { default: false });

watch(
  () => cartStore.items,
  (newItems) => {
    if (newItems.length === 0) {
      open.value = false;
    }
  },
);
</script>
<template>
  <UDrawer v-model:open="open" class="max-w-2xl flex flex-col flex-nowrap   mx-auto">
    <template #header>
      <div class="flex items-center flex-col gap-2">
        <h2 class="text-lg font-medium">{{ $t("label.yourOrder") }}</h2>
        <OrderType />
      </div>
    </template>
    <template #body >
      <OrderCardGrid :items="cartStore.items"  class="max-h-[30vh] ">
        <template #order-cards="{ items }">
          <TransitionGroup name="fade" tag="div" class="flex flex-col relative">
            <OrderCard
              v-for="item in items"
              :key="item.id"
              :item="item"
              @decrease="cartStore.decrease(item.productId)"
              @increase="cartStore.increase(item.productId)"
              @remove="cartStore.remove(item.productId)"
            />
          </TransitionGroup>
        </template>
      </OrderCardGrid>
    </template>
    <template #footer class="">
      <UiOrderSummary
        :total-items="cartStore.totalItems"
        :sub-total="cartStore.subTotal"
        :discount="cartStore.discount"
        :total="cartStore.total"
      />
      <UButton
        block
        size="lg"
        color="primary"
        class="cursor-pointer text-white font-bold"
        @click="onPlaceOrder"
        :loading="isLoading"
      >
        {{ $t("label.placeOrder") }}
      </UButton>
    </template>
  </UDrawer>
</template>
