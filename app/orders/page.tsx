// /components/checkout/PaystackCheckout.tsx
"use client";

import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaystackCheckout() {
  const cart = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);

  // Total in GHS
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payWithPaystack = async () => {
    if (!window.PaystackPop) {
      alert("Payment system not ready. Please refresh.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create order in your DB first
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert("Failed to create order. Try again.");
        setLoading(false);
        return;
      }

      const orderId = data.orderId;

      // 2️⃣ Setup Paystack
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: "customer@email.com", // You can replace with user email from auth
        amount: Math.round(total * 100), // in kobo
        currency: "GHS",
        ref: orderId, // use order ID as reference
        callback: function (response: any) {
          alert("Payment successful! Ref: " + response.reference);

          // Clear cart after successful payment
          clearCart();

          // Redirect to order history page
          window.location.href = "/orders";
        },
        onClose: function () {
          alert("Payment window closed.");
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("Paystack error:", err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={payWithPaystack}
      disabled={loading}
      className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing Payment..." : "Pay with Mobile Money"}
    </button>
  );
}