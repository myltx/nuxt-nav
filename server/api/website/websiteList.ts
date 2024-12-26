import { serverSupabaseClient } from '#supabase/server'
import { generateRequestSuccessData, snakeToCamel } from '~/server/utils'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { categoryId } = body

    // 初始化 Supabase 客户端
    const client = await serverSupabaseClient(event)
    const newCategoryId = categoryId < 0 ? null : categoryId
    console.log(newCategoryId, 'newCategoryId')
    // 查询数据库
    let query = client.from('websites').select(
      `*,
          categories!websites_category_id_fkey(name),
          website_tags(
            tag_id,
            tags!website_tags_tag_id_fkey(name)
          )
        `,
    )

    if (newCategoryId && newCategoryId > 0) {
      query = query.eq('category_id', newCategoryId)
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    }) // 按创建时间降序排序

    if (error) {
      console.error('Error fetching websites with categories and tags:', error)
    }
    else {
      console.log('Websites with categories and tags:', data)
    }

    if (data && data.length > 0) {
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
