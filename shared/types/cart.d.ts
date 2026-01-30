export type CartItem = {
  id: string           // unique per cart row
  productId: number
  name: string
  price: number        // final price (promo already applied)
  originalPrice?: number
  quantity: number
  image: string
  note?: string
}

export type OrderType = 'dine-in' | 'take-away'

export type OrderOptions = {
  orderType: OrderType
  tableNumber?: string   // only for dine-in
  note?: string
}