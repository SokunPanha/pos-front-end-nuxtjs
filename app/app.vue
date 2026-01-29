<script setup>
const route = useRoute()
const layout = computed(() => {
  if (route.path.startsWith('/admin')) {
    return 'admin-layout'
  } else if (route.path.startsWith('/pos')) {
    return 'pos-layout'
  }

})

</script>

<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
