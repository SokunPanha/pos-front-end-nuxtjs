// Auto-generated from OpenAPI spec — do not edit manually
// Generated at: 2026-02-18T11:37:23.653Z
// Source: http://localhost:3003/store/docs-yaml

export interface StoreProductCategoryRefType {
  uuid: string;
  name: Record<string, unknown>;
}

export interface StoreVariantItemType {
  uuid: string;
  name: Record<string, unknown>;
  sku: string;
  price: number;
  promotePrice: number;
  stockQty: number;
  isActive: string;
  images?: string[];
}

export interface StoreAttributeValueItemType {
  uuid: string;
  value: Record<string, unknown>;
}

export interface StoreAttributeItemType {
  uuid: string;
  name: Record<string, unknown>;
  values: StoreAttributeValueItemType[];
}

export interface StoreProductItemType {
  uuid: string;
  name: Record<string, unknown>;
  description?: Record<string, unknown>;
  images?: string[];
  isActive: string;
  category?: StoreProductCategoryRefType;
  variants: StoreVariantItemType[];
  attributes: StoreAttributeItemType[];
}

export interface StoreProductListResponseType {
  total: number;
  items: StoreProductItemType[];
}

export interface StoreCategoryItemType {
  uuid: string;
  name: Record<string, unknown>;
  description?: Record<string, unknown>;
  images?: string[];
}

export interface StoreCategoryListResponseType {
  items: StoreCategoryItemType[];
}
