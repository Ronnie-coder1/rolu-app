import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {

  try {

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { reference, items, total } = body;

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Missing payment reference" },
        { status: 400 }
      );
    }

    /* VERIFY PAYMENT WITH PAYSTACK */

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackRes.json();

    if (paystackData.data.status !== "success") {
      return NextResponse.json(
        { success: false, message: "Payment not verified" },
        { status: 400 }
      );
    }

    /* SAVE ORDER */

    const order = await prisma.order.create({
      data: {
        userId,
        total,

        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });

  } catch (error) {

    console.error("Paystack verification error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );

  }
}