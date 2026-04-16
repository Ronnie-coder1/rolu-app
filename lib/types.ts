export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;        // display only
  stripePriceId: string; // must match Stripe price ID
};

export type CartItem = {
  productId: string;
  stripePriceId: string;
  name: string;
  price: number;
  quantity: number;
};
