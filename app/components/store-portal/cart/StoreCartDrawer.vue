<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const open = defineModel<boolean>("open", { default: false });
</script>
<template>
  <UDrawer v-model:open="open" class="max-w-2xl mx-auto">
    <template #header>
      <div class="flex items-center">
        <h2 class="text-lg font-medium">{{ $t("label.yourOrder") }}</h2>
      </div>
    </template>
    <template #body>
      <OrderCardGrid :items="cartStore.items">
        <template #order-cards="{ items }">
          <TransitionGroup
            name="fade"
            tag="div"
            class="flex flex-col relative"
          >
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
    <template #footer>
      <UiOrderSummary
        :total-items="cartStore.totalItems"
        :sub-total="cartStore.subTotal"
        :discount="cartStore.discount"
        :total="cartStore.total"
      />
      <UButton block size="lg" color="success" class="cursor-pointer">
        {{ $t("label.placeOrder") }}
      </UButton>
    </template>
  </UDrawer>
</template>
