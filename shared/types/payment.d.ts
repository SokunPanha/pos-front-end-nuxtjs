export type PaymentMethod = 'cash' | 'qr'

export type PaymentState = {
  method: PaymentMethod | null
  cashReceived: number
  isPaid: boolean
}

export type ReceiptData = {
  orderId: string
  orderNumber: number
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

// API Types
export type Payment = {
  id: string
  orderId: string
  method: PaymentMethod
  amount: number
  cashReceived?: number
  change?: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export type CreatePaymentRequest = {
  orderId: string
  method: PaymentMethod
  amount: number
  cashReceived?: number
}

export type CreatePaymentResponse = {
  success: boolean
  payment: Payment
  receipt: ReceiptData
}

export type PosSettings = {
  exchangeRate: number
  currency: {
    primary: string
    secondary: string
  }
  storeName: string
}
