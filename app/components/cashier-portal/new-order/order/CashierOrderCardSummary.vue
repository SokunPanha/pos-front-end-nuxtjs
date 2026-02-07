<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const emit = defineEmits(["openOrder", "openCheckout"]);
const cartStore = useCartStore();
const { t } = useI18n();


</script>

<template>
  <UCard>
    <UiOrderSummary
      :total-items="cartStore.totalItems"
      :sub-total="cartStore.subTotal"
      :discount="cartStore.discount"
      :total="cartStore.total"
    />
    <template #footer>
      <div class="flex gap-2 flex-col">
        <UButton
          block
          color="primary"
          class="cursor-pointer font-semibold text-white"
          :disabled="cartStore.totalItems === 0"
          @click="emit('openOrder')"
        >
          {{ t("label.placeOrder") }}
        </UButton>
        <UButton
          block
          class="bg-green-800! dark:bg-green-500! cursor-pointer font-semibold text-white"
          :disabled="cartStore.totalItems === 0"
          @click="emit('openCheckout')"
        >
          {{ t("label.checkout") }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
