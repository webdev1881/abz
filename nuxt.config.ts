// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/scss/main.scss', '~/assets/scss/media.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;'
        }
      }
    }
  },

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/toast.ts',
  ],

})