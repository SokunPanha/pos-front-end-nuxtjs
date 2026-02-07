<script setup lang="ts">
import QRCode from "qrcode";

const props = defineProps<{
  total: number;
}>();

const emit = defineEmits<{
  confirm: [];
  back: [];
}>();

const { t } = useI18n();

const qrDataUrl = ref<string>("");
const orderId = `ORD-${Date.now()}`;

// Generate QR code on mount
onMounted(async () => {
  const paymentData = JSON.stringify({
    orderId,
    amount: props.total,
    currency: "USD",
    timestamp: new Date().toISOString(),
  });

  try {
    qrDataUrl.value = await QRCode.toDataURL(paymentData, {
      width: 250,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  } catch (err) {
    console.error("Failed to generate QR code:", err);
  }
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UButton
        variant="ghost"
        size="sm"
        icon="i-heroicons-arrow-left"
        @click="emit('back')"
      />
      <h2 class="text-xl font-bold">{{ t("label.qrCheckout") }}</h2>
    </div>

    <!-- QR Code Display -->
    <div class="flex flex-col items-center p-4 bg-white rounded-lg">
      <img
        v-if="qrDataUrl"
        :src="qrDataUrl"
        alt="Payment QR Code"
        class="w-64 h-64"
      />
      <div v-else class="w-64 h-64 flex items-center justify-center">
        <UIcon name="i-heroicons-arrow-path" class="text-4xl animate-spin" />
      </div>

      <div class="mt-4 text-center">
        <div class="text-sm text-gray-500">{{ t("label.scanToPay") }}</div>
        <div class="text-2xl font-bold text-primary">
          ${{ total.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="text-center text-sm text-gray-500">
      <p>{{ t("label.scanInstructions") }}</p>
      <p>{{ t("label.clickWhenComplete") }}</p>
    </div>

    <!-- Confirm Button -->
    <UButton class="cursor-pointer" block size="lg" color="primary" @click="emit('confirm')">
      {{ t("label.paymentReceived") }}
    </UButton>
  </div>
</template>
