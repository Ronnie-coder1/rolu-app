import { prisma } from "@/lib/prisma";

export default async function OrderPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Order History
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 shadow-sm bg-white"
            >
              {/* Order header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <p className="font-semibold">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-2 md:mt-0 font-bold text-orange-500">
                  ${order.total.toFixed(2)}
                </div>
              </div>

              {/* Order items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border rounded p-3"
                  >
                    <span>{item.name}</span>

                    <span className="text-gray-600">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}