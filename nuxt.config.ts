export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/scss/main.scss', '~/assets/scss/media.scss',],

  runtimeConfig: {
    public: {
      apiUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1'
    }
  },

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

  modules: ["@nuxt/image", '@nuxtjs/google-fonts'],
  image: {
    dir: 'assets/img',
    domains: ['ttps://abz.agency']
  },
  googleFonts: {
    families: {
      Nunito: [400]
    }
  }

})
// npx nuxthub deploy