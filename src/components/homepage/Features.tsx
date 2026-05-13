import React from "react";
import { Truck, Clock, ShieldCheck, Map, Ruler, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Truck className="text-accent" size={32} />,
    title: "Fast Delivery",
    description: "Available within NJ, NY, PA, CT in 2 business days."
  },
  {
    icon: <Clock className="text-accent" size={32} />,
    title: "Next-Day Pickup",
    description: "Orders before 5PM available next day (3PM - 5PM)."
  },
  {
    icon: <ShieldCheck className="text-accent" size={32} />,
    title: "Premium Quality",
    description: "Only the finest materials from trusted manufacturers."
  },
  {
    icon: <Ruler className="text-accent" size={32} />,
    title: "Free Estimates",
    description: "Contact us for professional measurements and quotes."
  },
  {
    icon: <Map className="text-accent" size={32} />,
    title: "Regional Coverage",
    description: "Serving the Tri-State area with dedicated service."
  },
  {
    icon: <CreditCard className="text-accent" size={32} />,
    title: "Secure Payments",
    description: "Support for Credit Cards, Zelle, and flexible options."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose ABBY FLOOR</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            We combine premium products with exceptional service to ensure your flooring project is a success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6 p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
