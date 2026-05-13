import React from "react";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, Clock, Package } from "lucide-react";
import Link from "next/link";
import ProductCalculator from "@/components/product/ProductCalculator";
import ProductGallery from "@/components/product/ProductGallery";

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
      variants: true,
    },
  });

  if (!product) {
    return <div className="container mx-auto py-24 text-center">Product not found</div>;
  }

  const price = product.variants[0]?.price || 0;

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category.slug}`}>{product.category.name}</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info & Configurator */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <div className="bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-4">
                {product.brand} — {product.collection}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${price.toFixed(2)}</span>
                  <span className="text-muted-foreground text-lg ml-2">/sqft</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 font-medium">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  In Stock
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Calculator Component (Client Side) */}
              <ProductCalculator price={price} productName={product.name} />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-grow bg-primary text-white h-16 text-lg rounded-2xl gap-3">
                  <ShoppingCart size={24} /> Add to Cart
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="w-16 h-16 rounded-2xl border-border hover:text-accent">
                    <Heart size={24} />
                  </Button>
                  <Button variant="outline" size="icon" className="w-16 h-16 rounded-2xl border-border hover:text-accent">
                    <Share2 size={24} />
                  </Button>
                </div>
              </div>

              {/* SKU & Short Description */}
              <div className="pt-8 border-t space-y-4">
                {product.variants[0]?.sku && (
                  <div className="text-sm">
                    <span className="text-muted-foreground font-medium uppercase tracking-wider mr-2">SKU:</span>
                    <span className="font-mono">{product.variants[0].sku}</span>
                  </div>
                )}
                {product.description && (
                  <div className="prose prose-sm text-muted-foreground leading-relaxed italic">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Product Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <ShieldCheck className="text-accent" size={20} />
                  <span>Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Truck className="text-accent" size={20} />
                  <span>Curbside Delivery Available</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Clock className="text-accent" size={20} />
                  <span>Next Day Pickup Ready</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Package className="text-accent" size={20} />
                  <span>10% Extra Recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs Section */}
        {product.specs && (
          <div className="mt-24 pt-24 border-t">
            <h2 className="text-3xl font-bold mb-12">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
              {Object.entries(JSON.parse(product.specs as string)).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground font-medium uppercase tracking-wider">{key}</span>
                  <span className="font-bold text-right">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


