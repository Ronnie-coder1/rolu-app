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
}

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();

        if (data.success) {
          const dbOrders: Order[] = data.orders;

          // Combine cart items as a "pending order" at the top
          if (cartItems.length > 0) {
            const cartTotal = cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            const pendingOrder: Order = {
              id: "pending_cart",
              total: cartTotal,
              items: cartItems,
              paymentRef: "Pending Payment",
            };

            setOrders([pendingOrder, ...dbOrders]);
          } else {
            setOrders(dbOrders);
          }
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    fetchOrders();
  }, [cartItems]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-5">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">
                  {order.id === "pending_cart" ? "Pending Cart" : order.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold">GH₵{order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-semibold">
                  {order.paymentRef || "Pending"}
                </p>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              {order.items.map((item: OrderItem, idx: number) => (
                <div
                  key={item.id || idx}
                  className="flex justify-between text-sm"
                >
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