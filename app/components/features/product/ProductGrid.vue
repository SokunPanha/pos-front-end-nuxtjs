
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
    }else{
      fetchProducts({});
    }
    
  },
  { immediate: true },
);
</script>
<template>
    <div class="overflow-y-hidden overflow-x-hidden  h-full">

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
      class="flex justify-center items-center  w-full max-h-screen h-full  gap-2"
    >
      <UIcon name="i-lucide-search" class="text-4xl  "  />
      <p>No products found</p>
    </div>

    <!-- Products -->
    <div v-else class="h-full overflow-y-auto">
       <slot name="products" :products="products" ></slot>
    </div>
  </Transition>
  </div>
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
