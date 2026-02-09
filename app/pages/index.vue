<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";

const UInput = resolveComponent("UInput");
const UInputNumber = resolveComponent("UInputNumber");
const UFormField = resolveComponent("UFormField");
const USelect = resolveComponent("USelect");
const USelectMenu = resolveComponent("USelectMenu");
const UTextarea = resolveComponent("UTextarea");
const UCheckbox = resolveComponent("UCheckbox");
const UToggle = resolveComponent("UToggle");
const URadioGroup = resolveComponent("URadioGroup");
const UButton = resolveComponent("UButton");
const data: any = ref([]);
const isCollapseFilter = ref(false);
const loading = ref(false);
const page = ref(1);
const limit = ref(10);
const pagination = ref({
  total: 100,
  page: 1,
  limit: 10,
});
const TableFilterType = {
  TEXT: "text",
  NUMBER: "number",
  SELECT: "select",
  SELECT_MENU: "selectMenu",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  TOGGLE: "toggle",
  RADIO: "radio",
} as const;

type FilterTypeValue = (typeof TableFilterType)[keyof typeof TableFilterType];

interface FilterSchemaItem {
  label: string;
  index: string;
  valueType: FilterTypeValue;
  options?: { label: string; value: string }[];
}

const filterSchema: FilterSchemaItem[] = [
  {
    label: "Name",
    index: "name",
    valueType: TableFilterType.TEXT,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
  {
    label: "Price",
    index: "price",
    valueType: TableFilterType.NUMBER,
  },
];
const filterItems = computed(() =>
  isCollapseFilter.value ? filterSchema : filterSchema.slice(0, 3),
);
type FilterKeys = FilterSchemaItem["index"];
const filter = reactive(
  filterSchema.reduce(
    (acc, item) => {
      acc[item.index] = "";
      return acc;
    },
    {} as Record<FilterKeys, string>,
  ),
);

const defineColumns = (columns: ColumnDef<any>[]) => {
  return columns;
};

const columns = () => {
  return defineColumns([
    {
      accessorKey: "id",
      meta: {
        class: {
          th: "text-center  bg-red-400",
          td: "text-center",
        },
      },
      header: "ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      meta: {
        class: {
          th: "text-right",
          td: "text-right font-medium",
        },
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("price"));
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(amount);
      },
    },
    {
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      },
    },
  ]);
};

const fetchData = async (params?: {
  page?: number;
  limit?: number;
  filter?: any;
}) => {
  loading.value = true;
  try {
    const res = await $fetch(
      "https://68a419e5c123272fb9b152a2.mockapi.io/api/v1/products",
      {
        query: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          ...params?.filter,
        },
      },
    );
    data.value = res;
  } catch (error) {
    console.log(error);
    data.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData({ filter: filter });
});

const filterType = (item: FilterSchemaItem) => {
  const { valueType, index: key, options = [] } = item;

  switch (valueType) {
    case TableFilterType.TEXT:
      return h(UInput, {
        modelValue: filter[key],
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.NUMBER:
      return h(UInputNumber, {
        modelValue: filter[key],
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.SELECT:
      return h(USelect, {
        modelValue: filter[key],
        options,
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.SELECT_MENU:
      return h(USelectMenu, {
        modelValue: filter[key],
        options,
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.TEXTAREA:
      return h(UTextarea, {
        modelValue: filter[key],
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.CHECKBOX:
      return h(UCheckbox, {
        modelValue: filter[key],
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.TOGGLE:
      return h(UToggle, {
        modelValue: filter[key],
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    case TableFilterType.RADIO:
      return h(URadioGroup, {
        modelValue: filter[key],
        options,
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
    default:
      return h(UInput, {
        modelValue: filter[key],
        "onUpdate:modelValue": (value: string) => {
          filter[key] = value;
        },
      });
  }
};

const filterForm = () => {
  return h(
    "div",
    {
      class: "flex gap-y-8 gap-x-10 flex-wrap",
    },
    filterItems.value.map((item) => {
      return h(
        UFormField,
        {
          class: "flex gap-2",
          label: item.label,
          orientation: "horizontal",
        },
        () => filterType(item),
      );
    }),
  );
};
watch(
  () => [page.value, limit.value],
  () => {
    fetchData({ page: page.value, limit: limit.value, filter: filter });
  },
);
const resetFilter = () => {
  filterSchema.forEach((item) => {
    filter[item.index] = "";
  });
  fetchData();
};
</script>

<template>
  <div class="h-screen overflow-hidden">
    <main class="p-10 h-full flex flex-col">
      <header>
        <UForm
          class="flex justify-between items-end border-b border-accented py-3.5"
        >
          <component :is="filterForm"></component>
          <div class="flex gap-3">
            <UButton
              variant="solid"
              class="h-fit w-fit"
              @click="fetchData({ filter: filter })"
              :loading="loading"
              :disabled="loading"
              >Search</UButton
            >
            <UButton
              variant="outline"
              class="h-fit w-fit"
              @click="resetFilter"
              :disabled="loading"
              >Reset</UButton
            >
            <UButton
              :label="isCollapseFilter ? 'Expand' : 'Collapse'"
              :icon="
                isCollapseFilter
                  ? 'i-heroicons-chevron-down'
                  : 'i-heroicons-chevron-up'
              "
              @click="isCollapseFilter = !isCollapseFilter"
            />
          </div>
        </UForm>
      </header>
      <UTable
        class="flex-1"
        :columns="columns()"
        :data="data"
        :loading="loading"
        :sticky="true"
      />
      <div class="flex justify-end border-t border-default pt-4 px-4">
        <UPagination
          :page="page"
          :items-per-page="limit"
          :total="pagination.total"
          @update:page="(p) => (page = p)"
        />
        <USelect
          :items="[10, 20, 50, 100]"
          v-on:change="() => (page = 1)"
          v-model="limit"
        />
      </div>
    </main>
  </div>
</template>
