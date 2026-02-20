export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const res: any =  await $fetch(`${config.storeApiBaseUrl}/store/v1/products`, { query })
  return res.data
})
