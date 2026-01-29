<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()

import type { NavigationMenuItem } from '@nuxt/ui'

 const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      children: [
        {
          label: 'Introduction',
          to: '/docs/introduction',
          icon: 'i-lucide-house'
        },
        {
          label: 'Installation',
          icon: 'i-lucide-cloud-download'
        }
      ]
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      children: [
        {
          label: 'Modal',
          to: '/docs/components/modal'
        }
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    }
  ]
]
</script>

<template>
  <nav
    class="h-screen border-r border-gray-200 dark:border-gray-800 transition-[width] duration-300"
    :class="collapsed ? 'w-[70px]' : 'w-64'"
  >
    <div class="p-4 text-center font-bold">
      <span v-if="!collapsed">Tiny POS</span>
    </div>

    <UNavigationMenu
      orientation="vertical"
      :collapsed="collapsed"
      :items="navigationItems"
      class="px-2"
    />
  </nav>
</template>