<script setup lang="ts">


const categories = [
  { id: 1, name: "All", value: "" },
  { id: 2, name: "Food", value: "Food" },
  { id: 3, name: "Drink", value: "Drink" },
  { id: 4, name: "Snack", value: "Snack" },
  { id: 5, name: "Dessert", value: "Dessert" },
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
         variant="outline"
         :label="category.name"
         class="cursor-pointer"
         :class="{ 'bg-primary text-white': category.value === selectedCategory }"
         @click="handleCategorySelected(category.value)"
       />
     </div>
</template>