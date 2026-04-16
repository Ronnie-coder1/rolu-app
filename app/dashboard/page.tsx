"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import CartPage from "@/app/cart/page"; // Enhanced CartPage
import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  if (!isSignedIn)
    return (
      <div className="p-4 text-center text-gray-700">
        Please sign in to access your dashboard.
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Welcome Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
        Welcome back, {user?.firstName}!
      </h1>

      {/* Cart Section */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center md:text-left">
          Your Cart
        </h2>
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <CartPage />
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center md:text-left">
          Recommended Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}