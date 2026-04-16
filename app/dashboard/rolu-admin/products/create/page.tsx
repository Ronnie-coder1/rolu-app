"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

const CATEGORIES = ["Outfits", "Electronics", "Cap", "Watches", "Sneakers"];

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    rating: 5,
    category: CATEGORIES[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Please upload at least one image");

    setLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({ ...formData, images }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create product");

      toast.success("Product created successfully!");
      router.push("/dashboard/rolu-admin/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Product Title</label>
          <input
            required
            type="text"
            placeholder="e.g. Vintage Leather Watch"
            className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-black outline-none transition"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Category</label>
          <select
            className="w-full border p-2.5 rounded-md bg-white focus:ring-2 focus:ring-black outline-none transition cursor-pointer"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price & Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Price (GHS)</label>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-black outline-none transition"
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-black outline-none transition"
              defaultValue={5}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Image Upload & Preview Section */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 text-center">
          <label className="block mb-4 font-semibold text-gray-700">Product Images</label>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              {images.map((url, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-md border shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ✅ Cloudinary ImageUpload — works on localhost, no ngrok needed */}
          <ImageUpload setImages={setImages} />

          <p className="mt-3 text-xs text-gray-500">
            JPG, PNG or WebP up to 4MB.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || images.length === 0}
          className="w-full bg-black text-white py-4 rounded-md font-bold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Product...
            </span>
          ) : (
            "Save Product"
          )}
        </button>
      </form>
    </div>
  );
}