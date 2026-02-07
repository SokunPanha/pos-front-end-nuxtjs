<script setup lang="ts">

const isCollapsed = ref(false)
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar
      class="hidden md:block"
      :collapsed="isCollapsed"
    />

    <div class="flex-1 flex flex-col">
      <AppHeader @toggle-sidebar="isCollapsed = !isCollapsed" />

      <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>