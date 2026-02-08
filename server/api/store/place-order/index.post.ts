interface PlaceOrderRequest {
  orderItems: {
    productName: string;
    quantity: number;
  }[];
  dinningTableNumber?: string;
  orderType: "dine-in" | "take-away";
  totalPrice: number;
  placeOrderDate: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<PlaceOrderRequest>(event);
  const response = await $fetch(
    `https://api.telegram.org/bot7996992675:AAE6PpECLE2aj3ZithTkFuG_GNSDFVtmHK8/sendMessage`,
    {
      method: "POST",
      body: {
        chat_id: "6413381172",
        text: `📥 មានការបញ្ជាទិញថ្មី!

🧾 បញ្ជីម្ហូប:
${body.orderItems
  .map((item) => `• ${item.productName} × ${item.quantity}`)
  .join("\n")}

🍽 លេខតុ: ${body.dinningTableNumber || "មិនមាន"}
📦 ប្រភេទការបញ្ជាទិញ: ${body.orderType}
💰 តម្លៃសរុប: $${body.totalPrice}
📅 កាលបរិច្ឆេទបញ្ជាទិញ: ${body.placeOrderDate}`,
      },
    },
  );

  return {
    success: true,
    message: "Order placed successfully",
    telegramResponse: response,
  };
});
