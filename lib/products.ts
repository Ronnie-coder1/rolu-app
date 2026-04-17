import { Product, ProductCategory } from "./types";

/**
 * Returns all products
 * Later this can be replaced by a database or API
 */
export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: "prod_1",
      name: "Valentino Garavani",
      image: "/vg.WEBP",
      price: 299.99,
      category: "Outfits" as ProductCategory,
      description: "Premium Valentino Garavani outfit – perfect for stylish occasions.",
      stock: 12,
      rating: 4.8,
      featured: true,
    },
    {
      id: "prod_2",
      name: "JBL Speaker",
      image: "/jbl.jpg",
      price: 2999.99,
      category: "Electronics" as ProductCategory,
      description: "High-quality JBL speaker for immersive sound experience.",
      stock: 8,
      rating: 4.0,
      featured: true,
    },
    {
      id: "prod_3",
      name: "JBL G7x",
      image: "/jblg.jpg",
      price: 3999.99,
      category: "Electronics" as ProductCategory,
      description: "Compact JBL G7x speaker, portable and wireless.",
      stock: 15,
      rating: 4.7,
      featured: false,
    },
    {
      id: "prod_4",
      name: "Hoodie",
      image: "/hoodie.JPG",
      price: 300.99,
      category: "Outfits" as ProductCategory,
      description: "Comfortable and stylish hoodie, perfect for casual wear.",
      stock: 20,
      rating: 4.5,
      featured: false,
    },
    {
      id: "prod_5",
      name: "T-Shirt",
      image: "/T- Shirt.JPG",
      price: 150.99,
      category: "Outfits" as ProductCategory,
      description: "Soft cotton T-Shirt, available in multiple colors.",
      stock: 25,
      rating: 4.3,
      featured: false,
    },
    {
      id: "prod_6",
      name: "CAP",
      image: "/cap.JPG",
      price: 100.99,
      category: "Hats" as ProductCategory,
      description: "Classic baseball cap, adjustable and stylish.",
      stock: 30,
      rating: 4.2,
      featured: false,
    },
  ];
}