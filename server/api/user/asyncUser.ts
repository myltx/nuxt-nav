import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  // 解析请求体，获取 userId
  const body = await readBody(event)
  console.log(event, 'body')

  // 初始化 Supabase 客户端
  const client = await serverSupabaseClient(event)

  let userInfo

  // 使用 Supabase 查询数据库
  const { data: users, error } = await client.from('user').select('*').eq('id', '')

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Supabase query failed: ${error.message}`,
    })
  }

  // 返回用户信息和数据库查询结果
  return {
    userInfo,
    users,
  }
})