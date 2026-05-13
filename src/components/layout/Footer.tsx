import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Globe, Camera } from "lucide-react";

const Facebook = ({ size = 20 }: { size?: number }) => (
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

const Instagram = ({ size = 20 }: { size?: number }) => (
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

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
              ABBY<span className="text-accent">FLOOR</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-xs">
              Premium flooring solutions for your home and business. Modern, clean, and durable floors delivered to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-primary-foreground/70">
              <li><Link href="/category/vinyl" className="hover:text-accent transition-colors">Vinyl Flooring</Link></li>
              <li><Link href="/category/laminate" className="hover:text-accent transition-colors">Laminate Flooring</Link></li>
              <li><Link href="/category/hardwood" className="hover:text-accent transition-colors">Hardwood Flooring</Link></li>
              <li><Link href="/category/engineered-wood" className="hover:text-accent transition-colors">Engineered Wood</Link></li>
            </ul>
          </div>

          {/* Policy & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Policy & Support</h3>
            <ul className="space-y-4 text-primary-foreground/70">
              <li><Link href="/policy" className="hover:text-accent transition-colors">Delivery & Pickup Policy</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 text-accent" />
                <span>278 Lanza Ave, Garfield, NJ 07026</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-accent" />
                <a href="tel:2014687593" className="hover:text-accent transition-colors">201-468-7593</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-accent" />
                <a href="mailto:info@abbyfloor.com" className="hover:text-accent transition-colors">info@abbyfloor.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} ABBY FLOOR. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
