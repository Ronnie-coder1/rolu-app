"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useUser } from "@clerk/nextjs";

/* PAYSTACK GLOBAL TYPE */
declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaystackCheckoutProps {
  total: number;
}

export default function PaystackCheckout({ total }: PaystackCheckoutProps) {
  const { user } = useUser();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  /* PAYMENT HANDLER */
  const startPaystackPayment = () => {
    if (!window.PaystackPop) return alert("Payment system not ready.");
    if (!customerEmail) return alert("Please log in to pay.");
    if (cartItems.length === 0) return alert("Your cart is empty");

    const paystack = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: customerEmail,
      amount: Math.round(total * 100),
      currency: "GHS",
      ref: "ORDER_" + new Date().getTime(),
      callback: (response: any) => {
        saveOrderAfterPayment(response.reference);
      },
      onClose: () => alert("Payment cancelled"),
    });

    paystack.openIframe();
  };

  /* SAVE ORDER AFTER PAYMENT */
  async function saveOrderAfterPayment(reference: string) {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          total,
          reference,
        }),
      });
      const data = await res.json();

      if (data.success) {
        clearCart();
        localStorage.removeItem("my_cart");
        alert("Payment successful");
        router.push("/orders");
      } else {
        alert("Payment succeeded but order failed to save");
      }
    } catch (error) {
      console.error("Order save error:", error);
      alert("Payment succeeded but server error occurred");
    }
  }

  return (
    <button
      onClick={startPaystackPayment}
      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
    >
      Pay with Mobile Money
    </button>
  );
}