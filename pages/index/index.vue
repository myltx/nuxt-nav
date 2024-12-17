<script setup lang="ts">
import { useLogto, type IdTokenClaims } from '@logto/vue'

const { isAuthenticated, getIdTokenClaims } = useLogto()
const user = ref<IdTokenClaims>()
if (isAuthenticated.value) {
  (async () => {
    const claims = await getIdTokenClaims()
    user.value = claims
    const { data } = await useFetch('/api/user/getUserInfo', {
      method: 'POST',
      body: {
        userId: claims?.sub,
      },
    })
    console.log(data.value, 'ddd')

    if (data.value && Object.keys(data.value).length) {
      console.log('登录成功')
    }
    else {
      useFetch('/api/user/addUser', {
        method: 'POST',
        body: {
          user: claims,
        },
      })
    }
  })()
}

onMounted(async () => {

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
    <UButton>你看</UButton>
  </div>
</template>
