<script setup lang="ts">
import type { CartItem } from "~~/shared/types/cart";

const props = defineProps<{
  item: CartItem;
}>();

const emit = defineEmits(["increase", "decrease", "remove"]);
</script>

<template>
  <div class="flex flex-row justify-between w-full  p-3 rounded-sm gap-3 items-center">
    <div class="flex flex-row gap-3 items-center">
      <!-- Image -->
      <NuxtImg :src="item.image" class="md:h-16 md:w-16 h-10 w-10 rounded object-cover" format="webp" quality="80" />

      <!-- Info -->
      <div class="flex-1">
        <UTooltip
          :text="item.name"
          :content="{
            align: 'center',
            side: 'top',
          }"
          :delay-duration="0"
        >
          <p class="md:text-base text-xs font-medium line-clamp-1 md:max-w-[300px] sm:max-w-[200px] max-w-[100px]">
            {{ item.name }}
          </p>
        </UTooltip>

        <div class="text-xs md:text-sm text-gray-500">${{ item.price.toFixed(2) }}</div>
      </div>
    </div>

    <div class="flex gap-2 items-center  ">
      <!-- Quantity -->
      <div class="flex items-center gap-2">
        <UButton
          class="cursor-pointer text-white"
          size="xs"
          icon="i-heroicons-minus"
          @click="emit('decrease', item.productId)"
        />

        <span class="w-5 text-center">
          {{ item.quantity }}
        </span>

        <UButton
          class="cursor-pointer text-white"
          size="xs"
          icon="i-heroicons-plus"
          @click="emit('increase', item.productId)"
        />
      </div>

      <!-- Remove -->
      <UButton
        class="cursor-pointer"
        color="error"
        variant="ghost"
        icon="i-heroicons-trash"
        @click="emit('remove', item.productId)"
      />
    </div>
  </div>
</template>
