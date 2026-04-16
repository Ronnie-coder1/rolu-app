// lib/api/orders.ts

export type Order = {
  id: string;
  userId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
};

// For now, mock some orders. Later you can connect to a database.
const mockOrders: Order[] = [
  {
    id: "101",
    userId: "user_123",
    status: "pending",
    total: 89.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "102",
    userId: "user_123",
    status: "shipped",
    total: 199.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "103",
    userId: "user_456",
    status: "processing",
    total: 59.99,
    createdAt: new Date().toISOString(),
  },
];

// Fetch orders for a given user
export async function getUserOrders(userId: string): Promise<Order[]> {
  // Replace with DB query later
  return mockOrders.filter((order) => order.userId === userId);
}

// Fetch all orders (for admin)
export async function getAllOrders(): Promise<Order[]> {
  return mockOrders;
}
