import { getCategories } from '~~/server/data/products'

export default defineEventHandler(() => {
  return {
    success: true,
    categories: getCategories()
  }
})
