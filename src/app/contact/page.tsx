"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <div className="relative py-24 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-[#c9a96e] text-sm font-semibold tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair mb-6">
            Contact <span className="text-[#c9a96e]">Us</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? Our flooring experts are here to help you find the perfect solution for your home or project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Store Location */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#c9a96e]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
                <MapPin className="w-6 h-6 text-[#c9a96e]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Our Showroom</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                123 Flooring Avenue<br />
                Edison, NJ 08817<br />
                United States
              </p>
            </div>

            {/* Phone */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#c9a96e]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
                <Phone className="w-6 h-6 text-[#c9a96e]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Phone & WhatsApp</h3>
              <a href="tel:+17321234567" className="text-gray-400 text-sm hover:text-[#c9a96e] transition-colors block">
                +1 (732) 123-4567
              </a>
              <p className="text-gray-600 text-xs mt-1">WhatsApp available</p>
            </div>

            {/* Email */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#c9a96e]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
                <Mail className="w-6 h-6 text-[#c9a96e]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email Us</h3>
              <a href="mailto:info@abbyfloor.com" className="text-gray-400 text-sm hover:text-[#c9a96e] transition-colors block">
                info@abbyfloor.com
              </a>
              <p className="text-gray-600 text-xs mt-1">We reply within 24 hours</p>
            </div>

            {/* Hours */}
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#c9a96e]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
                <Clock className="w-6 h-6 text-[#c9a96e]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Showroom Hours</h3>
              <div className="space-y-2">
                {[
                  { day: "Mon – Fri", hours: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{day}</span>
                    <span className={`text-xs font-medium ${hours === "Closed" ? "text-red-400" : "text-[#c9a96e]"}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-gradient-to-br from-[#c9a96e]/10 to-[#c9a96e]/5 border border-[#c9a96e]/20 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#c9a96e]" />
                Service Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {["New Jersey", "New York", "Pennsylvania", "Connecticut"].map(state => (
                  <span key={state} className="bg-[#c9a96e]/10 text-[#c9a96e] text-xs px-3 py-1 rounded-full border border-[#c9a96e]/20">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-3">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm">
                    Thank you for reaching out. One of our flooring experts will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-8 text-[#c9a96e] text-sm underline underline-offset-4 hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-white font-bold text-2xl mb-2">Send Us a Message</h2>
                    <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you shortly.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-400 text-sm mb-2">Full Name *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email Address *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-gray-400 text-sm mb-2">Phone Number</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-gray-400 text-sm mb-2">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors appearance-none"
                        >
                          <option value="" className="text-gray-600">Select a topic…</option>
                          <option value="product-inquiry">Product Inquiry</option>
                          <option value="quote-request">Quote / Pricing</option>
                          <option value="installation">Installation Question</option>
                          <option value="order-status">Order Status</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-400 text-sm mb-2">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project — the room size, current flooring, and any preferences you have…"
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
                      />
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#c9a96e] text-[#0a0a0a] font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#d4b97e] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-gray-600 text-xs text-center">
                      We respect your privacy. Your information will never be shared with third parties.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Map embed placeholder */}
            <div className="mt-6 bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden h-64">
              <iframe
                title="ABBY Floor Location"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.6!2d-74.4121!3d40.5188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzA3LjciTiA3NMKwMjQnNDMuNiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
