import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <Link href="/admin/inventory"><Button variant="ghost">Inventory</Button></Link>
      <Link href="/admin/analytics"><Button variant="ghost">Analytics</Button></Link>
      <Link href="/admin/orders"><Button variant="ghost">Orders</Button></Link>
    </aside>
  );
}