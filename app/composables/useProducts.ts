import type { Product } from '~~/shared/types/product'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts({category, search}: {category?: string, search?: string}) {
    loading.value = true
    error.value = null

    try {
      const query = category || search ? `?category=${encodeURIComponent(category || '')}&search=${encodeURIComponent(search || '')}` : ''
      const response = await $fetch<{ success: boolean; products: Product[] }>(`/api/pos/products${query}`)
      products.value = response.products
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const response = await $fetch<{ success: boolean; categories: string[] }>(
        '/api/pos/categories'
      )
      categories.value = response.categories
    } catch {
      // silently fail
    }
  }

  async function getProductById(id: number): Promise<Product | null> {
    try {
      const response = await $fetch<{ success: boolean; product: Product }>(
        `/api/pos/products/${id}`
      )
      return response.product
    } catch {
      return null
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    getProductById
  }
}
