"use client";

type Order = {
  id: string;
  status: string;
  total: number;
  customer?: string;
  createdAt?: string;
};

export function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">Order #{order.id}</p>
            {order.customer && (
              <p className="text-gray-600">Customer: {order.customer}</p>
            )}
            {order.createdAt && (
              <p className="text-gray-500 text-sm">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            )}
            <p>Status: {order.status}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
          </div>

          {/* Example status update form */}
          <form className="flex items-center space-x-2">
            <select
              defaultValue={order.status}
              className="border rounded px-2 py-1"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
