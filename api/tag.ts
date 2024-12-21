import { getHttp } from './http'

export function getTags(data: any) {
  const http = getHttp()
  return http('/api/tag', {
    method: 'POST',
    body: data,
  })
}

export function addTag(data: any) {
  const http = getHttp()
  return http('/api/tag/add', {
    method: 'POST',
    body: data,
  })
}
