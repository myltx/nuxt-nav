<template>
  <div class="p-2">
    <HeaderAdmin />
    <div class="flex justify-between items-start">
      <UVerticalNavigation
        :links="links"
        class="w-1/5 shadow min-h-215 overflow-y-auto"
        :class="$colorMode.value === 'dark' ? 'shadow-gray' : 'shadow'"
      />
      <div
        class="w-full p-2 h-215 overflow-y-auto"
        :class="$colorMode.value === 'dark' ? 'bg-gray-800 shadow-gray' : 'bg-gray-50 shadow'"
      >
        <slot />
      </div>
    </div>
    <FooterAdmin />
  </div>
</template>

<script setup lang="ts">
const links = [
//   {
//     label: 'Profile',
//     avatar: {
//       src: 'https://avatars.githubusercontent.com/u/739984?v=4',
//     },
//     badge: 100,
//   },
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/admin/home',
  },
  {
    label: '分类管理',
    icon: 'i-heroicons-chart-bar',
    to: '/admin/categories',
  },
]
</script>

<style scoped>

</style>
