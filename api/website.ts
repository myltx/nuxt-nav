import { getHttp } from './http'

export function getWebsites(data: any) {
  const http = getHttp()
  return http('/api/website', {
    method: 'POST',
    body: data,
  })
}

export function getNoTokenWebsites(data: any) {
  const http = getHttp()
  return http('/api/website/websiteList', {
    method: 'POST',
    body: data,
  })
}

export function addWebsite(data: any) {
  const http = getHttp()
  return http('/api/website/add', {
    method: 'POST',
    body: data,
  })
}
