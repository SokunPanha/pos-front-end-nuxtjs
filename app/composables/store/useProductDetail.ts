import { useStoreProducts } from '~/composables/store/useStoreProducts'
import type { StoreProductItemType, StoreVariantItemType } from '~~/shared/types/ApiResponseType'

export function useProductDetail(productUuid: string) {
  const { locale } = useI18n()
  const cartStore = useStoreCartStore()
  const { fetchProduct } = useStoreProducts()

  const product = ref<StoreProductItemType | null>(null)
  const loading = ref(true)
  const selectedVariant = ref<StoreVariantItemType | null>(null)
  const selectedImage = ref('')
  const selectedAttrs = ref<Record<string, string>>({})
  const itemNote = ref('')

  watch( ()=> productUuid ,async () => {
    product.value = await fetchProduct(productUuid)
    if (product.value) {
      selectedVariant.value = product.value.variants?.[0] ?? null
      selectedImage.value = allImages.value[0] ?? ''
    }
    loading.value = false
  }, { immediate: true })

  const localeKey = computed(() => (locale.value === 'kh' ? 'km' : 'en'))

  function getLocalized(obj: Record<string, unknown> | undefined | null): string {
    if (!obj) return ''
    return ((obj[localeKey.value] ?? obj.en ?? '') as string)
  }

  const allImages = computed(() => {
    const imgs: string[] = []
    if (product.value?.images?.length) imgs.push(...product.value.images)
    if (selectedVariant.value?.images?.length) imgs.push(...selectedVariant.value.images)
    return imgs
  })

  watch(selectedVariant, (v) => {
    if (v?.images?.length) selectedImage.value = v.images[0] ?? ''
    else if (product.value?.images?.length) selectedImage.value = product.value.images[0] ?? ''
  })

  const displayName = computed(() => getLocalized(product.value?.name as any))
  const displayDescription = computed(() => getLocalized(product.value?.description as any))

  const finalPrice = computed(() => {
    const v = selectedVariant.value
    return v?.promotePrice && v.promotePrice > 0 ? v.promotePrice : v?.price ?? 0
  })
  const originalPrice = computed(() => selectedVariant.value?.price ?? 0)
  const hasDiscount = computed(() => {
    const v = selectedVariant.value
    return v ? v.promotePrice > 0 && v.promotePrice < v.price : false
  })
  const discountPercent = computed(() => {
    if (!hasDiscount.value || !selectedVariant.value) return 0
    return Math.round((1 - selectedVariant.value.promotePrice / selectedVariant.value.price) * 100)
  })

  const qty = computed(() =>
    selectedVariant.value ? cartStore.getItemQty(selectedVariant.value.uuid) : 0,
  )

  function toggleAttr(attrUuid: string, valueUuid: string) {
    if (selectedAttrs.value[attrUuid] === valueUuid) {
      delete selectedAttrs.value[attrUuid]
    } else {
      selectedAttrs.value[attrUuid] = valueUuid
    }
  }

  function addToCart() {
    if (product.value && selectedVariant.value) {
      cartStore.addToCart(product.value, selectedVariant.value, 1, itemNote.value.trim(), selectedAttrs.value)
    }
  }

  return {
    product,
    loading,
    selectedVariant,
    selectedImage,
    selectedAttrs,
    itemNote,
    allImages,
    displayName,
    displayDescription,
    finalPrice,
    originalPrice,
    hasDiscount,
    discountPercent,
    qty,
    cartStore,
    getLocalized,
    toggleAttr,
    addToCart,
  }
}
