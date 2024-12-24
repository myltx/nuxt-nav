import { getHttp } from './http'

export function getCategories(data: any) {
  const http = getHttp()
  return http('/api/categories', {
    method: 'POST',
    body: data,
  })
}

export function getNoTokenCategories(data: any) {
  const http = getHttp()
  return http('/api/categories/categoriesList', {
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
