"use client";

import { useRef } from "react";

export default function ImageUpload({ setImages }: { setImages: React.Dispatch<React.SetStateAction<string[]>> }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const uploads = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await res.json();
        return data.secure_url as string;
      })
    );

    setImages((prev) => [...prev, ...uploads]);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleUpload}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Upload Images
      </button>
    </div>
  );
}