export type OrderStatus = 'pending' | 'paid' | 'completed' | 'cancelled'

export type OrderItem = {
  productId: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
}

export type Order = {
  id: string
  orderNumber: number
  orderType: 'dine-in' | 'take-away'
  tableNumber?: string
  note?: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  status: OrderStatus
  createdAt: string
  paidAt?: string
}

export type CreateOrderRequest = {
  orderType: 'dine-in' | 'take-away'
  tableNumber?: string
  note?: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
}

export type CreateOrderResponse = {
  success: boolean
  order: Order
}

export type ListOrdersResponse = {
  orders: Order[]
  total: number
}
