<script setup lang="ts">
import { orderTypeOptions } from '~~/shared/constants';

const cartStore = useCartStore();
</script>

<template>
    <div class="flex gap-2">
      <UButton
        class="cursor-pointer"
        v-for="option in orderTypeOptions"
        :key="option.value"
        :color="cartStore.orderType === option.value ? 'primary' : 'neutral'"
        :variant="cartStore.orderType === option.value ? 'solid' : 'outline'"
        size="sm"
        @click="cartStore.setOrderType(option.value as 'dine-in' | 'take-away')"
      >
        {{ $t(option.label) }}
      </UButton>
    </div>
</template>