<script setup lang="ts">
import { useStoreProducts } from '~/composables/store/useStoreProducts';

const { products, loading, error, fetchProducts } = useStoreProducts()
console.log("🚀 ~ products:", products.value)
const route = useRoute()

watch(
  () => [route.query.category, route.query.search],
  ([category, search]) => {
    fetchProducts({
      category: category as string | undefined,
      search: search as string | undefined,
    })
  },
  { immediate: true },
)
</script>

<template>
  <div class="overflow-y-hidden overflow-x-hidden h-full">
    <Transition name="fade" mode="out-in">
      <UiProductSkeleton v-if="loading" key="loading" :count="10" />

      <div v-else-if="error" key="error" class="text-center py-8 text-red-500">
        <p>{{ error }}</p>
        <UButton class="mt-2" @click="fetchProducts({})">Retry</UButton>
      </div>

      <div
        v-else-if="products.length === 0"
        key="empty"
        class="flex justify-center items-center w-full max-h-screen h-full gap-2"
      >
        <UIcon name="i-lucide-search" class="text-4xl" />
        <p>No products found</p>
      </div>

      <div v-else key="products" class="h-full overflow-y-auto pb-40">
        <slot name="products" :products="products" />
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
