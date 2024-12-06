<script setup lang="ts">
const user = useLogtoUser()
console.log(user, 'user')
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
    >
      跳转到 login1
    </a>
  </div>
</template>
