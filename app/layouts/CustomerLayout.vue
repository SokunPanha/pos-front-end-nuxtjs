<script setup lang="ts">
</script>

<template>
  <main class="max-w-2xl mx-auto">
    <UiCustomerNavBar />
    <main class="p-2 h-[calc(100vh-68px)] overflow-y-hidden ">
      <slot></slot>
    </main>
  </main>
</template>
