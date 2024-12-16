<script setup lang="ts">
import { useLogto, type IdTokenClaims } from '@logto/vue'

const supabase = useSupabaseClient()
const { isAuthenticated, getIdTokenClaims } = useLogto()
const user = ref<IdTokenClaims>()
if (isAuthenticated.value) {
  (async () => {
    const claims = await getIdTokenClaims()
    user.value = claims
    const { data, error } = await supabase
      .from('user')
      .insert([
        { user_id: claims.sub, email: claims.email },
      ])
      .select()
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
