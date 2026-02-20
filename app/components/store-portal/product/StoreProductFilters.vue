<script setup lang="ts">
import { debounce } from 'perfect-debounce';

const route = useRoute();
const router = useRouter();

const handleCategorySelected = (uuid: string) => {
  router.push({
    path: '/store/' + route.params.storeId,
    query: {
      ...route.query,
      category: uuid || undefined,
    },
  });
};

const handleSearch = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.trim() === '') {
    router.push({ path: '/store/' + route.params.storeId });
    return;
  }
  router.push({
    path: '/store/' + route.params.storeId,
    query: { ...route.query, search: target.value },
  });
}, 500);
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
    <StoreCategoryList @category-selected="handleCategorySelected" />
  </div>
</template>
