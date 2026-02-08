<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const YYYY = date.getFullYear();
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  return `${dd}:${MM}:${YYYY} ${HH}:${mm}`;
}

const {locale} = useI18n();
const toast = useToast()
const isLoading = ref(false);
const cartStore = useCartStore();
const onPlaceOrder = async () => {
  try {
    isLoading.value = true;
    // Simulate order placement logic
    const orderItems = cartStore.items.map((item) => ({
      productName: item.name.kh,
      quantity: item.quantity,
    }));
    const orderData = {
      orderItems: orderItems,
      orderType: "ខ្ចប់" as const,
      dinningTableNumber: "168",
      totalPrice: cartStore.total,
      placeOrderDate: formatDate(new Date()),
    };
    const response = await $fetch("/api/store/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderData,
    });
    
    cartStore.clear();
    toast.add({
      title: locale.value === "en" ? "Order Placed" : "បានដាក់ការបញ្ជាទិញ",
      description: locale.value === "en" ? "Your order has been placed successfully!" : "ការបញ្ជាទិញរបស់អ្នកត្រូវបានដាក់ស្តាយដោយជោគជ័យ!",
      color: "success",
    });

    // Clear the cart after placing the order
    // cartStore.clearCart();
  } catch (error) {
    console.error("Failed to place order:", error);
  }
  finally {
    isLoading.value = false;
  }
};
watch(
  () => cartStore.items,
  (newItems) => {
    if (newItems.length === 0) {
      open.value = false;
    }
  },
);
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
    <template #footer>
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
