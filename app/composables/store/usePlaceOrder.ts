export default function usePlaceOrder() {
  const cartStore = useStoreCartStore()
  const toast = useToast()
  const isLoading = ref(false)
  const { locale } = useI18n()
  const route = useRoute()

  const onPlaceOrder = async () => {
    try {
      isLoading.value = true

      const orderItems = cartStore.items.map((item) => ({
        productName: item.name.km || item.name.en,
        variantName: item.variantName?.km || item.variantName?.en || '',
        attributes: (item.attributes ?? []).map((a) => ({
          name: a.name.km || a.name.en,
          value: a.value.km || a.value.en,
        })),
        note: item.note || '',
        unitPrice: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        lineTotal: item.price * item.quantity,
      }))

      const orderData = {
        orderItems,
        orderType: cartStore.orderType === 'dine-in' ? 'ញ៉ាំនៅហាង' : 'ខ្ចប់',
        dinningTableNumber: route.params.storeId,
        subTotal: cartStore.subTotal,
        discount: cartStore.discount,
        totalPrice: cartStore.total,
        placeOrderDate: formatDate(new Date()),
      }

      await $fetch('/api/store/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: orderData,
      })

      cartStore.clear()
      toast.add({
        title: locale.value === 'en' ? 'Order Placed' : 'បានដាក់ការបញ្ជាទិញ',
        description:
          locale.value === 'en'
            ? 'Your order has been placed successfully!'
            : 'ការបញ្ជាទិញរបស់អ្នកត្រូវបានដាក់ស្តាយដោយជោគជ័យ!',
        color: 'success',
      })
    } catch {
      toast.add({
        title: locale.value === 'en' ? 'Error' : 'កំហុស',
        description:
          locale.value === 'en'
            ? 'Failed to place order!'
            : 'ការបញ្ជាទិញរបស់អ្នកបានបរាជ័យ!',
        color: 'error',
      })
    } finally {
      isLoading.value = false
    }
  }

  return { onPlaceOrder, isLoading }
}
