<script setup lang="ts">
import usePlaceOrder from "~/composables/store/usePlaceOrder";
import { orderTypeOptions } from '~~/shared/constants';

const cartStore = useStoreCartStore();
const { onPlaceOrder, isLoading } = usePlaceOrder();
const open = defineModel<boolean>("open", { default: false });

watch(
  () => cartStore.items,
  (newItems) => {
    if (newItems.length === 0) {
      open.value = false;
    }
  },
);
</script>

<template>
  <UDrawer v-model:open="open" class="max-w-2xl flex flex-col flex-nowrap mx-auto">
    <template #header>
      <div class="flex items-center flex-col gap-2">
        <h2 class="text-lg font-medium">{{ $t("label.yourOrder") }}</h2>
        <div class="flex gap-2">
          <UButton
            v-for="option in orderTypeOptions"
            :key="option.value"
            class="cursor-pointer"
            :color="cartStore.orderType === option.value ? 'primary' : 'neutral'"
            :variant="cartStore.orderType === option.value ? 'solid' : 'outline'"
            size="sm"
            @click="cartStore.setOrderType(option.value as 'dine-in' | 'take-away')"
          >
            {{ $t(option.label) }}
          </UButton>
        </div>
      </div>
    </template>

    <template #body>
      <div class="overflow-y-auto flex-1 py-4 max-h-[30vh]">
        <div v-if="cartStore.items.length === 0" class="flex items-center justify-center h-full">
          <span class="text-gray-500">{{ $t("label.emptyCart") }}</span>
        </div>
        <TransitionGroup v-else name="fade" tag="div" class="flex flex-col relative">
          <div
            v-for="item in cartStore.items"
            :key="item.variantUuid"
            class="flex flex-row justify-between w-full p-3 rounded-sm gap-3 items-center"
          >
            <div class="flex flex-row gap-3 items-center">
              <NuxtImg
                :src="item.image"
                class="md:h-16 md:w-16 h-10 w-10 rounded object-cover"
                format="webp"
                quality="80"
              />
              <div class="flex-1 min-w-0">
                <p class="md:text-base text-xs font-medium line-clamp-1">
                  {{ ($i18n.locale === 'kh' ? item.name.km : item.name.en) || item.name.en }}
                </p>
                <!-- Variant name -->
                <p
                  v-if="item.variantName?.en || item.variantName?.km"
                  class="text-xs text-gray-500 line-clamp-1"
                >
                  {{ ($i18n.locale === 'kh' ? item.variantName.km : item.variantName.en) || item.variantName.en }}
                </p>
                <!-- Selected attributes -->
                <div v-if="item.attributes?.length" class="flex flex-wrap gap-1 mt-0.5">
                  <UBadge
                    v-for="(attr, i) in item.attributes"
                    :key="i"
                    variant="soft"
                    color="neutral"
                    size="xs"
                  >
                    {{ ($i18n.locale === 'kh' ? attr.value.km : attr.value.en) || attr.value.en }}
                  </UBadge>
                </div>
                <div class="text-xs md:text-sm text-gray-500 mt-0.5">${{ item.price.toFixed(2) }}</div>
                <p v-if="item.note" class="text-xs text-gray-400 italic line-clamp-1 mt-0.5">{{ item.note }}</p>
              </div>
            </div>

            <div class="flex gap-2 items-center">
              <div class="flex items-center gap-2">
                <UButton
                  class="cursor-pointer text-white"
                  size="xs"
                  icon="i-heroicons-minus"
                  @click="cartStore.decrease(item.variantUuid)"
                />
                <span class="w-5 text-center">{{ item.quantity }}</span>
                <UButton
                  class="cursor-pointer text-white"
                  size="xs"
                  icon="i-heroicons-plus"
                  @click="cartStore.increase(item.variantUuid)"
                />
              </div>
              <UButton
                class="cursor-pointer"
                color="error"
                variant="ghost"
                icon="i-heroicons-trash"
                @click="cartStore.remove(item.variantUuid)"
              />
            </div>
          </div>
        </TransitionGroup>
      </div>
    </template>

    <template #footer>
      <UiOrderSummary
        :total-items="cartStore.totalItems"
        :sub-total="cartStore.subTotal"
        :discount="cartStore.discount"
        :total="cartStore.total"
      />
      <UButton
        block
        size="lg"
        color="primary"
        class="cursor-pointer text-white font-bold"
        @click="onPlaceOrder"
        :loading="isLoading"
      >
        {{ $t("label.placeOrder") }}
      </UButton>
    </template>
  </UDrawer>
</template>
