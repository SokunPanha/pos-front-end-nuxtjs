import type { Product } from '~~/shared/types/product'

export const products: Product[] = [
  {
    id: 1,
    name: {
      en: "Beef Lok Lak",
      kh: "ឡុកឡាក់សាច់គោ"
    },
    originalPrice: 6.5,
    promoPrice: 5.5,
    discountPercent: 15,
    image: "https://www.cooking-therapy.com/wp-content/uploads/2020/05/Vietnamese-Shaking-Beef-11-scaled.jpg",
    category: "Main Dish",
    description: "Stir-fried beef with black pepper sauce"
  },
  {
    id: 2,
    name: {
      en: "Chicken Amok",
      kh: "អាម៉ុកមាន់"
    },
    originalPrice: 5.0,
    promoPrice: 4.2,
    discountPercent: 16,
    image: "https://tse2.mm.bing.net/th/id/OIP.VG1QorWh4g9iSsMVCKFVuQHaG0",
    category: "Main Dish",
    description: "Traditional Cambodian coconut curry"
  },
  {
    id: 3,
    name: {
      en: "Seafood Fried Rice",
      kh: "បាយឆាគ្រឿងសមុទ្រ"
    },
    originalPrice: 4.5,
    promoPrice: 3.9,
    discountPercent: 13,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    category: "Rice",
    description: "Fried rice with shrimp and squid"
  },
  {
    id: 4,
    name: {
      en: "Grilled Pork Skewers",
      kh: "សាច់ជ្រូកអាំងចង្កាក់"
    },
    originalPrice: 3.0,
    promoPrice: 2.5,
    discountPercent: 17,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    category: "BBQ",
    description: "Marinated pork grilled on skewers"
  },
  {
    id: 5,
    name: {
      en: "Papaya Salad",
      kh: "សាឡាដផ្លែឈើប៉ាពាយ៉ា"
    },
    originalPrice: 2.5,
    promoPrice: null,
    discountPercent: 0,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    category: "Salad",
    description: "Fresh green papaya salad"
  }
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getCategories(): string[] {
  return [...new Set(products.map(p => p.category))]
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getProductsBySearch(search: string): Product[] {
  const keyword = search.toLowerCase()

  return products.filter(p =>
    p.name.en.toLowerCase().includes(keyword) ||
    p.name.kh.toLowerCase().includes(keyword)
  )
}