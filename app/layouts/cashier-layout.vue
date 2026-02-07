<script setup lang="ts">
const isCollapsed = ref(false);
const openModal = ref(false)
const handleOpenModal = (value: boolean) => {
  openModal.value = !value
}

</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar class="hidden md:block" :collapsed="isCollapsed"  />

    <div class="flex-1 flex flex-col">
      <AppHeader>
        <template #appendLeft>
          <UButton
            :icon="isCollapsed ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
            variant="ghost"
            class="hidden md:inline-flex cursor-pointer"
            @click="isCollapsed = !isCollapsed"
          />
          <UDrawer v-model:open="openModal" class="md:hidden" direction="left" :handle="false">
            <UButton icon="i-lucide-menu" variant="ghost" class="cursor-pointer" />
            <template #content>
              <AppSidebar :collapsed="false" @selected="handleOpenModal" />
            </template>
          </UDrawer>
        </template>
      </AppHeader>

      <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>
