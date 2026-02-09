<script setup lang="ts">
const props = defineProps<{
  totalItems: number;
  subTotal: number;
  discount: number;
  total: number;
}>();
const { t } = useI18n();
</script>
<template>
     <div class="space-y-2 text-sm h-fit">
      <div class="flex justify-between">
        <span class="md:text-base text-xs">{{ t("label.items") }}</span>
        <span class="md:text-base text-xs">{{ props.totalItems }}</span>
      </div>

      <div class="flex justify-between">
        <span class="md:text-base text-xs">{{ t("label.subtotal") }}</span>
        <span class="md:text-base text-xs">${{ props.subTotal.toFixed(2) }}</span>
      </div>

      <div
        v-if="props.discount > 0"
        class="flex justify-between text-green-600"
      >
        <span class="md:text-base text-xs">{{ t("label.discount") }}</span>
        <span class="md:text-base text-xs">- ${{ props.discount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between font-semibold text-base">
        <span class="md:text-base text-xs">{{ t("label.total") }}</span>
        <span class="md:text-base text-xs">${{ props.total.toFixed(2) }}</span>
      </div>
    </div>-
</template>