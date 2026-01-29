// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "kh",
    locales: [
      { code: "en", name: "English", files: ['en/label.json'] },
      { code: "kh", name: "Khmer", files: ['kh/label.json'] },
    ],
    strategy: "no_prefix",
  },
});