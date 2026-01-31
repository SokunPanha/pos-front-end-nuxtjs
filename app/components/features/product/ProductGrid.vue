
<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";

const { products, loading, error, fetchProducts } = useProducts();
const route = useRoute();

watch(
  () => [route.query.category, route.query.search],
  ([newCategory, newSearch]) => {
 
    if (newCategory == "" && !newSearch) {
      fetchProducts({});
    } else if(newCategory || newSearch) {
      fetchProducts({category: newCategory as string, search: newSearch as string});
    }
    
  },
  { immediate: true },
);
</script>
<template>
  <Transition name="fade" mode="out-in">
    <!-- Loading -->
    <UiProductSkeleton
      v-if="loading"
      key="loading"
      :count="10"
    />

    <!-- Error -->
    <div
      v-else-if="error"
      key="error"
      class="text-center py-8 text-red-500"
    >
      <p>{{ error }}</p>
      <UButton class="mt-2" @click="fetchProducts({})">Retry</UButton>
    </div>

    <!-- Empty -->
    <div
      v-else-if="products.length === 0"
      key="empty"
      class="flex justify-center items-center w-full h-full gap-2"
    >
      <UIcon name="i-lucide-search" class="text-4xl" />
      <p>No products found</p>
    </div>

    <!-- Products -->
    <div
      v-else
      key="products"
      class="grid grid-cols-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </Transition>
</template>
<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>


<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
