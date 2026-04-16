"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id} // ✅ unique key
            className="bg-white rounded-xl shadow p-4"
          >
            {/* Clickable Image */}
            <img
              src={product.image}
              alt={product.name}
              onClick={() => setSelectedImage(product.image)}
              className="w-full h-64 object-cover rounded-lg cursor-pointer
                hover:scale-105 transition duration-300 ease-in-out"
            />

            {/* Product Info */}
            <h2 className="mt-3 font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>

            {/* Add to Cart */}
            <button
              onClick={() =>
                addItem({ ...product, quantity: 1 })
              }
              className="mt-2 w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl animate-[zoomIn_0.25s_ease]"
          />
        </div>
      )}
    </div>
  );
}