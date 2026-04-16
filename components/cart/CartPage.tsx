"use client";

import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import PaystackCheckout from "@/components/checkout/PaystackCheckout";

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 bg-orange-500 text-white px-5 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-3">

          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Clear Cart
            </button>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">

                {item.image && (
                  <img
                    src={item.image}
                    className="w-14 h-14 object-cover rounded"
                  />
                )}

                <div>
                  <p className="font-medium text-sm">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    ${item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() => decreaseItem(item.id)}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>

                <span className="text-sm">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    addItem({ ...item, quantity: 1 })
                  }
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>

              </div>

              <p className="text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="border rounded-lg p-5 h-fit">

          <h2 className="font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">
              ${total.toFixed(2)}
            </span>
          </div>

          <PaystackCheckout />

        </div>
      </div>
    </div>
  );
}