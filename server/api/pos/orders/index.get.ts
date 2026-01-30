import { getOrders } from '~~/server/data/orders'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 50
  const offset = Number(query.offset) || 0

  const result = getOrders(limit, offset)

  return {
    success: true,
    ...result
  }
})
