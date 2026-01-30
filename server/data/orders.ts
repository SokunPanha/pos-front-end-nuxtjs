import type { Order, CreateOrderRequest } from '~~/shared/types/order'
import type { Payment, CreatePaymentRequest, ReceiptData } from '~~/shared/types/payment'

// In-memory storage
const orders: Map<string, Order> = new Map()
const payments: Map<string, Payment> = new Map()

let orderCounter = 1000

// Order functions
export function createOrder(request: CreateOrderRequest): Order {
  const id = `ORD-${Date.now()}`
  const orderNumber = ++orderCounter

  const order: Order = {
    id,
    orderNumber,
    orderType: request.orderType,
    tableNumber: request.tableNumber,
    note: request.note,
    items: request.items,
    subtotal: request.subtotal,
    discount: request.discount,
    total: request.total,
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  orders.set(id, order)
  return order
}

export function getOrderById(id: string): Order | undefined {
  return orders.get(id)
}

export function getOrders(limit = 50, offset = 0): { orders: Order[]; total: number } {
  const allOrders = Array.from(orders.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return {
    orders: allOrders.slice(offset, offset + limit),
    total: allOrders.length
  }
}

export function updateOrderStatus(id: string, status: Order['status']): Order | undefined {
  const order = orders.get(id)
  if (order) {
    order.status = status
    if (status === 'paid') {
      order.paidAt = new Date().toISOString()
    }
    orders.set(id, order)
  }
  return order
}

// Payment functions
export function createPayment(request: CreatePaymentRequest): { payment: Payment; receipt: ReceiptData } | null {
  const order = getOrderById(request.orderId)
  if (!order) return null

  const paymentId = `PAY-${Date.now()}`
  const change = request.method === 'cash' && request.cashReceived
    ? request.cashReceived - request.amount
    : undefined

  const payment: Payment = {
    id: paymentId,
    orderId: request.orderId,
    method: request.method,
    amount: request.amount,
    cashReceived: request.cashReceived,
    change,
    status: 'completed',
    createdAt: new Date().toISOString()
  }

  payments.set(paymentId, payment)

  // Update order status
  updateOrderStatus(request.orderId, 'paid')

  // Generate receipt
  const receipt: ReceiptData = {
    orderId: order.id,
    orderNumber: order.orderNumber,
    orderType: order.orderType,
    tableNumber: order.tableNumber,
    items: order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    subtotal: order.subtotal,
    discount: order.discount,
    total: order.total,
    paymentMethod: request.method,
    cashReceived: request.cashReceived,
    change,
    timestamp: new Date()
  }

  return { payment, receipt }
}

export function getPaymentById(id: string): Payment | undefined {
  return payments.get(id)
}

export function getPaymentByOrderId(orderId: string): Payment | undefined {
  return Array.from(payments.values()).find(p => p.orderId === orderId)
}

// Settings
export const posSettings = {
  exchangeRate: 4100,
  currency: {
    primary: 'USD',
    secondary: 'KHR'
  },
  storeName: 'Tiny POS'
}
