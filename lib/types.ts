export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
  description?: string;
  rating?: number;
  stock?: number;
  featured?: boolean;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};