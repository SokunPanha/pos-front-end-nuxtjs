<script setup lang="ts">
type Currency = 'USD' | 'KHR'

const props = defineProps<{
  total: number
  change: number
  exchangeRate?: number
}>()

const cashReceived = defineModel<number>('cashReceived', { default: 0 })

const emit = defineEmits<{
  confirm: []
  back: []
}>()

// Currency state
const currency = ref<Currency>('USD')
const rate = computed(() => props.exchangeRate || 4100)

// Convert total to KHR for display
const totalInKHR = computed(() => Math.round(props.total * rate.value))

// Amount in the current currency
const inputAmount = ref(0)

// Convert input to USD for comparison
const receivedInUSD = computed(() => {
  if (currency.value === 'USD') {
    return inputAmount.value
  }
  return inputAmount.value / rate.value
})

// Update parent's cashReceived (always in USD)
watch(receivedInUSD, (val) => {
  cashReceived.value = val
})

const canConfirm = computed(() => receivedInUSD.value >= props.total)

// Change calculation
const changeInUSD = computed(() => {
  if (receivedInUSD.value >= props.total) {
    return receivedInUSD.value - props.total
  }
  return 0
})

const changeInKHR = computed(() => Math.round(changeInUSD.value * rate.value))

const shortfall = computed(() => {
  if (receivedInUSD.value < props.total) {
    return props.total - receivedInUSD.value
  }
  return 0
})

// Quick amount buttons based on currency
const quickAmountsUSD = [1, 5, 10, 20, 50, 100]
const quickAmountsKHR = [1000, 5000, 10000, 20000, 50000, 100000]

const quickAmounts = computed(() => {
  return currency.value === 'USD' ? quickAmountsUSD : quickAmountsKHR
})

function toggleCurrency() {
  // Convert current amount to new currency
  if (currency.value === 'USD') {
    currency.value = 'KHR'
    inputAmount.value = Math.round(inputAmount.value * rate.value)
  } else {
    currency.value = 'USD'
    inputAmount.value = Number((inputAmount.value / rate.value).toFixed(2))
  }
}

function addAmount(amount: number) {
  inputAmount.value += amount
}

function setExactAmount() {
  if (currency.value === 'USD') {
    inputAmount.value = props.total
  } else {
    inputAmount.value = totalInKHR.value
  }
}

function clearAmount() {
  inputAmount.value = 0
}

// Format number with commas for KHR
function formatKHR(value: number): string {
  return value.toLocaleString('en-US')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UButton variant="ghost" size="sm" icon="i-heroicons-arrow-left" @click="emit('back')" />
      <h2 class="text-xl font-bold">Cash Payment</h2>
    </div>

    <!-- Total Due -->
    <div class="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div class="text-sm text-gray-500">Total Due</div>
      <div class="text-3xl font-bold text-primary">${{ total.toFixed(2) }}</div>
      <div class="text-sm text-gray-500">≈ {{ formatKHR(totalInKHR) }} ៛</div>
    </div>

    <!-- Currency Toggle -->
    <div class="flex justify-center">
      <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700">
        <button
          class="px-4 py-2 text-sm font-medium rounded-l-lg transition-colors"
          :class="currency === 'USD' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
          @click="currency !== 'USD' && toggleCurrency()"
        >
          USD ($)
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-r-lg transition-colors"
          :class="currency === 'KHR' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
          @click="currency !== 'KHR' && toggleCurrency()"
        >
          KHR (៛)
        </button>
      </div>
    </div>

    <!-- Cash Received Input -->
    <div>
      <label class="text-sm font-medium mb-1 block">Cash Received ({{ currency }})</label>
      <UInput
        v-model.number="inputAmount"
        type="number"
        size="lg"
        :placeholder="currency === 'USD' ? '0.00' : '0'"
        :min="0"
        :step="currency === 'USD' ? 0.01 : 100"
      >
        <template #leading>
          <span class="text-gray-500">{{ currency === 'USD' ? '$' : '៛' }}</span>
        </template>
      </UInput>
    </div>

    <!-- Quick Amount Buttons -->
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="amount in quickAmounts"
        :key="amount"
        size="sm"
        variant="outline"
        @click="addAmount(amount)"
      >
        +{{ currency === 'USD' ? `$${amount}` : `${formatKHR(amount)}៛` }}
      </UButton>
      <UButton size="sm" variant="outline" @click="setExactAmount">
        Exact
      </UButton>
      <UButton size="sm" variant="ghost" color="error" @click="clearAmount">
        Clear
      </UButton>
    </div>

    <!-- Change Display -->
    <div
      v-if="inputAmount > 0"
      class="text-center p-4 rounded-lg"
      :class="canConfirm ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'"
    >
      <div class="text-sm" :class="canConfirm ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
        {{ canConfirm ? 'Change' : 'Insufficient Amount' }}
      </div>
      <div
        class="text-2xl font-bold"
        :class="canConfirm ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'"
      >
        <template v-if="canConfirm">
          ${{ changeInUSD.toFixed(2) }}
          <span class="text-base font-normal">≈ {{ formatKHR(changeInKHR) }} ៛</span>
        </template>
        <template v-else>
          -${{ shortfall.toFixed(2) }}
        </template>
      </div>
    </div>

    <!-- Exchange Rate Info -->
    <div class="text-center text-xs text-gray-400">
      Exchange rate: 1 USD = {{ formatKHR(rate) }} KHR
    </div>

    <!-- Confirm Button -->
    <UButton
      block
      size="lg"
      color="primary"
      :disabled="!canConfirm"
      @click="emit('confirm')"
    >
      Confirm Payment
    </UButton>
  </div>
</template>
