import React from 'react'

const Providers = () => {
  const featuredProviders = [
    { name: 'Rajesh Kumar', service: 'Plumber', rating: 4.9, reviews: 128, price: '₹400/hr', available: true },
    { name: 'Priya Sharma', service: 'Home Tutor', rating: 4.8, reviews: 95, price: '₹600/hr', available: true },
    { name: 'Amit Das', service: 'Electrician', rating: 5.0, reviews: 210, price: '₹500/hr', available: false },
    { name: 'Neha Singh', service: 'Beauty & Salon', rating: 4.7, reviews: 82, price: '₹800/session', available: true },
  ];
  return (
    {/* Featured Providers */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Top-Rated Providers Near You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProviders.map((provider, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center">
                  <User size={80} className="text-slate-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{provider.name}</h3>
                  <p className="text-slate-600 mt-1">{provider.service}</p>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-slate-600 text-sm">
                      {provider.rating} ({provider.reviews} reviews)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-700">{provider.price}</span>
                    {provider.available ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        <Clock size={16} className="mr-1" /> Available Now
                      </span>
                    ) : (
                      <span className="text-slate-500 text-sm">Busy</span>
                    )}
                  </div>

                  <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Providers