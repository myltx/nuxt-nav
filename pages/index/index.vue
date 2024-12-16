<script setup lang="ts">
import { customFetch } from '~/api/requires'

const user = {}

// console.log(user, 'user')
// const fetchLibrary = async () => {
//   const { data } = await customFetch('/api/user', {
//     method: 'POST',
//     body: {
//       userId: user?.sub,
//     },
//   })
//   // console.log(data.value, 'uesr111')
// }
// fetchLibrary()

// console.log(first)
const userInfo = ref()

onMounted(async () => {
  // const u = await customFetch('/api/user/asyncUser', {
  //   method: 'POST',
  //   body: {
  //     userId: userInfo.value?.sub,
  //   },
  // })
  // console.log(u, 'uuu')
})
</script>

<template>
  <div>
    <ul v-if="Boolean(user)">
      <li
        v-for="(value, key) in user"
        :key="key"
      >
        <b>{{ key }}:</b> {{ value }}
      </li>
    </ul>

    <a
      v-if="Boolean(user)"
      :href="'/logout'"
      class="mr-20px"
    >
      跳转到 logout
    </a>
    <a
      v-else
      :href="'/login'"
      class="mr-20px"
    > 跳转到 login1 </a>
  </div>
</template>
