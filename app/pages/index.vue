<script setup lang="ts">
import debounce from "lodash/debounce";
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
definePageMeta({
  layout: "customer-layout",
});

const handleCategorySelected = (category: string) => {
  router.push({
    path: "/",
    query: {
      ...route.query,
      category,
    },
  });
};
const open = ref(false);
const handleSearch = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.trim() == "") {
    router.push({
      path: "/",
    });
    return;
  }
  router.push({
    path: "/",
    query: {
      ...route.query,
      search: target.value,
    },
  });
}, 500);

watch(
  () => cartStore.total,
  () => {
    if (cartStore.total <= 0) {
      open.value = false;
    }
  },
);
</script>
<template>
  <main class="h-full gap-4 w-full relative">
    <!-- Products Section -->
    <div class=" py-5">
      <div class="flex justify-between mb-3 items-center">
        <UInput
          icon="i-lucide-search"
          size="md"
          class="w-full"
          variant="outline"
          :placeholder="$t('placeholder.search')"
          v-on:input="handleSearch"
        />
      </div>
      <ProductCategoryList @category-selected="handleCategorySelected" />
    </div>
    <div class="overflow-y-hidden overflow-x-hidden  h-full">
      <ProductGrid>
        <template #products="{ products }">
          <div
            key="products"
            class="grid grid-cols-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
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

    <UButton
      @click="open = !open"
      icon="i-lucide-shopping-cart"
      class="p-3 absolute bottom-5 right-5 cursor-pointer"
    />
    <UDrawer v-model:open="open">
      <template #header>
        <div class="flex items-center">
          <h2 class="text-lg font-medium">{{ $t("label.yourOrder") }}</h2>
        </div>
      </template>
      <template #body>
        <OrderCardGrid :items="cartStore.items">
          <template #order-cards="{ items }">
            <TransitionGroup
              name="fade"
              tag="div"
              class="flex flex-col relative"
            >
              <OrderCard
                v-for="item in items"
                :key="item.id"
                :item="item"
                @decrease="cartStore.decrease(item.productId)"
                @increase="cartStore.increase(item.productId)"
                @remove="cartStore.remove(item.productId)"
              />
            </TransitionGroup>
          </template>
        </OrderCardGrid>
      </template>
      <template #footer>
        <UiOrderSummary
          :total-items="cartStore.totalItems"
          :sub-total="cartStore.subTotal"
          :discount="cartStore.discount"
          :total="cartStore.total"
        />
        <UButton block size="lg" color="success" class="cursor-pointer">
          {{ $t("label.placeOrder") }}
        </UButton>
      </template>
    </UDrawer>
  </main>
</template>

<style scoped>
/* move animation (FLIP) */
.fade-move {
  transition: transform 0.25s ease;
}

/* enter / leave animation */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

/* start state for enter */
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* end state for leave */
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* IMPORTANT: prevents layout jump */
.fade-leave-active {
  position: absolute;
  width: 100%;
}
</style>
