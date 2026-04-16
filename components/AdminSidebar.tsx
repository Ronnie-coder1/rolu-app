import Link from "next/link";

export function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li><Link href="/admin/analytics">Analytics</Link></li>
        <li><Link href="/admin/inventory">Inventory</Link></li>
        <li><Link href="/admin/orders">Orders</Link></li>
      </ul>
    </div>
  );
}
