// src/components/Footer.jsx
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">LocalHub</h3>
            <p className="text-slate-300">
              Your trusted platform for finding and offering local services in Kolkata.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/services" className="hover:text-white transition">All Services</a></li>
              <li><a href="/how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          {/* For Users & Providers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Started</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="/signup?role=user" className="hover:text-white transition">Find Services</a></li>
              <li><a href="/signup?role=provider" className="hover:text-white transition">Become a Provider</a></li>
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                support@localhub.in
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} />
                Kolkata, West Bengal
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-400">
          <p>&copy; 2026 LocalHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;