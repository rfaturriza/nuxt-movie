// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  css: ["./assets/css/tailwind.css"],
  runtimeConfig: {
    public: {
      MOVIE_API_URL: process.env.MOVIE_API_URL,
      TMDB_TOKEN: process.env.TMDB_TOKEN,
      BASE_IMAGE_URL: process.env.BASE_IMAGE_URL,
    },
  },
});
