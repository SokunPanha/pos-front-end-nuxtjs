<template>
    <main class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] h-full gap-4">
        <!-- Products Section -->
        <div class="overflow-y-auto overflow-x-hidden p-3">
            <h1 class="text-2xl font-bold">Products</h1>
            <ProductGrid />
        </div>

        <!-- Cart Section -->
        <div class="overflow-hidden xl:shadow-lg xl:p-3 h-full rounded-lg">
            <div class="hidden h-full xl:block">
                <OrderCartPanel />
            </div>
            <div class="xl:hidden">
                <OrderCartDrawer />
            </div>
        </div>
    </main>
</template>