"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";

interface Props {
  products: Product[];
}

export default function ProductCarousel({ products }: Props) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🔥 Trending Products
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="min-w-[220px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}