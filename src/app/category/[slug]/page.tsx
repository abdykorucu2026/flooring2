import React from "react";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, ChevronDown } from "lucide-react";

const prisma = new PrismaClient();

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
    },
  });

  if (!category) {
    return <div className="container mx-auto py-24 text-center text-2xl">Category not found</div>;
  }

  // Fetch products from this category and all immediate children
  const categoryIds = [category.id, ...category.children.map(child => child.id)];
  
  const products = await prisma.product.findMany({
    where: {
      categoryId: { in: categoryIds }
    },
    include: {
      images: true,
      variants: true,
    }
  });

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Category Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-primary-foreground/70 font-light max-w-2xl">
            Explore our premium selection of {category.name.toLowerCase()} for your next project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                  Subcategories <ChevronDown size={18} />
                </h3>
                <div className="space-y-2">
                  {category.children.map((child) => (
                    <Link 
                      key={child.id} 
                      href={`/category/${child.slug}`}
                      className="block text-muted-foreground hover:text-accent transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                  Filter by Brand <ChevronDown size={18} />
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent" />
                    <span>MSI</span>
                  </label>
                  <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent" />
                    <span>FloorPlus</span>
                  </label>
                  <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent" />
                    <span>NextGen</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
              <p className="text-muted-foreground">Showing {products.length} products</p>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter size={16} /> Sort by <ChevronDown size={14} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/product/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 bg-gray-100">
                    {product.images[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {product.brand}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
                      {product.collection} Collection
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold">${product.variants[0]?.price.toFixed(2)}</span>
                        <span className="text-muted-foreground text-sm ml-1">/sqft</span>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-accent hover:text-white transition-colors">
                        <ShoppingCart size={20} />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
