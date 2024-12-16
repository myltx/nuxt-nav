export const customFetch = (url: string, options: any) => {
  const user = {}
  if (typeof url !== 'string') {
    return
  }
  const { $config } = useNuxtApp()
  console.log($config, '$config')
  if (!options.headers) {
    options.headers = {
      authorization: user.id,
    }
  }
  return new Promise((resolve, reject) => {
    useFetch(url, { ...options }).then((res) => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}
