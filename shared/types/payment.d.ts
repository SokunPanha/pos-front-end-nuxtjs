export type PaymentMethod = 'cash' | 'qr'

export type PaymentState = {
  method: PaymentMethod | null
  cashReceived: number
  isPaid: boolean
}

export type ReceiptData = {
  orderId: string
  orderType: 'dine-in' | 'take-away'
  tableNumber?: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  subtotal: number
  discount: number
  total: number
  paymentMethod: PaymentMethod
  cashReceived?: number
  change?: number
  timestamp: Date
}
