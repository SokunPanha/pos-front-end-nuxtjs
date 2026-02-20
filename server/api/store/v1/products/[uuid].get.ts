export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const uuid = getRouterParam(event, 'uuid')
  const res: any = await $fetch(`${config.storeApiBaseUrl}/store/v1/products/${uuid}`)
  return res.data
})
