<script setup lang="ts">
import type { CartItem } from '~~/shared/types/cart';

const cartItems: CartItem[] = [
  
  {
    id: 'c7',
    productId: 10,
    name: 'Mango Sticky Rice',
    price: 3.0,
    originalPrice: 3.0,
    quantity: 1,
    image: "https://tse4.mm.bing.net/th/id/OIP.3zZOs9efoD6_K0G_nA0-AAHaE7?w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 'c8',
    productId: 1,
    name: 'Beef Lok Lak',
    price: 5.5,
    originalPrice: 6.5,
    quantity: 1,
    image: "https://bing.com/th?id=OSK.98e8136fedc49e98cfd159e9e0e8a574",
    note: 'Less pepper'
  },
  {
    id: 'c9',
    productId: 2,
    name: 'Chicken Amok',
    price: 4.2,
    originalPrice: 5.0,
    quantity: 2,
    image: "https://bing.com/th?id=OSK.1966086f8b5a3f3946727105ffac9184",
  },
  {
    id: 'c10',
    productId: 3,
    name: 'Seafood Fried Rice',
    price: 3.9,
    originalPrice: 4.5,
    quantity: 1,
    image: "https://tse2.mm.bing.net/th/id/OIP.VG1QorWh4g9iSsMVCKFVuQHaG0?rs=1&pid=ImgDetMain&o=7&rm=3",
    note: 'No chili'
  },
  {
    id: 'c11',
    productId: 6,
    name: 'Spring Rolls',
    price: 1.5,
    originalPrice: 2.0,
    quantity: 3,
    image: "https://bing.com/th?id=OSK.a8e12dd5d2ca9d1f5324721083c7beec",
  },
  {
    id: 'c12',
    productId: 8,
    name: 'Iced Milk Coffee',
    price: 1.2,
    originalPrice: 1.5,
    quantity: 2,
    image: "https://tse2.mm.bing.net/th/id/OIP.VG1QorWh4g9iSsMVCKFVuQHaG0?rs=1&pid=ImgDetMain&o=7&rm=3",
    note: 'Less sugar'
  },
  {
    id: 'c13',
    productId: 9,
    name: 'Fresh Coconut Juice',
    price: 2.0,
    originalPrice: 2.0,
    quantity: 1,
    image: "https://tse2.mm.bing.net/th/id/OIP.VG1QorWh4g9iSsMVCKFVuQHaG0?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 'c14',
    productId: 10,
    name: 'Mango Sticky Rice',
    price: 3.0,
    originalPrice: 3.0,
    quantity: 1,
    image: "https://www.cooking-therapy.com/wp-content/uploads/2020/05/Vietnamese-Shaking-Beef-11-scaled.jpg",
  }
]

</script>
<template>
    <div class="space-y-3 overflow-y-auto h-full">
        <OrderCartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
        />
    </div>
</template>