<script setup lang="ts">
import { useStoreProducts } from '~/composables/store/useStoreProducts';

const {  categories, fetchCategories } = useStoreProducts()
watch(
  () => categories.value,
  (newVal) => {
    if (newVal.length === 0) {
      fetchCategories()
    }
  },
  { immediate: true },
)
const emit = defineEmits<{ 'category-selected': [uuid: string] }>()
const selectedUuid = ref('')

function select(uuid: string) {
  selectedUuid.value = uuid
  emit('category-selected', uuid)
}
</script>

<template>
  <div class="flex gap-2 overflow-x-auto">
    <UButton
      variant="ghost"
      size="md"
      class="cursor-pointer text-nowrap"
      :class="{ 'bg-primary text-white': selectedUuid === '' }"
      @click="select('')"
    >
      {{ $i18n.locale === 'en' ? 'All' : 'ទាំងអស់' }}
    </UButton>
    <UButton
      v-for="cat in categories"
      :key="cat.uuid"
      variant="ghost"
      size="md"
      class="cursor-pointer text-nowrap"
      :class="{ 'bg-primary  text-white': cat.uuid === selectedUuid }"
      @click="select(cat.uuid)"
    >
      {{ (cat.name as any)[$i18n.locale === 'kh' ? 'km' : 'en'] ?? (cat.name as any).en }}
    </UButton>
  </div>
</template>
