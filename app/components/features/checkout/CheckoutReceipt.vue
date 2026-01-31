<script setup lang="ts">
import type { ReceiptData } from "~~/shared/types/payment";

const props = defineProps<{
  receipt: ReceiptData;
}>();

const emit = defineEmits<{
  done: [];
}>();

const { t } = useI18n();

const formattedDate = computed(() => {
  return props.receipt.timestamp.toLocaleString();
});

function printReceipt() {
  const printWindow = window.open("", "_blank", "width=300,height=600");
  if (!printWindow) return;

  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - ${props.receipt.orderId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          padding: 10px;
          width: 280px;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .divider {
          border-top: 1px dashed #000;
          margin: 8px 0;
        }
        .row {
          display: flex;
          justify-content: space-between;
          margin: 4px 0;
        }
        .header {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .items { margin: 10px 0; }
        .item-name { flex: 1; }
        .total-row { font-size: 14px; font-weight: bold; }
        .footer { margin-top: 15px; font-size: 11px; }
      </style>
    </head>
    <body>
      <div class="center header">TINY POS</div>
      <div class="center" style="margin-bottom: 10px;">
        <div>${props.receipt.orderId}</div>
        <div>${formattedDate.value}</div>
      </div>

      <div class="divider"></div>

      <div class="row">
        <span>Order Type:</span>
        <span class="bold">${props.receipt.orderType.toUpperCase()}</span>
      </div>
      ${
        props.receipt.tableNumber
          ? `
      <div class="row">
        <span>Table:</span>
        <span class="bold">#${props.receipt.tableNumber}</span>
      </div>
      `
          : ""
      }
      <div class="row">
        <span>Payment:</span>
        <span class="bold">${props.receipt.paymentMethod === "qr" ? "QR Code" : "Cash"}</span>
      </div>

      <div class="divider"></div>

      <div class="items">
        ${props.receipt.items
          .map(
            (item) => `
          <div class="row">
            <span class="item-name">${item.quantity}x ${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `,
          )
          .join("")}
      </div>

      <div class="divider"></div>

      <div class="row">
        <span>Subtotal:</span>
        <span>$${props.receipt.subtotal.toFixed(2)}</span>
      </div>
      ${
        props.receipt.discount > 0
          ? `
      <div class="row">
        <span>Discount:</span>
        <span>-$${props.receipt.discount.toFixed(2)}</span>
      </div>
      `
          : ""
      }
      <div class="row total-row">
        <span>TOTAL:</span>
        <span>$${props.receipt.total.toFixed(2)}</span>
      </div>

      ${
        props.receipt.paymentMethod === "cash"
          ? `
      <div class="divider"></div>
      <div class="row">
        <span>Cash Received:</span>
        <span>$${props.receipt.cashReceived?.toFixed(2)}</span>
      </div>
      <div class="row bold">
        <span>Change:</span>
        <span>$${props.receipt.change?.toFixed(2)}</span>
      </div>
      `
          : ""
      }

      <div class="divider"></div>

      <div class="center footer">
        <p>Thank you for your purchase!</p>
        <p>Please come again</p>
      </div>

      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          };
        };
      <\/script>
    </body>
    </html>
  `;

  printWindow.document.write(receiptHTML);
  printWindow.document.close();
}
</script>

<template>
  <div class="space-y-4">
    <!-- Success Header -->
    <div class="text-center">
      <div
        class="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
      >
        <UIcon
          name="i-heroicons-check"
          class="text-3xl text-green-600 dark:text-green-400"
        />
      </div>
      <h2 class="text-xl font-bold text-green-600 dark:text-green-400">
        Checkout Successful
      </h2>
      <p class="text-sm text-gray-500">{{ receipt.orderId }}</p>
    </div>

    <!-- Receipt Details -->
    <div class="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
      <!-- Order Info -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Order Type</span>
        <span class="font-medium capitalize">{{ receipt.orderType }}</span>
      </div>

      <div v-if="receipt.tableNumber" class="flex justify-between text-sm">
        <span class="text-gray-500">Table</span>
        <span class="font-medium">#{{ receipt.tableNumber }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Date</span>
        <span class="font-medium">{{ formattedDate }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Payment</span>
        <span class="font-medium capitalize">{{
          receipt.paymentMethod === "qr" ? "QR Code" : "Cash"
        }}</span>
      </div>

      <hr class="border-gray-200 dark:border-gray-700" />

      <!-- Items -->
      <div class="space-y-2">
        <div
          v-for="(item, index) in receipt.items"
          :key="index"
          class="flex justify-between text-sm"
        >
          <span>{{ item.quantity }}x {{ item.name }}</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>

      <hr class="border-gray-200 dark:border-gray-700" />

      <!-- Totals -->
      <div class="space-y-1">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Subtotal</span>
          <span>${{ receipt.subtotal.toFixed(2) }}</span>
        </div>

        <div
          v-if="receipt.discount > 0"
          class="flex justify-between text-sm text-green-600"
        >
          <span>Discount</span>
          <span>-${{ receipt.discount.toFixed(2) }}</span>
        </div>

        <div class="flex justify-between font-bold">
          <span>Total</span>
          <span>${{ receipt.total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Cash Payment Details -->
      <template v-if="receipt.paymentMethod === 'cash'">
        <hr class="border-gray-200 dark:border-gray-700" />

        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Cash Received</span>
            <span>${{ receipt.cashReceived?.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between text-sm font-medium text-green-600">
            <span>Change</span>
            <span>${{ receipt.change?.toFixed(2) }}</span>
          </div>
        </div>
      </template>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <UButton
        class="flex-1"
        size="lg"
        color="neutral"
        variant="outline"
        icon="i-heroicons-printer"
        @click="printReceipt"
      >
        Print
      </UButton>
      <UButton class="flex-1" size="lg" color="primary" @click="emit('done')">
        Done
      </UButton>
    </div>
  </div>
</template>
