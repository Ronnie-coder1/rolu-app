import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

// 1. Updated Schema to include Category
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(1, "Price must be at least 1 GHS"),
  rating: z.number().min(1).max(5),
  category: z.string().min(1, "Category is required"), // Added this
  images: z.array(z.string()).min(1, "At least one image required"),
});

export async function POST(req: Request) {
  try {
    // 2. Await auth() - required for Next.js 15+
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Admin Check
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    // 4. Save to Database with Category
    const product = await prisma.product.create({
      data: {
        title: parsed.data.title,
        price: parsed.data.price,
        rating: parsed.data.rating,
        category: parsed.data.category, // Added this
        images: parsed.data.images,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Admin Product API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create product" }, 
      { status: 500 }
    );
  }
}
