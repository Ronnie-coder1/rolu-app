import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { formatCurrency } from "@/lib/utils";

async function getUserOrders(userId: string) {
  try {
    const response = await fetch(`/api/orders?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export default async function Orders() {
  const { userId } = await auth();
  if (!userId) return <div>Unauthorized</div>;

  const orders = await getUserOrders(userId);

  return (
    <main className="container mx-auto py-8">
      <div className="mb-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">← Back to Dashboard</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {orders.map((order: typeof orders[0]) => (
        <div key={order.id} className="border p-4 mb-4">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: {formatCurrency(order.totalAmount)}</p>
        </div>
      ))}
    </main>
  );
}