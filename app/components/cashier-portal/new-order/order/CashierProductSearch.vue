<script setup lang="ts">
import { debounce } from "perfect-debounce";
const route = useRoute();
const router = useRouter();
const handleCategorySelected = (category: string) => {
  router.push({
    path: "/cashier/order",
    query: {
      ...route.query,
      category,
    },
  });
};
const handleSearch = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  router.push({
    path: "/cashier/order",
    query: {
      ...route.query,
      search: target.value,
    },
  });
}, 500);
</script>

<template>
    <div class="mb-3 bg-gray-50 dark:bg-gray-900 py-2">
        <div class="flex justify-between mb-3 items-center">
          <h1 class="text-xl md:text-2xl font-bold">{{ $t("label.orderList") }}</h1>
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
</template>