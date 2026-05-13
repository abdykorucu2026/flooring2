"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, Menu, X, ShoppingCart, Globe } from "lucide-react";

const Facebook = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full relative">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:2014687593" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone size={14} />
              <span>201-468-7593</span>
            </a>
            <div className="hidden sm:flex items-center gap-1">
              <MapPin size={14} />
              <span>278 Lanza Ave Garfield NJ 07026</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://wa.me/12014687593" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                <MessageCircle size={16} />
                <span className="hidden xs:inline text-xs">WhatsApp</span>
              </a>
            </div>
            <div className="h-4 w-px bg-primary-foreground/20 mx-1" />
            <button className="flex items-center gap-1 hover:text-accent transition-colors">
              <Globe size={14} />
              <span>EN / ES</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav 
        className={cn(
          "w-full transition-all duration-300 z-50",
          isScrolled 
            ? "fixed top-0 left-0 bg-background/95 backdrop-blur-md shadow-md py-3" 
            : "bg-background py-5"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            ABBY<span className="text-accent">FLOOR</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            <Link href="/category/vinyl" className="hover:text-accent transition-colors">Vinyl</Link>
            <Link href="/category/laminate" className="hover:text-accent transition-colors">Laminate</Link>
            <Link href="/category/hardwood" className="hover:text-accent transition-colors">Hardwood</Link>
            <Link href="/category/engineered-wood" className="hover:text-accent transition-colors">Engineered</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Button variant="outline" className="hidden sm:inline-flex border-accent text-accent hover:bg-accent hover:text-white">
              Get a Quote
            </Button>
            <button 
              className="lg:hidden p-2 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-background border-t shadow-xl transition-all duration-300 origin-top",
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        )}>
          <div className="flex flex-col p-6 gap-4 font-medium">
            <Link href="/category/vinyl" onClick={() => setIsMobileMenuOpen(false)}>Vinyl Flooring</Link>
            <Link href="/category/laminate" onClick={() => setIsMobileMenuOpen(false)}>Laminate Flooring</Link>
            <Link href="/category/hardwood" onClick={() => setIsMobileMenuOpen(false)}>Hardwood Flooring</Link>
            <Link href="/category/engineered-wood" onClick={() => setIsMobileMenuOpen(false)}>Engineered Wood</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Button className="w-full mt-4 bg-accent hover:bg-accent/90">Request Estimate</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
