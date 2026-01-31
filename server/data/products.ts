import type { Product } from '~~/shared/types/product'

export const products: Product[] = [
  {
    id: 1,
    name: "Beef Lok Lak fdfdfdfdfdfdfdfdfdfdfdfd",
    originalPrice: 6.5,
    promoPrice: 5.5,
    discountPercent: 15,
    image: "https://www.cooking-therapy.com/wp-content/uploads/2020/05/Vietnamese-Shaking-Beef-11-scaled.jpg",
    category: "Main Dish",
    description: "Stir-fried beef with black pepper sauce"
  },
  {
    id: 2,
    name: "Chicken Amok",
    originalPrice: 5.0,
    promoPrice: 4.2,
    discountPercent: 16,
    image: "https://tse2.mm.bing.net/th/id/OIP.VG1QorWh4g9iSsMVCKFVuQHaG0?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Main Dish",
    description: "Traditional Cambodian coconut curry"
  },
  {
    id: 3,
    name: "Seafood Fried Rice",
    originalPrice: 4.5,
    promoPrice: 3.9,
    discountPercent: 13,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    category: "Rice",
    description: "Fried rice with shrimp and squid"
  },
  {
    id: 4,
    name: "Grilled Pork Skewers",
    originalPrice: 3.0,
    promoPrice: 2.5,
    discountPercent: 17,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    category: "BBQ",
    description: "Marinated pork grilled on skewers"
  },
  {
    id: 5,
    name: "Papaya Salad",
    originalPrice: 2.5,
    promoPrice: null,
    discountPercent: 0,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    category: "Salad",
    description: "Fresh green papaya salad"
  },
  {
    id: 6,
    name: "Spring Rolls",
    originalPrice: 2.0,
    promoPrice: 1.5,
    discountPercent: 25,
    image: "https://tse4.mm.bing.net/th/id/OIP.3zZOs9efoD6_K0G_nA0-AAHaE7?w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Appetizer",
    description: "Crispy spring rolls"
  },
  {
    id: 7,
    name: "Tom Yum Soup",
    originalPrice: 3.5,
    promoPrice: 3.0,
    discountPercent: 14,
    image: "https://bing.com/th?id=OSK.98e8136fedc49e98cfd159e9e0e8a574",
    category: "Soup",
    description: "Hot and sour soup with shrimp"
  },
  {
    id: 8,
    name: "Iced Milk Coffee",
    originalPrice: 1.5,
    promoPrice: 1.2,
    discountPercent: 20,
    image: "https://bing.com/th?id=OSK.1966086f8b5a3f3946727105ffac9184",
    category: "Drink",
    description: "Strong coffee with milk and ice"
  },
  {
    id: 9,
    name: "Fresh Coconut Juice",
    originalPrice: 2.0,
    promoPrice: null,
    discountPercent: 0,
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767",
    category: "Drink",
    description: "Chilled coconut juice"
  },
  {
    id: 10,
    name: "Mango Sticky Rice",
    originalPrice: 3.0,
    promoPrice: 2.4,
    discountPercent: 20,
    image: "https://bing.com/th?id=OSK.a8e12dd5d2ca9d1f5324721083c7beec",
    category: "Dessert",
    description: "Sticky rice with mango and coconut milk"
  },
  {
    id: 11,
    name: "Mango Sticky Rice",
    originalPrice: 3.0,
    promoPrice: 2.4,
    discountPercent: 20,
    image: "https://bing.com/th?id=OSK.a8e12dd5d2ca9d1f5324721083c7beec",
    category: "Dessert",
    description: "Sticky rice with mango and coconut milk"
  },
  
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
  return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
}
