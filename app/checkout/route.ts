import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, amount } = await req.json();

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url: `${process.env.NEXT_PUBLIC_URL}/order/confirmation`,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      url: data.data.authorization_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Paystack checkout failed" },
      { status: 500 }
    );
  }
}