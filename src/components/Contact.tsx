"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, Share2, Globe, MessageCircle, Video } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";

export default function Contact() {
  const { contact } = useContent();
  const [done, setDone] = useState(false);

  return (
    <section className="section-pad relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-5">
          <AnimatedSection className="lg:col-span-2">
            <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-600">Contact Us</span>
            <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
              Let&apos;s Power Your <span className="shimmer-text">Journey</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">Our experts are ready to help you find the perfect solution.</p>
            <div className="mt-6 space-y-4">
              {[
                { icon: Phone, label: "Call Us", value: contact.phone },
                { icon: Mail, label: "Email", value: contact.email },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white"><item.icon size={17} /></div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{item.label}</div>
                    <p className="text-xs text-gray-600 sm:text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{contact.address.label}</div>
                  <p className="text-xs text-gray-600 sm:text-sm leading-relaxed">
                    {contact.address.line1}<br />
                    {contact.address.line2}<br />
                    {contact.address.line3}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              {[Share2, Globe, MessageCircle, Video].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 hover:text-white transition-all"><Icon size={15} /></a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="lg:col-span-3">
            {done ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-green-50 border border-green-200 p-10 text-center min-h-[340px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white mb-3"><Send size={22} /></div>
                <h3 className="font-heading text-xl font-bold">Thank You!</h3>
                <p className="mt-2 text-sm text-gray-600">Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="rounded-2xl bg-gray-50 border border-gray-100 p-6 lg:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Full Name", "Phone Number", "Email Address", "City"].map((label, i) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                      <input type={i === 2 ? "email" : i === 1 ? "tel" : "text"} required placeholder={label} className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">System Size</label>
                    <select required defaultValue="" className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="" disabled>Select capacity</option>
                      <option>1 kW — Small Home</option>
                      <option>3 kW — Medium Home</option>
                      <option>5 kW — Large Home</option>
                      <option>10 kW+ — Commercial</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={3} placeholder="Your requirements..." className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <button type="submit" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-[1.01] transition-transform">
                  <Send size={16} /> Send Inquiry
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
