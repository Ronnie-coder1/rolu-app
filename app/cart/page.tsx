"use client";

import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PaystackCheckout from "@/components/checkout/PaystackCheckout";

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const setCart = useCartStore((state) => state.setCart);

  const router = useRouter();

  /* LOAD CART FROM LOCALSTORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("my_cart");

    if (stored) {
      const parsed = JSON.parse(stored);
      setCart(parsed);
    }
  }, [setCart]);

  /* CALCULATE TOTAL */
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mb-6">
          Looks like you haven't added any products yet.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2">

          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                if (confirm("Clear all items from cart?")) clearCart();
              }}
              className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>

          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">

                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-gray-500 text-sm">
                      GH₵{item.price} × {item.quantity}
                    </p>

                    <p className="font-semibold">
                      GH₵{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                </div>

                {/* QUANTITY BUTTONS */}
                <div className="flex items-center gap-3 mt-3 sm:mt-0">

                  <button
                    onClick={() => decreaseItem(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                      })
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>

                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white border rounded-lg p-6 shadow-sm h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-6 text-lg font-semibold">
            <span>Total</span>
            <span>GH₵{totalPrice.toFixed(2)}</span>
          </div>

          {/* PAYSTACK */}
          <PaystackCheckout total={totalPrice} />

          <div className="mt-6 bg-green-50 p-4 rounded-lg text-sm text-green-800">
            <h4 className="font-semibold mb-2">
              Payment Methods
            </h4>

            <ul className="list-disc ml-5 space-y-1">
              <li>MTN Mobile Money</li>
              <li>Telecel Cash</li>
              <li>AirtelTigo Money</li>
            </ul>

            <p className="mt-2">
              Secure payments powered by Paystack.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}