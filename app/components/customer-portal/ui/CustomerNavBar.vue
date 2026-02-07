<script setup lang="ts">
const open = ref(false);
const openModal = () => {
  console.log("open modal");
  open.value = true;
};
</script>
<template>
  <header
    class="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center"
  >
    <div @click="openModal" class="flex cursor-pointer items-center gap-2">
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
    <UModal v-model:open="open">
      <template #header>
        <UButton
          color="neutral"
          variant="ghost"
          size="lg"
          icon="i-heroicons-x-mark"
          class="absolute top-4 right-4"
          @click="open = false"
        />
        <div class="flex flex-row items-center gap-4">
         
          <UAvatar size="2xl" class="w-20 bg-white h-20 border-1">
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
      </template>
      <template #body>
        <div class="flex flex-col items-center gap-4">
          {{ $t("message.aboutUs") }}
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col items-start gap-4 px-3">
          <span class="flex items-center gap-2">
            <UIcon name="i-heroicons-phone" />
            0123456789
          </span>
          <a
            href="https://t.me/sunnysong2222"
            target="_blank"
            class="flex items-center gap-2"
          >
            <UIcon name="i-simple-icons-telegram" class="text-blue-500" />
            @sunnysong2222
          </a>
          <NuxtLink
            href="https://maps.app.goo.gl/tmt3THdPAoQiKw3NA"
            target="_blank"
            class="flex items-center gap-2"
          >
            <UIcon name="i-heroicons-map-pin" class="text-amber-600" />
            {{ $t("message.storeLocation") }}
          </NuxtLink>
        </div>
      </template>
    </UModal>
  </header>
</template>
