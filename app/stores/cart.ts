import type { CartItem } from '~~/shared/types/cart'
import { defineStore } from 'pinia'

export type Product = {
  id: number
  name: string
  originalPrice: number
  promoPrice?: number | null
  image: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const getItemById = (id: number) => items.value.find(i => i.productId === id)?.quantity || 0

  // Getters
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subTotal = computed(() =>
    items.value.reduce((sum, item) => sum + (item.originalPrice ?? item.price) * item.quantity, 0)
  )

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discount = computed(() => subTotal.value - total.value)

  // Actions
  function addToCart(product: Product, quantity = 1) {
    const existing = items.value.find(i => i.productId === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: `c${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.promoPrice ?? product.originalPrice,
        originalPrice: product.originalPrice,
        quantity,
        image: product.image
      })
    }
  }

  function increase(id: number) {
    const item = items.value.find(i => i.productId === id)
    if (item) item.quantity++
  }

  function decrease(id: number) {
    const item = items.value.find(i => i.productId === id)
    if (item && item.quantity > 1) item.quantity--
  }

  function remove(id: number) {
    const index = items.value.findIndex(i => i.productId === id)
    if (index !== -1) items.value.splice(index, 1)
  }

  function clear(){
    items.value = []
  }
   
  


  return {
    items,
    totalItems,
    subTotal,
    total,
    discount,
    addToCart,
    increase,
    decrease,
    remove,
    clear,
    getItemById
  }
})
