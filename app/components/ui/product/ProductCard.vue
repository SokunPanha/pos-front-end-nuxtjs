<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import type { Product } from "~~/shared/types/product";

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const quantity = ref(1);
const finalPrice = computed(
  () => props.product.promoPrice ?? props.product.originalPrice,
);
function handleAddToCart() {
  cartStore.addToCart(props.product, quantity.value);
  quantity.value = 1;
}
</script>

<template>
  <UCard class="hover:shadow-lg cursor-pointer">
    <!-- Image -->
    <div class="relative">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-40 w-full object-cover rounded-lg"
      />

      <!-- Discount badge -->
      <UBadge
        v-if="product.discountPercent"
        color="error"
        class="absolute top-2 left-2"
      >
        -{{ product.discountPercent }}%
      </UBadge>
    </div>

    <!-- Content -->
    <div class="mt-3 space-y-1">
      <UTooltip
        :text="product.name"
        :content="{
          align: 'center',
          side: 'top',
        }"
        :delay-duration="0"
      >
        <h3 class="font-semibold sm:text-base  text-sm line-clamp-1">
          {{ product.name }}
        </h3>
      </UTooltip>

      <p class="text-xs text-gray-500 sm:text-sm ">
        {{ product.category }}
      </p>

      <!-- Price -->
      <div class="flex items-center gap-2 mt-1">
        <span class="font-bold md:text-lg sm:text-base text-sm text-primary">
          ${{ finalPrice.toFixed(2) }}
        </span>

        <span
          v-if="product.promoPrice"
          class="line-through md:text-sm sm:text-xs text-xs text-gray-400"
        >
          ${{ product.originalPrice.toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Action -->
    <template #footer>
      <UButton
        v-if="cartStore.getItemById(props.product.id) == 0"
        class="cursor-pointer text-white"
        block
        color="primary"
        icon="i-heroicons-shopping-cart"
        @click="handleAddToCart"
      >
        {{ $t("label.addToCart") }}
      </UButton>

      <div
        v-if="cartStore.getItemById(props.product.id) > 0"
        class="flex gap-2 items-center justify-center"
      >
        <!-- Quantity -->
        <div class="flex items-center gap-2">
          <UButton
            class="cursor-pointer"
            size="xs"
            icon="i-heroicons-minus"
            @click="cartStore.decrease(props.product.id)"
          />

          <span class="w-5 text-center">
            {{ cartStore.getItemById(props.product.id) }}
          </span>

          <UButton
            class="cursor-pointer"
            size="xs"
            icon="i-heroicons-plus"
            @click="cartStore.increase(props.product.id)"
          />
        </div>

        <!-- Remove -->
        <UButton
          color="error"
          variant="ghost"
          class="cursor-pointer"
          icon="i-heroicons-trash"
          @click="cartStore.remove(props.product.id)"
        />
      </div>
    </template>
  </UCard>
</template>
