"use client";

import ContactForm from "./ContactForm";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-600">
            Have questions? Send us a message or reach out via phone/email.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="text-orange-400 w-6 h-6" />
              <span className="text-gray-700 font-medium">+233 509 419 901</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-orange-400 w-6 h-6" />
              <span className="text-gray-700 font-medium">support@rolu.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-orange-400 w-6 h-6" />
              <span className="text-gray-700 font-medium">Accra, Ghana</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ContactForm />
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-300">
        © {new Date().getFullYear()} <span className="text-orange-400 font-semibold">Rolu.</span> All rights reserved.
      </div>
    </footer>
  );
}