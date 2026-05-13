import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Vinyl Flooring",
    slug: "vinyl",
    image: "/images/category_vinyl.png",
    description: "Waterproof and durable luxury vinyl planks for any room."
  },
  {
    title: "Laminate Flooring",
    slug: "laminate",
    image: "/images/category_laminate.png",
    description: "Realistic wood looks with superior scratch resistance."
  },
  {
    title: "Hardwood Flooring",
    slug: "hardwood",
    image: "/images/category_hardwood.png",
    description: "Timeless beauty and value with solid natural wood."
  },
  {
    title: "Engineered Wood",
    slug: "engineered-wood",
    image: "/images/category_engineered.png",
    description: "Premium real wood veneer with enhanced stability."
  }
];

const CategoryCards = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Collections</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Quality flooring for every style and budget. Choose from our hand-picked categories to find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-border/50"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-auto flex items-center text-accent font-semibold gap-2 group-hover:translate-x-2 transition-transform duration-300">
                  Shop Now <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
