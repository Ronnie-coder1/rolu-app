// types/product.ts

export type ProductCategory = "Electronics" | "Outfits" | "Sneakers" | "Hats" | "Watches";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;

  category: ProductCategory;

  // NEW fields
  description?: string;
  stock?: number;
  rating?: number;     // e.g., 4.5 out of 5
  featured?: boolean;  // highlight premium products
}