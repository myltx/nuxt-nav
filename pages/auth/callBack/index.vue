<template>
  <div>
    <!-- 当正在处理中 -->
    <p v-if="isLoading">
      正在重定向...
    </p>
  </div>
</template>

<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue'

const { isLoading } = useHandleSignInCallback(() => {
  console.log('回调')
  // 完成后执行某些操作，例如重定向到主页

  navigateTo('/')
  // 假设使用 vue-router
  // const router = createRouter({
  //   routes: [
  //     {
  //       path: '/callback',
  //       name: 'callback',
  //       component: CallbackView,
  //     },
  //   ],
  // })
})
</script>

<style scoped>

</style>
