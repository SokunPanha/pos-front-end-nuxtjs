<script setup lang="ts">
import { collapsible } from '#build/ui';
import type { NavigationMenuItem } from '@nuxt/ui'

const isCollapsed = ref(false)

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label: 'Guide',
            icon: 'i-lucide-book-open',
            children: [
                {
                    label: 'Introduction',
                    to: '/docs/introduction',
                    description: 'Fully styled and customizable components for Nuxt.',
                    icon: 'i-lucide-house'
                },
                {
                    label: 'Installation',
                    description: 'Learn how to install and configure Nuxt UI in your application.',
                    icon: 'i-lucide-cloud-download'
                },
                {
                    label: 'Icons',
                    icon: 'i-lucide-smile',
                    description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
                },
                {
                    label: 'Colors',
                    icon: 'i-lucide-swatch-book',
                    description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
                },
                {
                    label: 'Theme',
                    icon: 'i-lucide-cog',
                    description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
                }
            ]
        },
        {
            label: 'Composables',
            icon: 'i-lucide-database',
            children: [
                {
                    label: 'defineShortcuts',
                    icon: 'i-lucide-file-text',
                    description: 'Define shortcuts for your application.',
                    to: '/docs/composables/define-shortcuts'
                },
                {
                    label: 'useOverlay',
                    icon: 'i-lucide-file-text',
                    description: 'Display a modal/slideover within your application.',
                    to: '/docs/composables/use-overlay'
                },
                {
                    label: 'useToast',
                    icon: 'i-lucide-file-text',
                    description: 'Display a toast within your application.',
                    to: '/docs/composables/use-toast'
                }
            ]
        },
        {
            label: 'Components',
            icon: 'i-lucide-box',
            to: '/docs/components',
            active: true,
            children: [
                {
                    label: 'Link',
                    icon: 'i-lucide-file-text',
                    description: 'Use NuxtLink with superpowers.',
                    to: '/docs/components/link'
                },
                {
                    label: 'Modal',
                    icon: 'i-lucide-file-text',
                    description: 'Display a modal within your application.',
                    to: '/docs/components/modal'
                },
                {
                    label: 'NavigationMenu',
                    icon: 'i-lucide-file-text',
                    description: 'Display a list of links.',
                    to: '/docs/components/navigation-menu'
                },
                {
                    label: 'Pagination',
                    icon: 'i-lucide-file-text',
                    description: 'Display a list of pages.',
                    to: '/docs/components/pagination'
                },
                {
                    label: 'Popover',
                    icon: 'i-lucide-file-text',
                    description: 'Display a non-modal dialog that floats around a trigger element.',
                    to: '/docs/components/popover'
                },
                {
                    label: 'Progress',
                    icon: 'i-lucide-file-text',
                    description: 'Show a horizontal bar to indicate task progression.',
                    to: '/docs/components/progress'
                }
            ]
        }
    ],
    [
        {
            label: 'GitHub',
            icon: 'i-simple-icons-github',
            badge: '6k',
            to: 'https://github.com/nuxt/ui',
            target: '_blank'
        },
        {
            label: 'Help',
            icon: 'i-lucide-circle-help',
            disabled: true
        }
    ]
])

const route = useRoute()
</script>

<template>
    <main class="h-screen flex overflow-hidden">
        <nav class="h-screen border-r border-gray-200 dark:border-gray-800 transition-[width] duration-300 flex flex-col "
            :class="isCollapsed ? 'w-[70px]' : 'w-64'">

            <div class="p-4 flex justify-center">
                <h1 v-if="!isCollapsed" class="text-xl font-bold">Tiny POS</h1>
            </div>

            <div class="flex-1 overflow-y-auto overflow-x-hidden">
                <UNavigationMenu orientation="vertical" :collapsed="isCollapsed" :items="items" class="px-2 " />
            </div>
        </nav>

        <section class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <header
                class="py-4 sticky top-0  bg-white shadow-md dark:bg-gray-800 flex justify-between items-center px-3 border-b border-gray-200 dark:border-gray-800">
                <div class=" flex items-center gap-3">
                    <UButton class="w-fit "
                        :icon="isCollapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'" color="primary"
                        variant="ghost" @click="isCollapsed = !isCollapsed" />
                    <span>{{ route.path }}</span>
                </div>

                <div class="flex gap-3 items-center">
                    <UiThemeSwitcher />
                    <UiLangSwitcher />
                </div>
            </header>

            <main class="h-[calc(100vh-65px)]  p-6">
                <slot />
            </main>
        </section>
    </main>
</template>