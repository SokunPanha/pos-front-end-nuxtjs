<script setup>
const colorMode = useColorMode()
</script>

<template>
<ClientOnly>
  <UButton @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'"
  variant="ghost"
  >
    {{ colorMode.value === 'dark' ? '🌙 Dark' : '☀️ Light' }}
  </UButton>
</ClientOnly>
</template>
