// app/admin/inventory/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/AdminSidebar";

export default async function InventoryPage() {
  const { userId } = auth();
  if (!userId) return <div>Access Denied</div>;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") return <div>Access Denied</div>;

  const products = await prisma.product.findMany();

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Inventory</h1>
        {products.map((p) => (
          <p key={p.id}>{p.name} - Stock: {p.stock}</p>
        ))}
      </main>
    </div>
  );
}