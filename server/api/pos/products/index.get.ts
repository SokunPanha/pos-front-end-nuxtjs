import { getProducts, getProductsByCategory } from '~~/server/data/products'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined

  if (category) {
    return {
      success: true,
      products: getProductsByCategory(category)
    }
  }

  return {
    success: true,
    products: getProducts()
  }
})
