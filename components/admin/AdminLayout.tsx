// components/admin/AdminLayout.tsx
import { auth } from "@clerk/nextjs/server";
import { PrismaClient, Role } from "@prisma/client";
import AdminSidebar from "./AdminSidebar";

const prisma = new PrismaClient();

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) return <div className="p-8 text-red-600">Access Denied</div>;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.role !== Role.ADMIN)
    return <div className="p-8 text-red-600">Access Denied</div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}