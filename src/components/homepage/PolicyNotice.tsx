import React from "react";
import { Info, AlertCircle, Package, Truck } from "lucide-react";

const PolicyNotice = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Pickup Policy */}
          <div className="p-12 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-primary-foreground/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-accent p-3 rounded-xl">
                <Package className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold">Pickup Policy</h2>
            </div>
            <p className="text-xl mb-6 text-primary-foreground/90 leading-relaxed">
              Orders placed before <span className="text-accent font-bold">5:00 PM (ET)</span> will be available for pickup the next day.
            </p>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="font-bold text-accent mb-2 uppercase tracking-wider text-sm">Pickup Window</h3>
              <p className="text-2xl font-medium">3:00 PM — 5:00 PM</p>
            </div>
          </div>

          {/* Delivery Policy */}
          <div className="p-12 lg:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-accent p-3 rounded-xl">
                <Truck className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold">Delivery Coverage</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-center font-bold text-lg">New Jersey</div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-center font-bold text-lg">New York</div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-center font-bold text-lg">Pennsylvania</div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-center font-bold text-lg">Connecticut</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-primary-foreground/80">
                <Info className="text-accent shrink-0 mt-1" size={20} />
                <p>Estimated delivery time: <span className="text-white font-medium">Within 2 business days.</span></p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-xl border border-accent/20">
                <AlertCircle className="text-accent shrink-0" size={20} />
                <div className="text-sm">
                  <p className="font-bold text-white mb-1">Curbside Delivery Only</p>
                  <p className="opacity-80">No indoor delivery or carrying materials inside homes or businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyNotice;
