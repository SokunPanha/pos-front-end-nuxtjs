<script setup lang="ts">

defineEmits(["toggle-sidebar"]);
</script>

<template>
  <header
    class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b px-4 py-3 flex justify-between items-center"
  >
    <div class="flex items-center gap-2">
      <slot name="appendLeft" />
    </div>

    <div class="flex gap-3">
      <UColorModeButton />
      <UiLangSwitcher />
    </div>
  </header>
</template>
