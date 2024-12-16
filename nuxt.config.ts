export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/logto.ts'],
  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/ui',
  ],
  runtimeConfig: {
    logtoAppId: process.env.NUXT_LOGTO_APP_ID,
    logtoEndpoint: process.env.NUXT_LOGTO_ENDPOINT,
    // 公开变量（客户端也可用）
    public: {
      logtoAppId: process.env.NUXT_LOGTO_APP_ID,
      logtoEndpoint: process.env.NUXT_LOGTO_ENDPOINT,
      backendEndpoint: true,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  unocss: {
    nuxtLayers: true,
  },

  supabase: {
    redirect: false,
  },
})
