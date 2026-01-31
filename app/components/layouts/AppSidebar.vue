<script setup lang="ts">
defineProps<{
  collapsed: boolean;
}>();

import type { NavigationMenuItem } from "@nuxt/ui";

const { t } = useI18n();

const navigationItems = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: t("label.newOrders"),
      to: "/pos/order",
      icon: "i-lucide-plus-circle",
    },
    {
      label: t("label.openOrders"),
      to: "/pos/orders/open",
      icon: "i-lucide-clock",
    },
    {
      label: t("label.checkout"),
      to: "/pos/checkout",
      icon: "i-lucide-credit-card",
    },
     {
      label: t("label.dinnerTable"),
      to: "/pos/tables",
      icon: "i-lucide-armchair",
    },
    {
      label: t("label.orderHistory"),
      to: "/pos/orders/history",
      icon: "i-lucide-history",
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
