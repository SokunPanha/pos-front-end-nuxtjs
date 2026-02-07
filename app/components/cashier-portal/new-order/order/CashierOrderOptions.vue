<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const showNote = ref(false);
const { t } = useI18n();

const orderTypeOptions = computed(() => [
  { label: t("label.dineIn"), value: "dine-in" },
  { label: t("label.takeAway"), value: "take-away" },
]);
</script>

<template>
  <div class="space-y-3 pb-3 border-b border-gray-200 dark:border-gray-700">
    <!-- Order Type Toggle -->
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
        {{ option.label }}
      </UButton>
    </div>

    <!-- Table Number (only for dine-in) -->
    <UInput
      v-if="cartStore.orderType === 'dine-in'"
      v-model="cartStore.tableNumber"
      :placeholder="$t('placeholder.tableNumber')"
      size="sm"
      icon="i-heroicons-hashtag"
    />

    <!-- Collapsible Note -->
    <div>
      <UButton
        class="cursor-pointer"
        v-if="!showNote && !cartStore.orderNote"
        variant="ghost"
        size="xs"
        icon="i-heroicons-plus"
        @click="showNote = true"
      >
        {{ t("label.addNote") }}
      </UButton>
      <UTextarea
        class="cursor-pointer"
        v-if="showNote || cartStore.orderNote"
        v-model="cartStore.orderNote"
        :placeholder="$t('placeholder.orderNotes')"
        size="sm"
        :rows="2"
      />
    </div>
  </div>
</template>
