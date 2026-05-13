import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/premium_flooring_hero.png"
          alt="Premium Flooring"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Elevate Your Space with <span className="text-accent">Premium</span> Flooring
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 font-light">
            Discover our curated collection of luxury vinyl, laminate, and hardwood floors designed for modern living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg rounded-full">
              Shop Collections <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white text-white hover:bg-white hover:text-black px-8 h-14 text-lg rounded-full">
              Get Free Estimate
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-10 left-0 w-full z-10 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-white/80 border-t border-white/20 pt-8">
          <div className="flex flex-col">
            <span className="text-accent font-bold text-xl">100%</span>
            <span className="text-sm font-medium uppercase tracking-widest">Quality Assured</span>
          </div>
          <div className="flex flex-col">
            <span className="text-accent font-bold text-xl">24H</span>
            <span className="text-sm font-medium uppercase tracking-widest">Pickup Available</span>
          </div>
          <div className="flex flex-col">
            <span className="text-accent font-bold text-xl">4 States</span>
            <span className="text-sm font-medium uppercase tracking-widest">NJ, NY, PA, CT</span>
          </div>
          <div className="flex flex-col">
            <span className="text-accent font-bold text-xl">Premium</span>
            <span className="text-sm font-medium uppercase tracking-widest">Installer Network</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
