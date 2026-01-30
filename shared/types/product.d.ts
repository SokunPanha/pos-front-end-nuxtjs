export type Product = {
  id: number
  name: string
  originalPrice: number
  promoPrice?: number | null
  discountPercent?: number
  image: string
  category: string
  description?: string
}
