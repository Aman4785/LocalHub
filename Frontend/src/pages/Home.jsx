
import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Shield, User, Briefcase, Wrench, Paintbrush, BookOpen, Scissors, Phone, Laptop, HelpingHand ,ChefHat } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: Wrench, title: 'Plumbing', color: 'blue' },
    { icon: Paintbrush, title: 'Painting', color: 'emerald' },
    { icon: ChefHat, title: 'Cook', color: 'red' },
    { icon: BookOpen, title: 'Tutoring', color: 'amber' },
    { icon: Scissors, title: 'Salon & Beauty', color: 'pink' },
    { icon: Laptop, title: 'Electronics Repair', color: 'indigo' },
    { icon: Briefcase, title: 'Home Cleaning', color: 'purple' },
    { icon: HelpingHand, title: 'Helping Hand', color: 'red' },
  ];

  const featuredProviders = [
    { name: 'Rajesh Kumar', service: 'Plumber', rating: 4.9, reviews: 128, price: '₹400/hr', available: true },
    { name: 'Priya Sharma', service: 'Home Tutor', rating: 4.8, reviews: 95, price: '₹600/hr', available: true },
    { name: 'Amit Das', service: 'Electrician', rating: 5.0, reviews: 210, price: '₹500/hr', available: false },
    { name: 'Neha Singh', service: 'Beauty & Salon', rating: 4.7, reviews: 82, price: '₹800/session', available: true },
  ];

  return (
    <div className="pt-16 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Trusted Local Services in Kolkata
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Connect with verified plumbers, tutors, electricians, cleaners, beauticians & more — fast, reliable, and affordable.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24}  />
              <input
                type="text"
                placeholder="What service do you need? (e.g., plumber, tutor, cleaning)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full bg-zinc-100 text-zinc-700 text-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full font-semibold transition">
                Search
              </button>
            </div>
            <p className="mt-4 text-slate-200">
              <MapPin className="inline mr-1" size={18} /> Serving Kolkata & nearby areas
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Popular Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl hover:shadow-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  <div className={`p-4 rounded-full bg-${cat.color}-100 mb-4`}>
                    <Icon size={40} className={`text-${cat.color}-600`} />
                  </div>
                  <p className="font-semibold text-slate-800">{cat.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="p-6 bg-blue-100 rounded-full mb-6">
                <Search size={48} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Services</h3>
              <p className="text-slate-600">Tell us what you need and find verified local providers instantly.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-6 bg-emerald-100 rounded-full mb-6">
                <Shield size={48} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Securely</h3>
              <p className="text-slate-600">Compare profiles, ratings, and prices — book with confidence.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-6 bg-amber-100 rounded-full mb-6">
                <Star size={48} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get It Done</h3>
              <p className="text-slate-600">Professional service at your doorstep. Rate and review after completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find or Offer Services?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/signup?role=user" className="bg-white text-purple-700 hover:bg-slate-100 font-semibold px-10 py-4 rounded-lg text-lg transition">
              Find Services
            </a>
            <a href="/signup?role=provider" className="bg-purple-700 border-2 border-white hover:bg-white/10 font-semibold px-10 py-4 rounded-lg text-lg transition">
              Become a Provider
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;