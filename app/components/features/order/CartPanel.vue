<template>
   <main class="flex flex-col justify-between h-full">
      <h1 class="text-2xl overflow-hidden font-bold py-3">Order Details</h1>
      <OrderOptions />
      <div class="overflow-y-auto flex-1 py-4">
        <OrderCartItemList />
      </div>
      <OrderCartSummary />
   </main>
</template>