import { verifyJwtToken } from '../../utils/auth'
import { serverSupabaseClient } from '#supabase/server'
import { generateRequestSuccessData, snakeToCamel } from '~/server/utils'

export default defineEventHandler(async (event) => {
  try {
    // const body = await readBody(event)

    // 从请求头中获取 Authorization Token
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: No token provided',
      })
    }

    // 解码 JWT Token
    verifyJwtToken(token)

    // 初始化 Supabase 客户端
    const client = await serverSupabaseClient(event)

    // 查询数据库
    const pageSize = 10 // 每页获取 10 个网站
    const page = 1 // 当前页数，从 1 开始
    const offset = (page - 1) * pageSize // 计算分页的偏移量

    const { data, error } = await client.from('websites').select(`
    *,
    categories!websites_category_id_fkey(name),
    website_tags(
      tag_id,
      tags!website_tags_tag_id_fkey(name)
    )
  `)
      .order('created_at', { ascending: false }) // 按创建时间降序排序
      .range(offset, offset + pageSize - 1)

    if (error) {
      console.error('Error fetching websites with categories and tags:', error)
    }
    else {
      console.log('Websites with categories and tags:', data)
    }

    if (data && data.length > 0) {
      // 数据处理：提取 tags 信息到外层
      // const processedData = data.map((website: any) => {
      //   const tags = website.website_tags?.map((tag: any) => {
      //     return {
      //       id: tag.tag_id,
      //       name: tag.tag?.name,
      //     }
      //   }) || []
      //   return {
      //     ...website,
      //     tags, // 将 tags 名称提取到外层
      //   }
      // })
      const result: any = []
      data.forEach((item: any) => {
        const obj: any = {}
        for (const key in item) {
          const element = item[key]
          obj[snakeToCamel(key)] = element
        }
        result.push(obj)
      })
      return generateRequestSuccessData(result)
    }
    else {
      return generateRequestSuccessData([]) // 返回空数组或适当的错误信息
    }
  }
  catch (err) {
    console.log(err, 'err')
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    })
  }
})
