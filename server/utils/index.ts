import dayjs from 'dayjs'

export function generateRequestSuccessData(data: any) {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        formatTime(item)
      })
    }
    else {
      formatTime(data)
    }
  }
  return {
    code: 200,
    message: 'success',
    data,
  }
}
export function generateRequestErrorData(code: number, message: string) {
  return {
    code,
    message,
  }
}
/**
 *
 * @param str 字符串
 * @returns
 */
export function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, match => '_' + match.toLowerCase())
}
export function snakeToCamel(str: string) {
  return str.replace(/(_\w)/g, match => match[1].toUpperCase())
}
function formatTime(data: any) {
  const keys = ['created_at', 'updated_at']
  for (const key in data) {
    if (keys.includes(key)) {
      data[key] = dayjs(data[key]).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
