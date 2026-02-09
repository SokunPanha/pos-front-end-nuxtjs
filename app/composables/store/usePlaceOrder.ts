import { user } from "#build/ui";

export default function usePlaceOrder() {
  const cartStore = useCartStore();
  const toast = useToast();
  const isLoading = ref(false);
  const { locale } = useI18n();
  const route = useRoute();
  const onPlaceOrder = async () => {
   try{
 isLoading.value = true;
    // Simulate order placement logic
    const orderItems = cartStore.items.map((item) => ({
      productName: item.name.kh,
      quantity: item.quantity,
    }));
    const orderData = {
      orderItems: orderItems,
      orderType: cartStore.orderType === "dine-in" ? "ញ៉ាំនៅហាង" : "ខ្ចប់",
      dinningTableNumber:  route.params.storeId,
      totalPrice: cartStore.total,
      placeOrderDate: formatDate(new Date()),
    };
    const response = await $fetch("/api/store/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderData,
    });

    cartStore.clear();
    toast.add({
      title: locale.value === "en" ? "Order Placed" : "បានដាក់ការបញ្ជាទិញ",
      description:
        locale.value === "en"
          ? "Your order has been placed successfully!"
          : "ការបញ្ជាទិញរបស់អ្នកត្រូវបានដាក់ស្តាយដោយជោគជ័យ!",
      color: "success",
    });

   }
   catch(error){
    toast.add({
      title: locale.value === "en" ? "Order Placed" : "បានដាក់ការបញ្ជាទិញ",
      description:
        locale.value === "en"
          ? "Failed to place order!"
          : "ការបញ្ជាទិញរបស់អ្នកបានបរាជ័យ!",
      color: "error",
    });
   }
   finally{
    isLoading.value = false;
   }
    // Clear the cart after placing the order
    // cartStore.clearCart();
  };
  return { onPlaceOrder, isLoading };
}
