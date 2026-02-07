<script setup lang="ts">
import FloatButton from "~/components/ui/FloatButton.vue";
import debounce from "lodash/debounce";
const route = useRoute();
const router = useRouter();
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
</script>
<template>
  <main class="h-full gap-4 w-full  relative">
    <!-- Products Section -->
    <div class="bg-white py-5">
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
    <div class="overflow-y-hidden overflow-x-hidden px-3 h-full">
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
  </main>
</template>
