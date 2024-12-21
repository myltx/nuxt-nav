import jwt from 'jsonwebtoken'
import { createError } from 'h3'

// 解码和验证 JWT Token
export const verifyJwtToken = (token: string) => {
  const runtimeConfig = useRuntimeConfig()

  try {
    // 解码 JWT Token
    const decoded: any = jwt.verify(token, runtimeConfig.public.supabaseJwtSecret)

    // 验证 customKey 是否符合要求
    if (decoded.jti !== runtimeConfig.public.jti) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: customKey is not valid' })
    }

    return decoded // 返回解码后的 JWT 内容
  }
  catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }
}
