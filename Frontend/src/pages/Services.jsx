import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Wrench,
  Paintbrush,
  BookOpen,
  Scissors,
  Laptop,
  Briefcase,
  HelpingHand,
  ChefHat,
  Zap,
  Wind,
  Bug,
  Dumbbell,
  Home,
  Car,
  Filter,
} from "lucide-react";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const services = [
    {
      icon: Wrench,
      title: "Plumber",
      color: "blue",
      description: "Leak detection, pipe fitting, bathroom renovations",
      providers: 45,
    },
    {
      icon: Zap,
      title: "Electrician",
      color: "amber",
      description: "Wiring, installation, repairs & fault finding",
      providers: 38,
    },
    {
      icon: Paintbrush,
      title: "Painter",
      color: "emerald",
      description: "Interior & exterior painting, wall textures",
      providers: 28,
    },
    {
      icon: ChefHat,
      title: "Cook",
      color: "red",
      description: "Home cooking, tiffin service, party catering",
      providers: 32,
    },
    {
      icon: BookOpen,
      title: "Home Tutor",
      color: "purple",
      description: "Academic tutoring for all subjects & grades",
      providers: 56,
    },
    {
      icon: Scissors,
      title: "Beauty & Salon",
      color: "pink",
      description: "Haircut, makeup, facial, waxing & grooming",
      providers: 24,
    },
    {
      icon: Briefcase,
      title: "Carpenter",
      color: "orange",
      description: "Custom furniture, repairs & woodwork",
      providers: 31,
    },
    {
      icon: Laptop,
      title: "Appliance Repair",
      color: "indigo",
      description: "TV, washing machine, fridge & electronics",
      providers: 22,
    },
    {
      icon: Home,
      title: "Cleaner",
      color: "teal",
      description: "Deep cleaning, maintenance & sanitization",
      providers: 41,
    },
    {
      icon: Wind,
      title: "AC Repair",
      color: "cyan",
      description: "AC installation, repair, gas filling & service",
      providers: 19,
    },
    {
      icon: Car,
      title: "Mechanic",
      color: "slate",
      description: "Car & bike repair, maintenance & servicing",
      providers: 27,
    },
    {
      icon: HelpingHand,
      title: "Helper",
      color: "rose",
      description: "General assistance, moving & daily help",
      providers: 35,
    },
    {
      icon: Bug,
      title: "Pest Control",
      color: "green",
      description: "Cockroach, termite, rodent control",
      providers: 15,
    },
    {
      icon: Dumbbell,
      title: "Fitness Trainer",
      color: "red",
      description: "Yoga, gym training & health consultation",
      providers: 18,
    },
  ];

  const categories = [
    "All",
    "Home Services",
    "Personal Care",
    "Education",
    "Repair & Maintenance",
  ];

  const handleServiceClick = (service) => {
    navigate(`/providers?search=${encodeURIComponent(service.title)}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/providers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse All Services
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Find trusted professionals for every need in Kolkata
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for services (plumber, tutor, electrician...)"
                className="w-full pl-12 pr-14 py-4 rounded-full bg-zinc-100 text-zinc-700 text-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-lg"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full font-semibold transition text-white"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            {filteredServices.length} Services Available
          </h2>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <Search size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">
              No services found
            </h3>
            <p className="text-slate-600">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
                amber: "bg-amber-100 text-amber-600 hover:bg-amber-200",
                emerald: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
                red: "bg-red-100 text-red-600 hover:bg-red-200",
                purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
                pink: "bg-pink-100 text-pink-600 hover:bg-pink-200",
                orange: "bg-orange-100 text-orange-600 hover:bg-orange-200",
                indigo: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
                teal: "bg-teal-100 text-teal-600 hover:bg-teal-200",
                cyan: "bg-cyan-100 text-cyan-600 hover:bg-cyan-200",
                slate: "bg-slate-100 text-slate-600 hover:bg-slate-200",
                rose: "bg-rose-100 text-rose-600 hover:bg-rose-200",
                green: "bg-green-100 text-green-600 hover:bg-green-200",
              };

              return (
                <div
                  key={index}
                  onClick={() => handleServiceClick(service)}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 rounded-lg ${colorClasses[service.color]} flex items-center justify-center mb-4 transition-all`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-semibold text-sm">
                      {service.providers} Providers
                    </span>
                    <span className="text-slate-500 text-sm group-hover:text-purple-600 transition">
                      View →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-purple-50 py-16 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Contact us and we'll help you find the right service provider
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition">
            Get Help
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
