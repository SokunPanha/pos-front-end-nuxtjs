<template>
  <UCard>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span>Items</span>
        <span>{{ totalItems }}</span>
      </div>

      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>${{ subTotal.toFixed(2) }}</span>
      </div>

      <div v-if="discount > 0" class="flex justify-between text-green-600">
        <span>Discount</span>
        <span>- ${{ discount.toFixed(2) }}</span>
      </div>


      <div class="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <template #footer>
      <UButton block size="lg" color="primary">Place Order</UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const cartItems = [
  { id: 'c1', name: 'Beef Lok Lak', price: 5.5, originalPrice: 6.5, quantity: 1 },
  { id: 'c2', name: 'Chicken Amok', price: 4.2, originalPrice: 5.0, quantity: 2 },
  { id: 'c3', name: 'Seafood Fried Rice', price: 3.9, originalPrice: 4.5, quantity: 1 },
  { id: 'c4', name: 'Spring Rolls', price: 1.5, originalPrice: 2.0, quantity: 3 },
  { id: 'c5', name: 'Iced Milk Coffee', price: 1.2, originalPrice: 1.5, quantity: 2 }
]

const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)
const subTotal = cartItems.reduce((sum, i) => sum + (i.originalPrice ?? i.price) * i.quantity, 0)
const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
const discount = subTotal - total
</script>
