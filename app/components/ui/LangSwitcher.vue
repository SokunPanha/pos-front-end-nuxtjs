<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const { locale, setLocale, locales } = useI18n();
const items = ref<DropdownMenuItem[]>([
  {
    label: "🇬🇧 English",
    onSelect: () => {
      setLocale("en");
    },
  },
  {
    label: "🇰🇭 ភាសាខ្មែរ",
    onSelect: () => {
      setLocale("kh");
    },
  },
]);
</script>

<template>
  <UDropdownMenu :items="items">
    <button
      class="px-2 py-1 dark:bg-black/40 bg-gray-200 rounded-md flex items-center"
    >
      <span v-if="locale === 'en'">🇬🇧 English</span>
      <span v-else-if="locale === 'kh'">🇰🇭 ភាសាខ្មែរ</span>
    </button>
  </UDropdownMenu>
</template>
