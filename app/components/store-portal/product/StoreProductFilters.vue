<script setup lang="ts">
import { debounce } from 'perfect-debounce';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const open = ref(false);

const handleCategorySelected = (category: string) => {
  router.push({
    path: "/",
    query: {
      ...route.query,
      category,
    },
  });
};
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
  <div class="py-5">
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
</template>
