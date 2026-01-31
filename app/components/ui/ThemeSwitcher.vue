<script setup lang="ts">
const colorMode = useColorMode();
const { t } = useI18n();
</script>

<template>
  <ClientOnly>
    <UButton
      @click="
        colorMode.preference =
          colorMode.preference === 'dark' ? 'light' : 'dark'
      "
      variant="ghost"
    >
      {{
        colorMode.value === "dark"
          ? `🌙 ${t("label.dark")}`
          : `☀️ ${t("label.light")}`
      }}
    </UButton>
  </ClientOnly>
</template>
