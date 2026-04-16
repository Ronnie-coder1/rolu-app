// components/admin/ProductInventory.tsx
"use client";

import { Product } from "@/types/product";
import { useState } from "react";

export default function ProductInventory({
  products,
}: {
  products: Product[];
}) {
  const [stockData, setStockData] = useState(products);

  const updateStock = (id: string, stock: number) => {
    setStockData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock } : p))
    );
    // TODO: Call API to persist stock update
  };

  return (
    <div className="space-y-4">
      {stockData.map((p) => (
        <div
          key={p.id} // ✅ stable keys
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{p.name}</p>
            <p>Price: ${p.price}</p>
          </div>
          <input
            type="number"
            value={p.stock ?? 0}
            onChange={(e) => updateStock(p.id, Number(e.target.value))}
            className="w-20 border px-2 py-1 rounded"
          />
        </div>
      ))}
    </div>
  );
}