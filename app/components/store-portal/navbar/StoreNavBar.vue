<script setup lang="ts">
import UiLangSwitcher from '~/components/ui/LangSwitcher.vue';

const open = ref(false);
</script>
<template>
  <header
    class="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center"
  >
    <div @click="open = true" class="flex cursor-pointer items-center gap-2">
      <UAvatar size="xl" class="w-12 bg-white h-12 border-1">
        <NuxtImg
          src="./images/logo.png"
          alt="logo"
          class="w-12 h-12"
          format="webp"
        />
      </UAvatar>
      <div class="flex flex-col">
        <h1 class="text-xl m-0! p-0! font-bold">Song</h1>
        <span class="text-sm text-gray-500 dark:text-gray-400"
          >food & coffee</span
        >
      </div>
    </div>

    <div class="flex gap-3">
      <UColorModeButton />
      <UiLangSwitcher />
    </div>

    <StoreAboutModal v-model:open="open" />
  </header>
</template>
