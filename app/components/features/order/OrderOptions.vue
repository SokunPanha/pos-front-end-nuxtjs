<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const showNote = ref(false)

const orderTypeOptions = [
  { label: 'Dine-in', value: 'dine-in' },
  { label: 'Take-away', value: 'take-away' }
]
</script>

<template>
  <div class="space-y-3 pb-3 border-b border-gray-200 dark:border-gray-700">
    <!-- Order Type Toggle -->
    <div class="flex gap-2">
      <UButton
        v-for="option in orderTypeOptions"
        :key="option.value"
        :color="cartStore.orderType === option.value ? 'primary' : 'neutral'"
        :variant="cartStore.orderType === option.value ? 'solid' : 'outline'"
        size="sm"
        @click="cartStore.setOrderType(option.value as 'dine-in' | 'take-away')"
      >
        {{ option.label }}
      </UButton>
    </div>

    <!-- Table Number (only for dine-in) -->
    <UInput
      v-if="cartStore.orderType === 'dine-in'"
      v-model="cartStore.tableNumber"
      placeholder="Table number"
      size="sm"
      icon="i-heroicons-hashtag"
    />

    <!-- Collapsible Note -->
    <div>
      <UButton
        v-if="!showNote && !cartStore.orderNote"
        variant="ghost"
        size="xs"
        icon="i-heroicons-plus"
        @click="showNote = true"
      >
        Add note
      </UButton>
      <UTextarea
        v-if="showNote || cartStore.orderNote"
        v-model="cartStore.orderNote"
        placeholder="Order notes..."
        size="sm"
        :rows="2"
      />
    </div>
  </div>
</template>
