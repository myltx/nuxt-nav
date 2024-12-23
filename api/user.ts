import { getHttp } from './http'

export default function getUserInfo(data: { userId: string }) {
  const http = getHttp()
  return http('/api/user/getUserInfo', {
    method: 'POST',
    body: data,
  })
}
