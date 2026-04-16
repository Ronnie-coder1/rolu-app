"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <motion.div
        key={selected}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md aspect-square relative rounded-lg overflow-hidden border mx-auto"
      >
        <Image
          src={images[selected]}
          alt={`Product image ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`relative aspect-square rounded border overflow-hidden ${
              selected === idx ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              sizes="100px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
