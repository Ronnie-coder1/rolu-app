"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";

interface OrderItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id?: string;
  total: number;
  items: OrderItem[];
  paymentRef?: string;
  createdAt?: string;
  status?: "pending" | "paid";
}

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const cartItems = useCartStore((state) => state.items);

  /* Fetch user orders from API */
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }
    fetchOrders();
  }, []);

  /* Combine current cart items as a pending order */
  const pendingOrder: Order | null =
    cartItems.length > 0
      ? {
          id: "pending",
          total: cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          items: cartItems,
          status: "pending",
        }
      : null;

  const displayOrders = pendingOrder ? [pendingOrder, ...orders] : orders;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {displayOrders.length === 0 && <p>No orders yet.</p>}

      <div className="space-y-5">
        {displayOrders.map((order) => (
          <div
            key={order.id || "pending"}
            className="border rounded-lg p-5"
          >
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">
                  {order.status === "pending" ? "Pending Order" : order.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold">
                  GH₵{order.total.toFixed(2)}
                </p>
              </div>

              {order.status === "pending" && (
                <div>
                  <p className="text-sm text-yellow-700 font-semibold">
                    Pending Payment
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-3 space-y-2">
              {order.items.map((item, idx) => (
                <div key={item.id || idx} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>GH₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}