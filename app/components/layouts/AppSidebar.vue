<script setup lang="ts">
defineProps<{
  collapsed: boolean;
}>();

import type { NavigationMenuItem } from "@nuxt/ui";
const emit = defineEmits<{
  (e: "selected", value: boolean): void;
}>();
const { t } = useI18n();

const navigationItems = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: t("label.newOrders"),
      to: "/cashier/order",
      icon: "i-lucide-plus-circle",
      onSelect: () => {
        emit("selected", true);
      },
    },
    {
      label: t("label.openOrders"),
      to: "/cashier/open-order",
      icon: "i-lucide-clock",
      onSelect: () => emit("selected", true),
    },
    {
      label: t("label.checkout"),
      to: "/cashier/checkout",
      icon: "i-lucide-credit-card",
      onSelect: () => emit("selected", true),
    },
    {
      label: t("label.dinnerTable"),
      to: "/cashier/dinning-table",
      icon: "i-lucide-armchair",
      onSelect: () => emit("selected", true),
    },
    {
      label: t("label.orderHistory"),
      to: "/cashier/order-history",
      icon: "i-lucide-history",
      onSelect: () => emit("selected", true),
    },
  ],
]);
</script>

<template>
  <nav
    class="h-screen border-r border-gray-200 dark:border-gray-800 transition-[width] duration-300"
    :class="collapsed ? 'w-[70px]' : 'w-64'"
  >
    <div class="p-4 text-center font-bold">
      <span v-if="!collapsed">Tiny POS</span>
    </div>

    <UNavigationMenu
      orientation="vertical"
      :collapsed="collapsed"
      :items="navigationItems"
      class="px-2"
    />
  </nav>
</template>
