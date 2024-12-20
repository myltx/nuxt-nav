import jwt from 'jsonwebtoken'

export default eventHandler(async (event) => {
  // 解析请求体，获取 userId
  const body = await readBody(event)
  const { userId } = body
  const runtimeConfig = useRuntimeConfig()
  if (userId) {
    const jwtPayload = {
      userId,
    }
    // 生成 token
    const token = jwt.sign(jwtPayload, runtimeConfig.public.supabaseJwtSecret)
    return {
      code: 200,
      success: true,
      data: {
        token,
      },
    }
  }
})
