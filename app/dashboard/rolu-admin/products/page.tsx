"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  images: string[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/dashboard/rolu-admin/products/create" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </Link>
      </div>
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="flex justify-between bg-white p-4 rounded shadow">
            <div>
              <p className="font-semibold">{p.title}</p>
              <p>₵{p.price.toFixed(2)}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/dashboard/rolu-admin/products/${p.id}/edit`} className="text-blue-600">Edit</Link>
              <Link href={`/dashboard/rolu-admin/products/${p.id}/delete`} className="text-red-600">Delete</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}