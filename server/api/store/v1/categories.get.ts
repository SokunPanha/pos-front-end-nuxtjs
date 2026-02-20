export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const res: any = await $fetch(`${config.storeApiBaseUrl}/store/v1/categories`)

  return res.data
})
