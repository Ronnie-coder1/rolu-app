import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/products";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSlider from "@/components/ui/HeroSlider";
import PromoBanner from "@/components/ui/PromoBanner";
import FeaturedProducts from "@/components/ui/FeaturedProducts";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { Phone, Mail, MapPin } from "lucide-react";
import CategorySection from "@/components/ui/CategorySection";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>

      {/* PROMO BANNER */}
      <PromoBanner />

      <div className="container mx-auto px-4 sm:px-4 lg:px-10 py-8">

        {/* HERO SLIDER */}
        <HeroSlider />


<CategorySection />

<ProductCarousel products={products.slice(0, 8)} />
       

        {/* FEATURED PRODUCTS */}
        <FeaturedProducts products={products} />

        {/* ALL PRODUCTS GRID */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            All Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 mt-12 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-orange-500">Rolu.</h2>

            <p className="text-gray-600">
              Premium shopping experience for clothing, electronics, and more.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-2 justify-center md:justify-start">

              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-orange-400" />
                +233 509 419 901
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5 text-orange-400" />
                support@rolu.com
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-orange-400" />
                Accra, Ghana
              </div>

            </div>
          </div>

          <div className="text-center md:text-right text-gray-500 mt-4 md:mt-0">
            © {new Date().getFullYear()}{" "}
            <span className="text-orange-400 font-semibold">Rolu.</span>
            All rights reserved.
          </div>

        </div>
      </footer>

      <ScrollToTop />

    </main>
  );
}