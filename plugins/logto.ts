import type { LogtoConfig } from '@logto/vue'
import { createLogto, UserScope } from '@logto/vue'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  console.log(runtimeConfig, 'runtimeConfig')
  const config: LogtoConfig = {
    endpoint: runtimeConfig?.public?.logtoEndpoint,
    appId: runtimeConfig?.public?.logtoAppId,
    scopes: [
      UserScope.Email,
      UserScope.Phone,
      UserScope.CustomData,
      UserScope.Identities,
      UserScope.Organizations,
    ],
    //     resources: [runtimeConfig?.public.backendEndpoint],
  }
  console.log(config, 'config')
  nuxtApp.vueApp.use(createLogto, config)
})
