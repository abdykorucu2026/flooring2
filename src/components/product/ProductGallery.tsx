"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: { id?: string; url: string }[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(images[0]?.url);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-border/50 flex items-center justify-center text-muted-foreground">
        No image available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-border/50 mb-4 transition-all duration-300">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              onClick={() => setMainImage(img.url)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                mainImage === img.url ? "border-accent opacity-100" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image 
                src={img.url} 
                alt={`${productName} thumbnail ${idx + 1}`} 
                fill 
                className="object-cover" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
