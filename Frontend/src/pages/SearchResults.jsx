import React from 'react';
import { Star, User } from 'lucide-react';

const SearchResults = ({ category = "Electrician" }) => {
  // Mock data based on your wireframe fields
  const providers = [
    { id: 1, name: "John Doe", experience: "5 years", rating: 4.8, price: "₹500/hr", bio: "Expert in home wiring and appliance repair." },
    { id: 2, name: "Sam Smith", experience: "8 years", rating: 4.9, price: "₹700/hr", bio: "Specialist in industrial electrical maintenance." },
    { id: 3, name: "Alex Wong", experience: "3 years", rating: 4.5, price: "₹400/hr", bio: "Quick fixes and emergency electrical services." },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Available {category}s</h1>
      
      <div className="space-y-4">
        {providers.map((provider) => (
          <div 
            key={provider.id} 
            className="flex flex-col md:flex-row border-2 border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Left Section: Photo and Name */}
            <div className="flex flex-col items-center md:items-start md:w-1/4 space-y-3">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                <User size={48} className="text-gray-400" />
              </div>
              <div className="bg-gray-800 text-white px-4 py-1 rounded-lg font-medium text-center w-full md:w-auto">
                {provider.name}
              </div>
            </div>

            {/* Right Section: Description and Price */}
            <div className="flex-1 md:ml-8 mt-4 md:mt-0 flex flex-col justify-between">
              <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold block mb-1">Details:</span>
                  {provider.bio}
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Exp: {provider.experience}</span>
                  <span className="flex items-center gap-1 text-yellow-600 font-bold">
                    <Star size={16} fill="currentColor" /> {provider.rating}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="border-2 border-gray-800 rounded-lg px-8 py-2 font-bold text-xl text-gray-800">
                  {provider.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;