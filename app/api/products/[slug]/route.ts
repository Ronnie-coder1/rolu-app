import { NextResponse } from "next/server";

// Product type
type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  description: string;
  available: boolean;
};

// Mock product data
const products: Product[] = [
  {
    id: "1",
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1580894908361-4f3b7d6a7f5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580894923456-abc123?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580894937890-def456?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    stock: 12,
    category: "Audio",
    description: "Comfortable over-ear headphones with noise cancellation.",
    available: true,
  },
  {
    id: "2",
    slug: "smart-watch",
    name: "Smart Watch",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
      "https://images.unsplash.com/photo-1516574199999-xyz789",
    ],
    stock: 0,
    category: "Wearables",
    description: "Track fitness, heart rate, and notifications on the go.",
    available: false,
  },
  {
    id: "3",
    slug: "jbl-speaker",
    name: "JBL Speaker",
    price: 199.99,
    images: [
      "https://images.unsplash.com/images/I/619BB1ON8+L._AC_SL1500_.jpg",
      "https://images.unsplash.com/photo-1616627467890-ghi123",
    ],
    stock: 4,
    category: "Audio",
    description: "High‑power portable speaker with deep bass.",
    available: true,
  },
  {
    id: "4",
    slug: "gaming-mouse",
    name: "Gaming Mouse",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1616627455564-2a9f6f6f6f6f",
      "https://images.unsplash.com/photo-1616627471234-jkl456",
    ],
    stock: 25,
    category: "Accessories",
    description: "Ergonomic design with customizable RGB lighting.",
    available: true,
  },
  {
    id: "5",
    slug: "laptop",
    name: "Laptop",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1517336723456-mno789",
    ],
    stock: 8,
    category: "Computers",
    description: "Powerful laptop for work and play with sleek design.",
    available: true,
  },
];

// Dynamic GET handler
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}