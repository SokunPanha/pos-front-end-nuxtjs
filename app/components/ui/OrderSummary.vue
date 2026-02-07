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
     <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span>{{ t("label.items") }}</span>
        <span>{{ props.totalItems }}</span>
      </div>

      <div class="flex justify-between">
        <span>{{ t("label.subtotal") }}</span>
        <span>${{ props.subTotal.toFixed(2) }}</span>
      </div>

      <div
        v-if="props.discount > 0"
        class="flex justify-between text-green-600"
      >
        <span>{{ t("label.discount") }}</span>
        <span>- ${{ props.discount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between font-semibold text-base">
        <span>{{ t("label.total") }}</span>
        <span>${{ props.total.toFixed(2) }}</span>
      </div>
    </div>-
</template>