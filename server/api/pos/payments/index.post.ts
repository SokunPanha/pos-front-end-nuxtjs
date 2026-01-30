import { createPayment } from '~~/server/data/orders'
import type { CreatePaymentRequest } from '~~/shared/types/payment'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreatePaymentRequest>(event)

  if (!body.orderId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Order ID is required'
    })
  }

  if (!body.method) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Payment method is required'
    })
  }

  if (body.method === 'cash' && (!body.cashReceived || body.cashReceived < body.amount)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cash received must be at least the order amount'
    })
  }

  const result = createPayment(body)

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found'
    })
  }

  return {
    success: true,
    payment: result.payment,
    receipt: result.receipt
  }
})
