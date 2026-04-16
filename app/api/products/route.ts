// app/api/products/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const products = await stripe.products.list({ active: true, limit: 100 });
    const prices = await stripe.prices.list({ active: true, limit: 100 });

    const data = products.data.map((product) => {
      const productPrice = prices.data.find((p) => p.product === product.id);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        stripePriceId: productPrice?.id || "",
        price: productPrice?.unit_amount ? productPrice.unit_amount / 100 : 0,
        currency: productPrice?.currency || "usd",
        category: product.metadata.category || "Other",
      };
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("Stripe fetch error:", err);
    return NextResponse.json([], { status: 500 });
  }
}