import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-6 mb-6 shadow-sm"
        >
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Order #{order.id}</p>

            <p className="text-orange-500 font-bold">
              ${order.total.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-500 text-sm mb-3">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border p-2 rounded"
              >
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}