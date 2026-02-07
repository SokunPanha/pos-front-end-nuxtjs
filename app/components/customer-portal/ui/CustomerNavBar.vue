<template>
    <header
    class="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center"
  >
    <div class="flex items-center gap-2">
        <UAvatar size="xl" src="https://api.dicebear.com/7.x/initials/svg?seed=John" class="w-12 h-12"/>
       <div class="flex flex-col ">
         <h1 class="text-xl m-0! p-0! font-bold">Song</h1>
         <span class="text-sm text-gray-500 dark:text-gray-400">food & coffee</span>
       </div>
    </div>

    <div class="flex gap-3">
      <UColorModeButton />
      <UiLangSwitcher />
    </div>
  </header>
</template>