export function generateRequestSuccessData(data: any) {
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
