<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const { locale, setLocale, locales } = useI18n();
const items = ref<DropdownMenuItem[]>([
  {
    label: "🇬🇧 English",
    class: "cursor-pointer",
    onSelect: () => {
      setLocale("en");
    },
  },
  {
    label: "🇰🇭 ភាសាខ្មែរ",
    class: "cursor-pointer",
    onSelect: () => {
      setLocale("kh");
    },
  },
]);
</script>

<template>
  <UDropdownMenu :items="items">
    <button
      class="px-2 py-1 cursor-pointer dark:bg-black/40 bg-gray-200 rounded-md flex items-center"
    >
      <div v-if="locale === 'en'">🇬🇧 English</div>
      <div v-else-if="locale === 'kh'">🇰🇭 ភាសាខ្មែរ</div>
    </button>
  </UDropdownMenu>
</template>
