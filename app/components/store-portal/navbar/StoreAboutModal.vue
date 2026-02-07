<script setup lang="ts">
const open = defineModel<boolean>("open", { default: false });
</script>
<template>
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
</template>
