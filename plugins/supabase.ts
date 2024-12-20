import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  // 使用 Nuxt 的 runtimeConfig 获取 Supabase 配置信息
  const supabase = createClient(
    runtimeConfig.public.supabaseUrl,
    runtimeConfig.public.supabaseKey,
    {
      global: {
        headers: {
          Authorization: 'Bearer ' + runtimeConfig.public.supabaseKey,
        },
      },
    },
  )

  // 将 Supabase 客户端注入到整个应用中
  nuxtApp.provide('$supabase', supabase)
})
