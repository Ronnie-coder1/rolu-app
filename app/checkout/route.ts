import Stripe from "stripe";
router.push("/order/confirmation");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate
    for (const item of items) {
      if (!item.stripePriceId || !item.quantity) {
        return Response.json(
          { error: "Invalid cart item" },
          { status: 400 }
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item: any) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err.message);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
