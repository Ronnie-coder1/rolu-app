"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";
import { Star } from "lucide-react";
import ScrollToTop from "@/components/ui/ScrollToTop";
const BATCH_SIZE = 8; // number of products to show per batch

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"All" | string>("All");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts().then((products) => {
      setAllProducts(products);
      setVisibleProducts(products.slice(0, BATCH_SIZE));
    });
  }, []);

  const categories = ["All", "Electronics", "Outfits", "Sneakers", "Hats" ,"Watches"];

  const filteredProducts =
    selectedCategory === "All"
      ? visibleProducts
      : visibleProducts.filter((product) => product.category === selectedCategory);

  const loadMore = () => {
    const currentCount = visibleProducts.length;
    const nextBatch = allProducts.slice(currentCount, currentCount + BATCH_SIZE);
    setVisibleProducts([...visibleProducts, ...nextBatch]);
  };

  const hasMore = selectedCategory === "All"
    ? visibleProducts.length < allProducts.length
    : visibleProducts.filter((p) => p.category === selectedCategory).length <
      allProducts.filter((p) => p.category === selectedCategory).length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        Our Products
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } transition-colors`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <section>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-64 object-contain mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{quickViewProduct.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(quickViewProduct.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {quickViewProduct.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{quickViewProduct.description}</p>
            <p className="text-lg font-bold mb-4">
              ${quickViewProduct.price.toFixed(2)}
            </p>
            <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      )}
       {/* Scroll-to-top button */}
            <ScrollToTop />
    </div>
    
  );
}