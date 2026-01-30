<script setup lang="ts">
type Product = {
  id: number
  name: string
  originalPrice: number
  promoPrice?: number | null
  discountPercent?: number
  image: string
  category: string
  description?: string
}

const props = defineProps<{
  product: Product
}>()

const finalPrice = computed(() =>
  props.product.promoPrice ?? props.product.originalPrice
)
</script>

<template>
  <UCard class="hover:shadow-lg duration-300 hover:scale-[1.03] cursor-pointer">
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
      <h3 class="font-semibold text-base">
        {{ product.name }}
      </h3>

      <p class="text-xs text-gray-500">
        {{ product.category }}
      </p>

      <!-- Price -->
      <div class="flex items-center gap-2 mt-1">
        <span class="font-bold text-lg text-primary">
          ${{ finalPrice.toFixed(2) }}
        </span>

        <span
          v-if="product.promoPrice"
          class="line-through text-sm text-gray-400"
        >
          ${{ product.originalPrice.toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Action -->
    <template #footer>
      <UButton
      class="cursor-pointer text-black"
        block
        color="primary"
        icon="i-heroicons-shopping-cart"
      >
        Add to cart
      </UButton>
    </template>
  </UCard>
</template>
