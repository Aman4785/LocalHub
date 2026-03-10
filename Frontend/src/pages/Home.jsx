import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Star, Shield, 
  Wrench, Paintbrush, BookOpen, Scissors, 
  Laptop, Briefcase, HelpingHand, ChefHat 
} from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    { icon: Wrench,        title: 'Plumbing',           color: 'blue'    },
    { icon: Paintbrush,    title: 'Painting',           color: 'emerald' },
    { icon: ChefHat,       title: 'Cook',               color: 'red'     },
    { icon: BookOpen,      title: 'Tutoring',           color: 'amber'   },
    { icon: Scissors,      title: 'Salon & Beauty',     color: 'pink'    },
    { icon: Laptop,        title: 'Electronics Repair', color: 'indigo'  },
    { icon: Briefcase,     title: 'Home Cleaning',      color: 'purple'  },
    { icon: HelpingHand,   title: 'Helping Hand',       color: 'red'     },
  ];

  const handleSearch = (query = searchQuery) => {
    const term = (query || '').trim();
    if (term) {
      // Navigate to providers list with search param
      navigate(`/providers?search=${encodeURIComponent(term)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" 
                size={24} 
              />
              <input
                type="text"
                placeholder="What service do you need? (e.g., plumber, tutor, cleaning)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-14 py-4 rounded-full bg-zinc-100 text-zinc-700 text-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-lg"
              />
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full font-semibold transition text-white"
              >
                Search
              </button>
            </div>
            <p className="mt-4 text-slate-200 text-sm md:text-base">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSearch(cat.title)}
                  className="flex flex-col items-center p-5 md:p-6 bg-slate-50 rounded-2xl hover:shadow-lg hover:bg-slate-100 transition cursor-pointer active:scale-95"
                >
                  <div className={`p-4 rounded-full bg-${cat.color}-100 mb-4`}>
                    <Icon size={40} className={`text-${cat.color}-600`} />
                  </div>
                  <p className="font-semibold text-slate-800 text-center text-sm md:text-base">
                    {cat.title}
                  </p>
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
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="p-6 bg-blue-100 rounded-full mb-6">
                <Search size={48} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Services</h3>
              <p className="text-slate-600 px-4">
                Tell us what you need and find verified local providers instantly.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-6 bg-emerald-100 rounded-full mb-6">
                <Shield size={48} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Securely</h3>
              <p className="text-slate-600 px-4">
                Compare profiles, ratings, and prices — book with confidence.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-6 bg-amber-100 rounded-full mb-6">
                <Star size={48} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get It Done</h3>
              <p className="text-slate-600 px-4">
                Professional service at your doorstep. Rate and review after completion.
              </p>
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
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center">
            <a 
              href="/signup?role=user" 
              className="bg-white text-purple-700 hover:bg-slate-100 font-semibold px-9 py-4 rounded-lg text-lg transition w-full sm:w-auto text-center"
            >
              Find Services
            </a>
            <a 
              href="/signup?role=provider" 
              className="bg-purple-700 border-2 border-white hover:bg-white/10 font-semibold px-9 py-4 rounded-lg text-lg transition w-full sm:w-auto text-center"
            >
              Become a Provider
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;