<script setup lang="ts">
import type { StoreProductItemType } from '~~/shared/types/ApiResponseType'

const props = defineProps<{
  product: StoreProductItemType
}>()

const route = useRoute()
const { locale } = useI18n()

const firstVariant = computed(() => props.product.variants[0])
const finalPrice = computed(() => {
  const v = firstVariant.value
  return v?.promotePrice && v.promotePrice > 0 ? v.promotePrice : v?.price ?? 0
})
const originalPrice = computed(() => firstVariant.value?.price ?? 0)
const hasDiscount = computed(() => {
  const v = firstVariant.value
  return v ? v.promotePrice > 0 && v.promotePrice < v.price : false
})
const discountPercent = computed(() => {
  if (!hasDiscount.value || !firstVariant.value) return 0
  return Math.round((1 - firstVariant.value.promotePrice / firstVariant.value.price) * 100)
})
const image = computed(
  () => props.product.images?.[0] ?? firstVariant.value?.images?.[0] ?? '',
)
const displayName = computed(() => {
  const name = props.product.name as any
  return name[locale.value === 'kh' ? 'km' : 'en'] ?? name.en ?? ''
})

const detailPath = computed(
  () => `/store/${route.params.storeId}/product/${props.product.uuid}`,
)
</script>

<template>
  <NuxtLink :to="detailPath" class="block">
    <UCard class="hover:shadow-md cursor-pointer" :ui="{ body: 'p-0 sm:p-0' }">
      <div class="flex gap-3 p-3">
        <!-- Image -->
        <div class="relative shrink-0">
          <NuxtImg
            format="webp"
            :src="image"
            :alt="displayName"
            class="h-24 w-24 object-cover rounded-lg"
          />
          <UBadge v-if="hasDiscount" color="error" size="xs" class="absolute top-1 left-1">
            -{{ discountPercent }}%
          </UBadge>
        </div>

        <!-- Content -->
        <div class="flex flex-col justify-between flex-1 py-1 min-w-0">
          <h3 class="font-semibold text-sm line-clamp-2 leading-snug">
            {{ displayName }}
          </h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="font-bold text-base text-primary">
              ${{ finalPrice.toFixed(2) }}
            </span>
            <span
              v-if="hasDiscount"
              class="line-through text-xs text-gray-400"
            >
              ${{ originalPrice.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Arrow -->
        <div class="flex items-center shrink-0 text-gray-400">
          <UIcon name="i-heroicons-chevron-right" class="text-lg" />
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>
