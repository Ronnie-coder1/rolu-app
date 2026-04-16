// lib/api/products.ts
import { stripe } from "../stripe";

export async function getProductsFromStripe() {
  // Fetch active products
  const products = await stripe.products.list({ active: true, limit: 100 });
  const prices = await stripe.prices.list({ active: true, limit: 100 });

  // Map prices to products
  return products.data.map((product) => {
    const productPrices = prices.data.filter(
      (price) => price.product === product.id
    );

    // Optional: pick default price
    const defaultPrice = productPrices[0];

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      stripePriceId: defaultPrice?.id || "",
      price: defaultPrice?.unit_amount
        ? defaultPrice.unit_amount / 100
        : 0,
      currency: defaultPrice?.currency || "usd",
      metadata: product.metadata,
    };
  });
}