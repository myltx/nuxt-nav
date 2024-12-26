import { serverSupabaseClient } from '#supabase/server'
import { generateRequestErrorData, generateRequestSuccessData } from '~/server/utils'

export default defineEventHandler(async (event) => {
  // 解析请求体，获取 userId
  const body = await readBody(event)
  const { userId } = body

  try {
    // 初始化 Supabase 客户端
    const client = await serverSupabaseClient(event)
    // 使用 Supabase 查询数据库
    const { data, error } = await client
      .from('categories') // 替换为你的表名
      .select('*') // 选择所有字段，或者根据需要选择特定字段
      // .eq('user_id', userId) // 'user_id' 是你查询的字段名

    if (error) {
      // return generateRequestErrorData(500, 'Supabase query failed')
      throw createError({
        statusCode: 500,
        statusMessage: `Supabase query failed: ${error.message}`,
      })
    }

    // 如果查询到的 data 是数组且有数据，取第一个元素
    if (data && data.length > 0) {
      return generateRequestSuccessData(data) // 直接返回第一个用户对象
    }

    // 如果没有找到数据，返回一个空对象或适当的错误信息
    return generateRequestSuccessData([]) // 或者抛出 404 错误
  }
  catch (err) {
    // 捕获错误并返回适当的错误消息
    return generateRequestErrorData(401, 'Invalid or expired token')
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    })
  }
})
