// /app/api/checkout/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const session_id = url.searchParams.get("session_id");
  if (!session_id) return NextResponse.json({ error: "No session_id" }, { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(session_id);

  return NextResponse.json(session);
}