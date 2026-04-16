"use client";

import { useEffect, useState } from "react";

export default function AdminHome() {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Products</h2>
          <p className="text-xl">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Orders</h2>
          <p className="text-xl">{stats.totalOrders}</p>
        </div>
      </div>
    </div>
  );
}