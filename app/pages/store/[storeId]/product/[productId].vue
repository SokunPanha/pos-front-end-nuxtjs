<script setup lang="ts">
import { useProductDetail } from '~/composables/store/useProductDetail'

definePageMeta({ layout: 'store-layout' })

const route = useRoute()

const {
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
} = useProductDetail(route.params.productId as string)
</script>

<template>
  <div class="p-4 space-y-5 overflow-y-auto h-full pb-8">
    <!-- Back -->
    <UButton
      variant="ghost"
      icon="i-heroicons-arrow-left"
      class="cursor-pointer -ml-2"
      @click="$router.back()"
    >
      {{ $t('label.back') }}
    </UButton>

    <!-- Skeleton -->
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-64 w-full rounded-xl" />
      <USkeleton class="h-6 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-full" />
    </div>

    <template v-else-if="product">
      <!-- Image Gallery -->
      <div class="space-y-2">
        <div class="rounded-xl overflow-hidden  bg-gray-100/50 dark:bg-black/50 backdrop-blur-2xl flex items-center justify-center h-64">
          <NuxtImg
            v-if="selectedImage"
            :src="selectedImage"
            :alt="displayName"
            class="w-full h-64 object-contain"
            format="webp"
          />
          <UIcon v-else name="i-heroicons-photo" class="text-gray-300 text-6xl" />
        </div>
        <div v-if="allImages.length > 1" class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="(img, i) in allImages"
            :key="i"
            class="flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors"
            :class="selectedImage === img ? 'border-primary' : 'border-transparent'"
            @click="selectedImage = img"
          >
            <NuxtImg :src="img" class="h-16 w-16 object-cover" format="webp" />
          </button>
        </div>
      </div>

      <!-- Name & Price -->
      <div>
        <div class="flex items-start justify-between gap-2">
          <h1 class="text-xl font-bold leading-tight">{{ displayName }}</h1>
          <UBadge v-if="hasDiscount" color="error" size="lg">-{{ discountPercent }}%</UBadge>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <span class="text-2xl font-bold text-primary">${{ finalPrice.toFixed(2) }}</span>
          <span v-if="hasDiscount" class="line-through text-base text-gray-400">
            ${{ originalPrice.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div v-if="displayDescription" class="space-y-1">
        <h3 class="font-semibold text-sm">{{ $t('label.description') }}</h3>
        <p class="text-sm text-gray-600 leading-relaxed">{{ displayDescription }}</p>
      </div>

      <!-- Variant Selector -->
      <div v-if="product.variants?.length > 1" class="space-y-2">
        <h3 class="font-semibold text-sm">{{ $t('label.selectVariant') }}</h3>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="variant in product.variants"
            :key="variant.uuid"
            size="sm"
            :color="selectedVariant?.uuid === variant.uuid ? 'primary' : 'neutral'"
            :variant="selectedVariant?.uuid === variant.uuid ? 'solid' : 'outline'"
            class="cursor-pointer"
            @click="selectedVariant = variant"
          >
            {{ getLocalized(variant.name as any) || variant.sku }}
          </UButton>
        </div>
      </div>

      <!-- Attributes (selectable) -->
      <div v-if="product.attributes?.length" class="space-y-3">
        <h3 class="font-semibold text-sm">{{ $t('label.attributes') }}</h3>
        <div v-for="attr in product.attributes" :key="attr.uuid" class="space-y-1">
          <span class="text-sm font-medium text-gray-600">{{ getLocalized(attr.name as any) }}</span>
          <div class="flex flex-wrap gap-2 mt-1">
            <UButton
              v-for="val in attr.values"
              :key="val.uuid"
              size="xs"
              :color="selectedAttrs[attr.uuid] === val.uuid ? 'primary' : 'neutral'"
              :variant="selectedAttrs[attr.uuid] === val.uuid ? 'solid' : 'outline'"
              class="cursor-pointer"
              @click="toggleAttr(attr.uuid, val.uuid)"
            >
              {{ getLocalized(val.value as any) }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- Note -->
      <div class="space-y-1">
        <h3 class="font-semibold text-sm">{{ $t('label.addNote') }}</h3>
        <UTextarea
          v-model="itemNote"
          :placeholder="$t('placeholder.orderNotes')"
          :rows="2"
          autoresize
        />
      </div>

      <!-- Add to Cart -->
      <div class="pt-2">
        <UButton
          v-if="qty === 0"
          block
          size="lg"
          color="primary"
          class="cursor-pointer text-white"
          icon="i-heroicons-shopping-cart"
          @click="addToCart"
        >
          {{ $t('label.addToCart') }}
        </UButton>
        <div v-else class="flex items-center justify-center gap-3">
          <div class="flex items-center gap-4">
            <UButton
              size="sm"
              class="cursor-pointer text-white"
              icon="i-heroicons-minus"
              @click="cartStore.decrease(selectedVariant!.uuid)"
            />
            <span class="text-2xl font-bold w-10 text-center">{{ qty }}</span>
            <UButton
              size="sm"
              class="cursor-pointer text-white"
              icon="i-heroicons-plus"
              @click="cartStore.increase(selectedVariant!.uuid)"
            />
          </div>
          <UButton
            color="error"
            variant="outline"
            size="sm"
            icon="i-heroicons-trash"
            class="cursor-pointer"
            @click="cartStore.remove(selectedVariant!.uuid)"
          />
        </div>
      </div>
    </template>

    <!-- Not found -->
    <div v-else class="text-center text-gray-500 py-16">
      <UIcon name="i-heroicons-exclamation-circle" class="text-4xl mb-2" />
      <p>Product not found.</p>
    </div>
  </div>
</template>
