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