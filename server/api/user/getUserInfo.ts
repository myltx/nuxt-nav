import { verifyJwtToken } from '../../utils/auth'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // 解析请求体，获取 userId
  const body = await readBody(event)
  const { userId } = body

  // 从请求头中获取 Authorization Token
  const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized: No token provided' })
  }

  // 解码 JWT Token
  // const decoded = verifyJwtToken(token)
  // 初始化 Supabase 客户端
  const client = await serverSupabaseClient(event)
  // 使用 Supabase 查询数据库
  const { data, error } = await client
    .from('users') // 替换为你的表名
    .select('*') // 选择所有字段，或者根据需要选择特定字段
    .eq('user_id', userId) // 'user_id' 是你查询的字段名

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Supabase query failed: ${error.message}`,
    })
  }

  // 如果查询到的 data 是数组且有数据，取第一个元素
  if (data && data.length > 0) {
    return data[0] // 直接返回第一个用户对象
  }

  // 如果没有找到数据，返回一个空对象或适当的错误信息
  return {} // 或者抛出 404 错误
})
