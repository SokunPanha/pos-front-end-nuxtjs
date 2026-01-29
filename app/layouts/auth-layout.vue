<template>
    <main class="h-screen overflow-hidden">
       <div class="p-2 flex  justify-end gap-5 items-center">
        <UiThemeSwitcher/>
         <UiLangSwitcher/>
       </div>
        <div>
        <slot></slot>
        </div>
    </main>
</template>