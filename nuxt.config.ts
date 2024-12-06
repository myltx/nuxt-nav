export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'app/',
  modules: [
    '@logto/nuxt',
    '@nuxt/eslint',
    '@unocss/nuxt',
  ],
  runtimeConfig: {
    logto: {
      endpoint: '',
      appId: '',
      appSecret: '',
      cookieEncryptionKey: '',
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
  logto: {
    pathnames: {
      signIn: '/login',
      signOut: '/logout',
      callback: '/auth/callback',
    },
  },
})
