import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ received: false }, { status: 400 });
  }

  // Only act on successful payments
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const cartItems = JSON.parse(session.metadata?.cart || "[]");

    if (!userId || !cartItems.length) {
      console.error("Webhook missing userId or cart items", session.metadata);
      return NextResponse.json({ received: false }, { status: 400 });
    }

    try {
      const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );

      // Save order in Prisma
      await prisma.order.create({
        data: {
          userId,
          total,
          items: {
            create: cartItems.map((item: any) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      console.log("Order saved successfully for user:", userId);
    } catch (err) {
      console.error("Failed to save order in Prisma:", err);
    }
  }

  return NextResponse.json({ received: true });
}