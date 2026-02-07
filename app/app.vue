<script setup>
const route = useRoute()
const layout = computed(() => {
  if (route.path.startsWith('/admin')) {
    return 'admin-layout'
  } else if (route.path.startsWith('/cashier')) {
    return 'cashier-layout'
  }

})

</script>

<template>
  <UApp :toaster="{ position: 'top-right' , duration: 5000}">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
