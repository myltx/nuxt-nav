export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@logto/nuxt',
    '@nuxt/eslint',
    '@unocss/nuxt',
  ],
  runtimeConfig: {
    logto: {
      endpoint: '<你的-logto-endpoint>',
      appId: '<你的-logto-app-id>',
      appSecret: '<你的-logto-app-secret>',
      cookieEncryptionKey: '<一个随机字符串>',
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
})
