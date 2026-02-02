<script setup lang="ts">
import FloatButton from "~/components/ui/FloatButton.vue";
import debounce from 'lodash/debounce'
const route = useRoute();
const router = useRouter();

onMounted(()=>{
  router.push("/pos/order");
})
const handleCategorySelected = (category: string) => {
  router.push({path: "/pos/order", query: {
    ...route.query,
    category}});
};
const open = ref(false);
const handleSearch = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  router.push({path: "/pos/order", query: {
    ...route.query,
    search: target.value}});
}, 500);
</script>
<template>
  <main class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] h-full gap-4">
    <!-- Products Section -->
    <div class="overflow-y-auto overflow-x-hidden px-3 h-full">
      <div class="mb-3 sticky top-0 z-10 bg-gray-50 dark:bg-[#1b1b1f] py-2 ">
        <div class="flex justify-between mb-3  items-center">
          <h1 class="text-2xl font-bold">Products</h1>
          <UInput
            icon="i-lucide-search"
            size="md"
            variant="outline"
            :placeholder="$t('placeholder.search')"
            v-on:input="handleSearch"
          />
        </div>
        <ProductCategoryList @category-selected="handleCategorySelected" />
      </div>
      <ProductGrid />
    </div>

    <!-- Cart Section -->
    <div class="overflow-hidden xl:shadow-lg xl:p-3 h-full xl:block hidden rounded-lg">
      <OrderCardPanel />
    </div>
    <UDrawer v-model:open="open" direction="right">
      <template #content>
        <OrderCardPanel />
      </template>
    </UDrawer>
    <FloatButton @click="open = !open" class="p-3 xl:hidden cursor-pointer">
      <UIcon name="i-lucide-shopping-cart" />
    </FloatButton>
  </main>
</template>
