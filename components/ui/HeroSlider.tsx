"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "Welcome to Rolu",
    subtitle: "Discover the best outfits, electronics and sneakers",
    image: "/banner1.jpg",
  },
  {
    title: "Premium Fashion",
    subtitle: "Upgrade your style today",
    image: "/banner2.jpg",
  },
  {
    title: "Latest Electronics",
    subtitle: "Smart tech for modern living",
    image: "/banner3.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden rounded-xl mb-10">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-2xl sm:text-4xl font-bold">{slide.title}</h2>
            <p className="mt-2 text-sm sm:text-lg">{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}