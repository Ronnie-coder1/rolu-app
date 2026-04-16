// app/admin/analytics/page.tsx
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

const prisma = new PrismaClient();

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export default async function AnalyticsPage() {
  const { userId } = await auth();
  if (!userId) return <div>Access Denied</div>;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.role !== Role.ADMIN) return <div>Access Denied</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Analytics</h1>
      <AnalyticsCharts />
    </div>
  );
}