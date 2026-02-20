// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  routeRules:{
    "/store/**": { isr: 300 },
  },
  components: {
    dirs: [
      // Layouts
      'components/layouts',
      // Shared UI components (with Ui prefix)
      { path: 'components/ui/product', pathPrefix: false },
      { path: 'components/ui/order', pathPrefix: false },
      // Store portal (no prefix)
      { path: 'components/store-portal/navbar', pathPrefix: false },
      { path: 'components/store-portal/cart', pathPrefix: false },
      { path: 'components/store-portal/product', pathPrefix: false },
      // Cashier portal (no prefix)
      { path: 'components/cashier-portal/new-order/order', pathPrefix: false },
      { path: 'components/cashier-portal/new-order/checkout', pathPrefix: false },
      { path: 'components/ui',  prefix: 'Ui' },
    ],
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxtjs/i18n", "@pinia/nuxt"],
  i18n: {
    defaultLocale: "kh",
    locales: [
      { code: "en", name: "English", files: ['en/label.json', 'en/placeholder.json', 'en/message.json'] },
      { code: "kh", name: "Khmer", files: ['kh/label.json', 'kh/placeholder.json', 'kh/message.json'] },
    ],
    strategy: "no_prefix",
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
  },
  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    storeApiBaseUrl: process.env.STORE_API_BASE_URL || 'http://localhost:3003',
    public:{

    }
  },
});