interface OrderItemRequest {
  productName: string
  variantName: string
  attributes: { name: string; value: string }[]
  note: string
  unitPrice: number
  originalPrice: number
  quantity: number
  lineTotal: number
}

interface PlaceOrderRequest {
  orderItems: OrderItemRequest[]
  dinningTableNumber?: string
  orderType: string
  subTotal: number
  discount: number
  totalPrice: number
  placeOrderDate: string
}

function formatItem(item: OrderItemRequest): string {
  const lines: string[] = []

  // Main line: name + variant
  const nameLine = item.variantName
    ? `• ${item.productName} (${item.variantName})`
    : `• ${item.productName}`
  lines.push(`${nameLine} × ${item.quantity}`)

  // Price line
  const priceStr = item.originalPrice > item.unitPrice
    ? `~~$${item.originalPrice.toFixed(2)}~~ → $${item.unitPrice.toFixed(2)} × ${item.quantity} = $${item.lineTotal.toFixed(2)}`
    : `$${item.unitPrice.toFixed(2)} × ${item.quantity} = $${item.lineTotal.toFixed(2)}`
  lines.push(`  💵 ${priceStr}`)

  // Attributes
  if (item.attributes.length) {
    const attrStr = item.attributes.map((a) => `${a.name}: ${a.value}`).join(', ')
    lines.push(`  🏷 ${attrStr}`)
  }

  // Note
  if (item.note) {
    lines.push(`  📝 ${item.note}`)
  }

  return lines.join('\n')
}

export default defineEventHandler(async (event) => {
  const body = await readBody<PlaceOrderRequest>(event)

  const itemsText = body.orderItems.map(formatItem).join('\n\n')

  const summaryLines = [
    `🍽 លេខតុ: ${body.dinningTableNumber || 'មិនមាន'}`,
    `📦 ប្រភេទ: ${body.orderType}`,
  ]

  if (body.discount > 0) {
    summaryLines.push(`💵 សរុបរង: $${body.subTotal.toFixed(2)}`)
    summaryLines.push(`🔖 បញ្ចុះតម្លៃ: -$${body.discount.toFixed(2)}`)
  }

  summaryLines.push(`💰 តម្លៃសរុប: $${body.totalPrice.toFixed(2)}`)
  summaryLines.push(`📅 កាលបរិច្ឆេទ: ${body.placeOrderDate}`)

  const message = `📥 មានការបញ្ជាទិញថ្មី!\n\n🧾 បញ្ជីម្ហូប:\n${itemsText}\n\n${summaryLines.join('\n')}`

  const response = await $fetch(
    `https://api.telegram.org/bot7996992675:AAE6PpECLE2aj3ZithTkFuG_GNSDFVtmHK8/sendMessage`,
    {
      method: 'POST',
      body: {
        chat_id: '-5287523250',
        text: message,
      },
    },
  )

  return {
    success: true,
    message: 'Order placed successfully',
    telegramResponse: response,
  }
})
