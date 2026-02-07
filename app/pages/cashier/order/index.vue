<script setup lang="ts">
// Router instance for navigation
const router = useRouter();

// Drawer state for mobile cart view
const open = ref(false);

// Redirect to order page on mount
onMounted(() => {
  router.push("/cashier/order");
});
</script>
<template>
  <!-- Main layout: 2-column grid on xl screens, single column on smaller -->
  <main class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] h-full gap-4">
    <!-- Products Section: Search bar and product grid -->
    <section class="h-full overflow-hidden">
      <!-- Product search/filter component -->
      <CashierProductSearch />
      <!-- Product grid with responsive columns -->
      <ProductGrid>
        <template #products="{ products }">
          <div
            key="products"
            class="grid grid-cols-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4"
          >
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>
        </template>
      </ProductGrid>
    </section>

    <!-- Cart/Order Section: Shows order details panel -->
    <section>
      <!-- Desktop: Always visible order panel -->
      <CashierOrderDetailPanel class="hidden xl:block" />
      <!-- Mobile: Drawer-based order panel -->
      <UDrawer v-model:open="open" class="xl:hidden" direction="right">
        <template #content>
          <CashierOrderDetailPanel />
        </template>
      </UDrawer>
    </section>

    <!-- Mobile: Floating cart button to open drawer -->
    <UiFloatButton
      @click="open = !open"
      icon="i-lucide-shopping-cart"
      class="p-3 xl:hidden cursor-pointer"
    />
  </main>
</template>
