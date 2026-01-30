<script setup lang="ts">
import type { CartItem } from '~~/shared/types/cart';

const props = defineProps<{
    item: CartItem
}>()

const emit = defineEmits([
    'increase',
    'decrease',
    'remove'
])
</script>

<template>
    <div class="flex flex-row justify-between  bg-gray-50 dark:bg-gray-800 p-3 rounded-sm gap-3 items-center">
        <div class="flex flex-row gap-3 items-center">
            <!-- Image -->
            <NuxtImg :src="item.image" class="h-16 w-16 rounded object-cover" />

            <!-- Info -->
            <div class="flex-1">
                <p class="font-medium">
                    {{ item.name }}
                </p>

                <div class="text-sm text-gray-500">
                    ${{ item.price.toFixed(2) }}
                </div>
            </div>
        </div>

        <div class="flex gap-2 items-center"><!-- Quantity -->
            <div class="flex items-center gap-2">
                <UButton size="xs" icon="i-heroicons-minus" @click="emit('decrease', item.productId)" />

                <span class="w-5 text-center">
                    {{ item.quantity }}
                </span>

                <UButton size="xs" icon="i-heroicons-plus" @click="emit('increase', item.productId)" />
            </div>

            <!-- Remove -->
            <UButton color="error" variant="ghost" icon="i-heroicons-trash" @click="emit('remove', item.productId)" />
        </div>
    </div>
</template>
