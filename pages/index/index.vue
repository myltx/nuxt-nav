<script setup lang="ts">
import { useLogto, type IdTokenClaims } from '@logto/vue'
import getUserInfo from '~/api/user'
import { useUserStore } from '~/store/user'

const { isAuthenticated, getIdTokenClaims } = useLogto()
const user = ref<IdTokenClaims>()

const userStore = useUserStore()
console.log(userStore, 'userStore')
if (isAuthenticated.value) {
  (async () => {
    const claims = await getIdTokenClaims()
    user.value = claims
    const { data } = await getUserInfo({
      userId: claims?.sub,
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
    <ul v-if="isAuthenticated">
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

<style scoped>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
