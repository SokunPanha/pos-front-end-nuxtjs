<script setup lang="ts">
definePageMeta({
  layout: 'store-layout',
});
const route = useRoute();
onMounted(()=>{
  localStorage.setItem("tableId", route.params.storeId as string);
})
onUnmounted(()=>{
  localStorage.removeItem("tableId");
})


const open = ref(false);
</script>
<template>
  <main class="h-full gap-4 w-full relative">
    <!-- Products Section -->
    <StoreProductFilters />
    <StoreProductGrid>
      <template #products="{ products }">
        <div
          key="products"
          class="flex flex-col p-2 gap-3"
        >
          <StoreProductCard
            v-for="product in products"
            :key="product.uuid"
            :product="product"
          />
        </div>
      </template>
    </StoreProductGrid>
    <UiFloatButton @click="open = !open" icon="i-lucide-shopping-cart" />
    <StoreCartDrawer v-model:open="open" />
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
