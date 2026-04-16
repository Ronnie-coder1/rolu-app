"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i)
        stars.push(<FaStar key={i} className="text-yellow-400 inline-block" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 inline-block" />);
      else
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline-block" />);
    }
    return stars;
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 relative">
      
      {/* Featured badge */}
      {product.featured && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">
          Featured
        </div>
      )}

      {/* Product image (only this triggers quick view) */}
      <img
        src={product.image}
        alt={product.name}
        onClick={onQuickView}
        className="w-full h-48 object-contain p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
      />

      {/* Product info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {renderStars(product.rating ?? 0)}
        </div>

        {/* Price */}
        <p className="font-bold text-xl">
          GH₵{Number(product.price).toFixed(2)}
        </p>

        {/* Add to cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem({ ...product, quantity: 1 });
          }}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}