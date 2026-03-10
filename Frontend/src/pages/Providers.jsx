import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  User,
  Star,
  Clock,
  Award,
  Calendar,
  MapPin,
  Phone,
  X,
} from "lucide-react";

const Providers = () => {
  const location = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingData, setBookingData] = useState({
    location: "",
    address: "",
    date: "",
    time: "",
    phone: "",
    additionalNotes: "",
  });

  // 1. Extract the search term from the URL (?search=plumber)
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  const allProviders = [
    {
      name: "Rajesh Kumar",
      service: "Plumber",
      rating: 4.9,
      reviews: 128,
      price: "₹400/hr",
      experience: "8+ Years",
      bio: "Expert in leak detection, pipe fitting, bathroom renovations & emergency plumbing. 24×7 available.",
    },
    {
      name: "Priya Sharma",
      service: "Home Tutor",
      rating: 4.8,
      reviews: 95,
      price: "₹600/hr",
      experience: "5+ Years",
      bio: "Specializing in Maths & Science for classes 6–12. Focus on CBSE/ICSE boards & personalized plans.",
    },
    {
      name: "Amit Das",
      service: "Electrician",
      rating: 5.0,
      reviews: 210,
      price: "₹500/hr",
      experience: "12+ Years",
      bio: "Licensed for home wiring, inverter/AC installation, fan repair & fault finding. Very punctual.",
    },
    {
      name: "Neha Singh",
      service: "Beauty & Salon",
      rating: 4.7,
      reviews: 82,
      price: "₹800/session",
      experience: "4+ Years",
      bio: "Bridal makeup, party looks, facials, waxing & hair styling. Home service specialist.",
    },
    {
      name: "Sourav Banerjee",
      service: "Carpenter",
      rating: 4.6,
      reviews: 143,
      price: "₹450/hr",
      experience: "10+ Years",
      bio: "Custom furniture, modular kitchen setup, wardrobe repair, polish & woodwork expert.",
    },
    {
      name: "Rina Mondal",
      service: "Home Cleaning",
      rating: 4.8,
      reviews: 176,
      price: "₹1,200/visit",
      experience: "6+ Years",
      bio: "Deep cleaning, post-construction cleanup, sofa & carpet shampoo. Eco-friendly products used.",
    },
    {
      name: "Vikram Roy",
      service: "AC Repair & Service",
      rating: 4.9,
      reviews: 112,
      price: "₹550/hr",
      experience: "7+ Years",
      bio: "Split/window AC repair, gas filling, installation & annual maintenance. All brands covered.",
    },
    {
      name: "Anjali Verma",
      service: "Cooking / Tiffin Service",
      rating: 4.7,
      reviews: 89,
      price: "₹150/meal",
      experience: "3+ Years",
      bio: "Homestyle Bengali, North Indian & healthy Jain meals. Daily fresh tiffin delivery.",
    },
    {
      name: "Manoj Halder",
      service: "Pest Control",
      rating: 4.8,
      reviews: 134,
      price: "₹1,800–4,500/home",
      experience: "9+ Years",
      bio: "Cockroach, termite, rodent & bed bug control. Safe for kids & pets. 3-month guarantee.",
    },
    {
      name: "Soma Ghosh",
      service: "Yoga & Fitness Trainer",
      rating: 4.9,
      reviews: 67,
      price: "₹700/session",
      experience: "6+ Years",
      bio: "Personalized yoga, prenatal yoga, weight loss & senior fitness sessions at home.",
    },
    {
      name: "Arun Chatterjee",
      service: "Painter",
      rating: 4.6,
      reviews: 158,
      price: "₹35/sq ft",
      experience: "11+ Years",
      bio: "Interior & exterior painting, texture, waterproofing & putty work. Neat & timely finish.",
    },
    {
      name: "Kavita Patel",
      service: "Baby Sitter / Nanny",
      rating: 4.7,
      reviews: 104,
      price: "₹500/hr",
      experience: "5+ Years",
      bio: "Experienced with newborns & toddlers. Play-based learning, hygiene & night duty available.",
    },
  ];

  // Filter logic: check if name or service matches the search term
  const filteredProviders = allProviders.filter(
    (p) =>
      p.service.toLowerCase().includes(searchTerm) ||
      p.name.toLowerCase().includes(searchTerm),
  );

  // Handle booking button click
  const handleBookingClick = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to book a service");
        return;
      }

      const bookingPayload = {
        providerName: selectedProvider.name,
        service: selectedProvider.service,
        price: selectedProvider.price,
        ...bookingData,
      };

      const response = await fetch(
        "http://localhost:5000/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingPayload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Booking successfully created!");
        setShowBookingModal(false);
        setBookingData({
          location: "",
          address: "",
          date: "",
          time: "",
          phone: "",
          additionalNotes: "",
        });
      } else {
        alert(data.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred while creating the booking");
    }
  };

  // Close modal
  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedProvider(null);
    setBookingData({
      location: "",
      address: "",
      date: "",
      time: "",
      phone: "",
      additionalNotes: "",
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            {searchTerm
              ? `Top ${searchTerm}s in Kolkata`
              : "Top-Rated Providers"}
          </h2>
          <p className="text-slate-500 mt-2">
            Found {filteredProviders.length} verified professionals
          </p>
        </div>

        {/* 3. The List (Matching your wireframe layout) */}
        <div className="flex flex-col gap-6">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <div
                key={index}
                className="bg-white border-2 border-slate-200 rounded-[2rem] p-6 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-md transition-all"
              >
                {/* WIREFRAME LEFT: Photo and Name */}
                <div className="flex flex-col items-center md:w-48 shrink-0">
                  <div className="w-28 h-28 rounded-full border-4 border-slate-100 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-4">
                    <User size={56} className="text-indigo-400" />
                  </div>
                  <div className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-center w-full shadow-lg">
                    {provider.name}
                  </div>
                </div>

                {/* WIREFRAME RIGHT: Description Box and Price Box */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  {/* Description Box */}
                  <div className="border-2 border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider text-purple-600">
                        {provider.service}
                      </span>
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                        <Star
                          size={16}
                          fill="#f59e0b"
                          className="text-amber-500"
                        />
                        <span className="font-bold text-slate-700">
                          {provider.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      <span className="font-semibold text-slate-800">
                        Experience:{" "}
                      </span>
                      {provider.experience} — {provider.bio}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center text-emerald-600 font-medium text-sm">
                      <Clock size={16} className="mr-1" /> Available for booking
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="border-2 border-slate-900 px-8 py-2 rounded-xl font-black text-2xl text-slate-900">
                        ₹{provider.price}
                      </div>

                      <button
                        onClick={() => handleBookingClick(provider)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
              <p className="text-xl text-slate-500">
                No providers found for "{searchTerm}".
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="mt-4 text-purple-600 font-bold underline"
              >
                Try searching for something else
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Book Service</h3>
                <p className="text-purple-100 text-sm mt-1">
                  {selectedProvider?.name} - {selectedProvider?.service}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
              {/* Location */}
              <div>
                <label className="flex items-center text-slate-700 font-semibold mb-2">
                  <MapPin size={18} className="mr-2 text-purple-600" />
                  Location/Area
                </label>
                <input
                  type="text"
                  name="location"
                  value={bookingData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Salt Lake, Kolkata"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                />
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-slate-700 font-semibold mb-2">
                  <MapPin size={18} className="mr-2 text-purple-600" />
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={bookingData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address with landmarks"
                  required
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition resize-none"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-slate-700 font-semibold mb-2">
                    <Calendar size={18} className="mr-2 text-purple-600" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="flex items-center text-slate-700 font-semibold mb-2">
                    <Clock size={18} className="mr-2 text-purple-600" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-slate-700 font-semibold mb-2">
                  <Phone size={18} className="mr-2 text-purple-600" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                />
                <p className="text-slate-500 text-sm mt-1">
                  10-digit mobile number
                </p>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="text-slate-700 font-semibold mb-2 block">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="additionalNotes"
                  value={bookingData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or instructions..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition resize-none"
                />
              </div>

              {/* Service Summary */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2">
                  Booking Summary
                </h4>
                <div className="space-y-1 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Provider:</span>{" "}
                    {selectedProvider?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Service:</span>{" "}
                    {selectedProvider?.service}
                  </p>
                  <p>
                    <span className="font-semibold">Rate:</span>{" "}
                    {selectedProvider?.price}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition transform hover:scale-105"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;
