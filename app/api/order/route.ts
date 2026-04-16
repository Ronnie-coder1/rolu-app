import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items, total, reference, pending = true } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items in order" },
        { status: 400 }
      );
    }

    // Check if this order already exists by reference
    const existingOrder = await prisma.order.findUnique({
      where: { paymentRef: reference },
    });

    if (existingOrder) {
      // Update pending order to paid
      const updatedOrder = await prisma.order.update({
        where: { paymentRef: reference },
        data: { pending: false },
      });

      return NextResponse.json({
        success: true,
        message: "Order marked as paid",
        orderId: updatedOrder.id,
      });
    }

    // Create new order (pending or paid)
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total,
        paymentRef: reference,
        pending,
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
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { success: false, error: "Order creation failed" },
      { status: 500 }
    );
  }
}