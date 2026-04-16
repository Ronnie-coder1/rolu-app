"use client";

import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("my_cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach((item: any) => addItem(item));
    }
  }, [addItem]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!userName || !email || !phone) {
      alert("Please fill all your details.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, phone, items: cart, total: totalPrice }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("Order failed:", data);
        alert("Order failed. See console for details.");
        setLoading(false);
        return;
      }

      clearCart();
      router.push(`/order/confirmation?orderId=${data.orderId}`);
    } catch (err) {
      console.error("Order error:", err);
      alert("Order failed. See console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column: Cart items */}
          <div>
            {/* Clear Cart Button */}
            {cart.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear the cart?")) {
                      clearCart();
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            )}

            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">
                        ${item.price} x {item.quantity} = ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseItem(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addItem({ ...item, quantity: 1 })}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="mt-4 flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Right column: User info + instructions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Your Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mb-3 p-3 border rounded focus:outline-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-3 border rounded focus:outline-blue-500"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 p-3 border rounded focus:outline-blue-500"
            />

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold mt-3 ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            {/* Mobile Money Instructions */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
              <h3 className="font-semibold mb-2">Payment Instructions</h3>
              <p>After placing the order, we will contact you to confirm payment via:</p>
              <ul className="list-disc ml-5 mt-2">
                <li>Telecel Cash</li>
                <li>MTN Mobile Money</li>
                <li>Tigo Cash</li>
              </ul>
              <p className="mt-2">
                You will receive a confirmation email or call with instructions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}