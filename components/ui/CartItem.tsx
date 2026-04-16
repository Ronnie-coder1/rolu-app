"use client";

import { CartItemType, useCartStore } from "@/stores/cartStore";

export function CartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">
          {item.quantity} × ${item.price}
        </p>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
