import { getHttp } from './http'

export default function getUserInfo() {
  const http = getHttp()
  return http('/api/user/getUserInfo', {
    method: 'POST',
  })
}
