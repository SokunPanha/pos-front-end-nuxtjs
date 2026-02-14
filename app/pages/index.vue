<script setup lang="ts">
import {
  defineFilter,
  defineProTableColumns,
} from "~/components/ui/Table/utils";

const fetchData = async (params?: {
  page?: number;
  limit?: number;
  filter?: any;
}) => {
  try {
    const res: any[] = await $fetch(
      "https://68a419e5c123272fb9b152a2.mockapi.io/api/v1/products",
      {
        query: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          ...params?.filter,
        },
      }
    );

    return {
      data: res,
      total: 50,
      success: true,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      data: [],
      total: 0,
      success: false,
    };
  }
};

const columns = () => {
  return defineProTableColumns([
    {
      accessorKey: "id",
      title: "Product ID",
      meta: {
        class: {
          th: "text-center bg-red-400",
          td: "text-center",
        },
      },
      header: "ID",
      cell: ({ row }: any) => `#${row.getValue("id")}`,
    },
    {
      accessorKey: "name",
      title: "Product Name",
      header: "Name",
    },
    {
      accessorKey: "price",
      title: "Price",
      meta: {
        class: {
          th: "text-right",
          td: "text-right font-medium",
        },
      },
      cell: ({ row }: any) => {
        const amount = Number.parseFloat(row.getValue("price"));
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(amount);
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created Date",
      header: "Created At",
      cell: ({ row }: any) => {
        return new Date(row.getValue("createdAt")).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      header: "Description",
      hideInTable: true, // Hidden by default
    },
  ] as any);
};

const filterField = defineFilter([
  {
    label: "Name",
    index: "name",
    valueType: "text",
  },
  {
    label: "Price",
    index: "price",
    valueType: "number",
  },
  {
    label: "Created At",
    index: "createdAt",
    valueType: "dateRange",
  },
]);

// Handle row selection changes
const handleSelectionChange = (
  selectedRows: any[],
  selectedRowKeys: (string | number)[]
) => {
  console.log("Selected rows:", selectedRows);
  console.log("Selected row keys:", selectedRowKeys);
};
</script>

<template>
  <UiTable
    :filter-field="filterField"
    :pagination="{
      paginationOptions: [10, 20, 50, 100],
    }"
    :columns="columns()"
    :request="fetchData"
    :toolbar="true"
    :row-selection="{
      onChange: handleSelectionChange,
    }"
    default-density="default"
    export-filename="products-export.csv"
    table-id="products-table"
  >
    <template #toolbar-actions>
      <!-- Add custom toolbar actions here if needed -->
    </template>
  </UiTable>
</template>
