<template>
  <UDrawer direction="right">
    <UButton class="absolute bottom-10 right-10 cursor-pointer rounded-full p-5"  color="primary" trailing-icon="i-lucide-shopping-cart" />
    <template #content>
      <div class="p-3">
        <OrderMainCart  />
      </div>
    </template>
  </UDrawer>
</template>
