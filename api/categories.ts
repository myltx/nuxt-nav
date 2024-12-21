import { getHttp } from './http'

export function getCategories(data: any) {
  const http = getHttp()
  return http('/api/categories', {
    method: 'POST',
    body: data,
  })
}

export function addCategories(data: any) {
  const http = getHttp()
  return http('/api/categories/add', {
    method: 'POST',
    body: data,
  })
}
