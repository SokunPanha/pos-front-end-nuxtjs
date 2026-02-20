import type {
  StoreProductItemType,
  StoreCategoryItemType,
  StoreProductListResponseType,
  StoreCategoryListResponseType,
} from '~~/shared/types/ApiResponseType'

export function useStoreProducts() {
  const products = ref<StoreProductItemType[]>([])
  const categories = ref<StoreCategoryItemType[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(params?: {
    category?: string
    search?: string
    page?: number
    pageSize?: number
  }) {
    loading.value = true
    error.value = null
    try {
      const response = await useFetch<StoreProductListResponseType>(
        '/api/store/v1/products',
        { query: params },
      )
      products.value = response.data.value?.items || []
      total.value = response.data.value?.total || 0
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const {data} = await  useFetch<StoreCategoryListResponseType>(
        '/api/store/v1/categories',
      )
      categories.value = data.value?.items || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch categories'
      // silently fail
    
    }
  }

  async function fetchProduct(uuid: string): Promise<StoreProductItemType | null> {
    try {
      return await $fetch<StoreProductItemType>(`/api/store/v1/products/${uuid}`)
    } catch {
      return null
    }
  }

  return {
    products,
    categories,
    total,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    fetchProduct,
  }
}
