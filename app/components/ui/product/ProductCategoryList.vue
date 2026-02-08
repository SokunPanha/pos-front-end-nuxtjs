<script setup lang="ts">


const categories = [
  { id: 1, name: {
    en: "All",
    kh: "ទាំងអស់"
  }, value: "" },
  { id: 2, name: {
    en: "Food",
    kh: "ម្ហូប"
  }, value: "Food" },
  { id: 3, name: {
    en: "Beverage",
    kh: "ភេសជ្ជៈ"
  }, value: "Beverage" },
  { id: 4, name: {
    en: "Snack",
    kh: "អាហារសម្រន់"
  }, value: "Snack" },
  { id: 5, name: {
    en: "Dessert",
    kh: "បង្អែម"
  }, value: "Dessert" },
];

const emit = defineEmits(['category-selected']);
const selectedCategory = ref("");

function handleCategorySelected(category:   string) {
  emit('category-selected', category);
  selectedCategory.value = category; 
}
</script>
<template>

    <div class="flex gap-2 overflow-x-auto">
       <UButton
         v-for="category in categories"
         :key="category.id"
         variant="ghost"
         size="md"
         :label="category.name[$i18n.locale]"
         class="cursor-pointer"
         :class="{ 'bg-primary text-white': category.value === selectedCategory }"
         @click="handleCategorySelected(category.value)"
       />
     </div>
</template>