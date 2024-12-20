export interface User {
  id: number
  name: string
  sub: string
  username: string
  email: string
  avatar: string
  token: string
}
export const useUserStore = defineStore('user', () => {
  const user = ref<User>()

  function setupNewUser(info: { uesrName: string, avatar: string }) {
    if (!user.value) return
    //     TODO: 缺少更新用户信息的接口

    //     const res = await fetchSetupNewUser({
    //       username: info.username,
    //       avatar: info.avatar,
    //     })

    //     user.value.username = res.username
    //     user.value.avatar = res.avatar
  }

  function initUser(val: User) {
    console.log(val, 'vvv')
    user.value = val
  }
  return {
    user,
    setupNewUser,
    initUser,
  }
})
