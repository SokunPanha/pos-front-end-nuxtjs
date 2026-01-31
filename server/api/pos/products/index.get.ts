import { getProducts, getProductsByCategory, getProductsBySearch } from '~~/server/data/products'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = query.category ? decodeURIComponent(query.category as string) : undefined
  const search = query.search ? decodeURIComponent(query.search as string) : undefined

    if(search){
    return {
      success: true,
      products: getProductsBySearch(search)
    }
  }

  if (category ) {
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
