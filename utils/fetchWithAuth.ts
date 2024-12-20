import { useFetch } from '#app'
import { useUserStore } from '~/store/user'

// 封装的带有 Authorization 头部的请求方法
export const useFetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // 从 localStorage 或 Cookie 中获取 JWT token
  const { user } = useUserStore()
  if (!user?.token) {
    throw new Error('No token found')
  }

  // 为请求头添加 Authorization 字段
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${user?.token}`,
  }

  // 发起请求
  const response = await useFetch(url, {
    ...options,
    headers,
  })

  return response
}
