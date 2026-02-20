import { defineStore } from 'pinia'
import type { StoreProductItemType, StoreVariantItemType } from '~~/shared/types/ApiResponseType'

export type StoreCartItemAttribute = {
  name: { en: string; km: string }
  value: { en: string; km: string }
}

export type StoreCartItem = {
  uuid: string
  variantUuid: string
  name: { en: string; km: string }
  variantName: { en: string; km: string }
  price: number
  originalPrice: number
  quantity: number
  image: string
  note?: string
  attributes?: StoreCartItemAttribute[]
}

export const useStoreCartStore = defineStore('storeCart', () => {
  const items = ref<StoreCartItem[]>([])
  const orderType = ref<'dine-in' | 'take-away'>('dine-in')
  const tableNumber = ref('')
  const orderNote = ref('')

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )
  const subTotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0),
  )
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )
  const discount = computed(() => subTotal.value - total.value)

  const getItemQty = (variantUuid: string) =>
    items.value.find((i) => i.variantUuid === variantUuid)?.quantity ?? 0

  const getProductQty = (productUuid: string) =>
    items.value
      .filter((i) => i.uuid === productUuid)
      .reduce((sum, i) => sum + i.quantity, 0)

  function removeProduct(productUuid: string) {
    items.value = items.value.filter((i) => i.uuid !== productUuid)
  }

  function addToCart(
    product: StoreProductItemType,
    variant?: StoreVariantItemType,
    qty = 1,
    note = '',
    selectedAttrs: Record<string, string> = {},
  ) {
    const v = variant ?? product.variants[0]
    if (!v) return

    // Resolve selected attribute uuids → localized name/value pairs
    const resolvedAttrs: StoreCartItemAttribute[] = []
    for (const attr of product.attributes ?? []) {
      const valueUuid = selectedAttrs[attr.uuid]
      if (valueUuid) {
        const val = attr.values.find((av) => av.uuid === valueUuid)
        if (val) {
          resolvedAttrs.push({
            name: attr.name as { en: string; km: string },
            value: val.value as { en: string; km: string },
          })
        }
      }
    }

    const existing = items.value.find((i) => i.variantUuid === v.uuid)
    if (existing) {
      existing.quantity += qty
      if (note) existing.note = note
      if (resolvedAttrs.length) existing.attributes = resolvedAttrs
    } else {
      items.value.push({
        uuid: product.uuid,
        variantUuid: v.uuid,
        name: product.name as { en: string; km: string },
        variantName: v.name as { en: string; km: string },
        price: v.promotePrice && v.promotePrice > 0 ? v.promotePrice : v.price,
        originalPrice: v.price,
        quantity: qty,
        image: product.images?.[0] ?? v.images?.[0] ?? '',
        note: note || undefined,
        attributes: resolvedAttrs.length ? resolvedAttrs : undefined,
      })
    }
  }

  function increase(variantUuid: string) {
    const item = items.value.find((i) => i.variantUuid === variantUuid)
    if (item) item.quantity++
  }

  function decrease(variantUuid: string) {
    const item = items.value.find((i) => i.variantUuid === variantUuid)
    if (item && item.quantity > 1) item.quantity--
  }

  function remove(variantUuid: string) {
    const idx = items.value.findIndex((i) => i.variantUuid === variantUuid)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  function clear() {
    items.value = []
    orderType.value = 'dine-in'
    tableNumber.value = ''
    orderNote.value = ''
  }

  function setOrderType(type: 'dine-in' | 'take-away') {
    orderType.value = type
    if (type === 'take-away') tableNumber.value = ''
  }

  function setTableNumber(val: string) {
    tableNumber.value = val
  }

  function setOrderNote(val: string) {
    orderNote.value = val
  }

  return {
    items,
    orderType,
    tableNumber,
    orderNote,
    totalItems,
    subTotal,
    total,
    discount,
    getItemQty,
    getProductQty,
    addToCart,
    increase,
    decrease,
    remove,
    removeProduct,
    clear,
    setOrderType,
    setTableNumber,
    setOrderNote,
  }
})
