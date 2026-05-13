import Hero from "@/components/homepage/Hero";
import CategoryCards from "@/components/homepage/CategoryCards";
import Features from "@/components/homepage/Features";
import PolicyNotice from "@/components/homepage/PolicyNotice";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryCards />
      <Features />
      <PolicyNotice />
      
      {/* WhatsApp CTA Section */}
      <section className="py-24 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Quote?</h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto font-light">
            Chat with our flooring experts on WhatsApp for instant pricing and stock availability.
          </p>
          <a href="https://wa.me/12014687593" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#1fb355] text-white px-10 h-16 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
              <MessageCircle className="mr-3" size={24} />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
