<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<template>
    <div class="space-y-3 overflow-y-auto h-full">
        <OrderCartItem
            v-for="item in cartStore.items"
            :key="item.id"
            :item="item"
            @increase="cartStore.increase"
            @decrease="cartStore.decrease"
            @remove="cartStore.remove"
        />
    </div>
</template>
