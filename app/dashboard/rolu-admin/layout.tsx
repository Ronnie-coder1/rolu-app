"use client";

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <Link href="/" className="font-bold">Rolu. Site</Link>
        <div>
          <Link href="/dashboard/rolu-admin" className="mr-4">Dashboard</Link>
          <Link href="/dashboard/rolu-admin/products">Products</Link>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}