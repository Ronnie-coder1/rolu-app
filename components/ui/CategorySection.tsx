"use client";

import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    image: "/categories/electronics.jpg",
  },
  {
    name: "Sneakers",
    image: "/categories/sneakers.jpg",
  },
  {
    name: "Outfits",
    image: "/categories/outfits.jpg",
  },
  {
    name: "Watches",
    image: "/categories/watches.jpg",
  },
];

export default function CategorySection() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${cat.name}`}
            className="relative rounded-xl overflow-hidden group shadow hover:shadow-lg transition"
          >

            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

              <span className="text-white text-lg font-bold">
                {cat.name}
              </span>

            </div>

          </Link>
        ))}

      </div>
    </section>
  );
}