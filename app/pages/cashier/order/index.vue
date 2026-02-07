<script setup lang="ts">

const router = useRouter();
const open = ref(false);

onMounted(() => {
  router.push("/cashier/order");
});
</script>
<template>
  <main class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] h-full gap-4">
    <!-- Products Section -->
    <section class="h-full overflow-hidden">
      <CashierProductSearch />
      <div class="overflow-y-auto overflow-x-hidden px-3 h-full">
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
      </div>
    </section>

    <!-- Cart Section -->
    <section
      class="overflow-hidden xl:shadow-lg xl:p-3 h-full xl:block hidden rounded-lg"
    >
      <CashierOrderDetailPanel />
    </section>
    <UDrawer v-model:open="open" direction="right">
      <template #content>
        <CashierOrderDetailPanel />
      </template>
    </UDrawer>
    <UiFloatButton
      @click="open = !open"
      icon="i-lucide-shopping-cart"
      class="p-3 xl:hidden cursor-pointer"
    />
  </main>
</template>
