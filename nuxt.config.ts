// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  components: {
    dirs: [
      'components/layouts/',
      'components/features/',
      'components/',
    ],
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxtjs/i18n", "@pinia/nuxt"],
  i18n: {
    defaultLocale: "kh",
    locales: [
      { code: "en", name: "English", files: ['en/label.json'] },
      { code: "kh", name: "Khmer", files: ['kh/label.json'] },
    ],
    strategy: "no_prefix",
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
  },
   
});