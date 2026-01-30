import { createOrder } from '~~/server/data/orders'
import type { CreateOrderRequest } from '~~/shared/types/order'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateOrderRequest>(event)

  if (!body.items || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Order must have at least one item'
    })
  }

  if (!body.orderType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Order type is required'
    })
  }

  const order = createOrder(body)

  return {
    success: true,
    order
  }
})
