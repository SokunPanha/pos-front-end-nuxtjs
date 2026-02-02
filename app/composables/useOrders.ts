import type {
  Order,
  CreateOrderRequest,
  CreateOrderResponse,
} from "~~/shared/types/order";
import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  PosSettings,
} from "~~/shared/types/payment";

export function useOrders() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const showCheckoutModal = ref(false);
  const cartStore = useCartStore();
  const toast = useToast();
  const { t } = useI18n();

  async function createOrder(
    request: CreateOrderRequest,
  ): Promise<Order | null> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<CreateOrderResponse>("/api/pos/orders", {
        method: "POST",
        body: request,
      });
      return response.order;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to create order";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function processPayment(
    request: CreatePaymentRequest,
  ): Promise<CreatePaymentResponse | null> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<CreatePaymentResponse>(
        "/api/pos/payments",
        {
          method: "POST",
          body: request,
        },
      );
      return response;
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : "Failed to process payment";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function getSettings(): Promise<PosSettings | null> {
    try {
      const response = await $fetch<{
        success: boolean;
        settings: PosSettings;
      }>("/api/pos/settings");
      return response.settings;
    } catch {
      return null;
    }
  }

  async function getOrder(id: string): Promise<Order | null> {
    try {
      const response = await $fetch<{ success: boolean; order: Order }>(
        `/api/pos/orders/${id}`,
      );
      return response.order;
    } catch {
      return null;
    }
  }

  function openCheckout() {
    if (cartStore.orderType === "dine-in") {
      if (cartStore.tableNumber === "") {
        toast.add({
          title: t("message.pleaseSelectTable"),
          color: "warning",
          duration: 5000,
          icon: "i-lucide-exclamation-triangle",
        });
        return;
      }
    }
    if (cartStore.totalItems > 0) {
      toast.clear();
      showCheckoutModal.value = true;
    }
  }
  function openOrder() {
    if (cartStore.orderType === "dine-in") {
      if (cartStore.tableNumber === "") {
        toast.add({
          title: t("message.pleaseSelectTable"),
          color: "warning",
          duration: 5000,
          icon: "i-lucide-exclamation-triangle",
        });
        return;
      }
    }
  }
  return {
    loading,
    error,
    createOrder,
    processPayment,
    getSettings,
    getOrder,
    openCheckout,
    openOrder,
    showCheckoutModal,
  };
}
