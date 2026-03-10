// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Edit2,
  Calendar,
  Star,
  Briefcase,
  Clock,
  DollarSign,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isProvider = user.role === "provider";

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"></div>
          <div className="relative px-8 pb-8 -mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-white">
                <User size={64} className="text-slate-400" />
              </div>

              {/* Name & Role */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-slate-900">
                  {user.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                  <span
                    className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium
                    ${
                      isProvider
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-purple-800"
                    }`}
                  >
                    {isProvider ? (
                      <>
                        <Briefcase size={16} className="mr-1" />
                        Service Provider
                      </>
                    ) : (
                      <>
                        <User size={16} className="mr-1" />
                        Customer
                      </>
                    )}
                  </span>
                  <span className="text-slate-600 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition">
                <Edit2 size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section (Provider only) */}
        {isProvider && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <div className="flex items-center justify-center text-amber-500 mb-2">
                <Star size={32} fill="currentColor" />
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {user.rating || 0}
              </p>
              <p className="text-slate-600">Average Rating</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <Award size={32} className="mx-auto text-purple-600 mb-2" />
              <p className="text-3xl font-bold text-slate-900">
                {user.experience || 0} years
              </p>
              <p className="text-slate-600">Experience</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <DollarSign size={32} className="mx-auto text-emerald-600 mb-2" />
              <p className="text-3xl font-bold text-slate-900">
                ₹{user.hourlyRate || 0}/hr
              </p>
              <p className="text-slate-600">Hourly Rate</p>
            </div>
          </div>
        )}

        {/* Personal Details */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <Mail size={24} className="text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-medium text-slate-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Phone</p>
                <p className="font-medium text-slate-900">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>
            {user.address && (
              <div className="flex items-center gap-4">
                <MapPin size={24} className="text-slate-500" />
                <div>
                  <p className="text-sm text-slate-600">Address</p>
                  <p className="font-medium text-slate-900">{user.address}</p>
                </div>
              </div>
            )}
            {isProvider && (
              <>
                <div className="flex items-center gap-4">
                  <Briefcase size={24} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Category</p>
                    <p className="font-medium text-slate-900">
                      {user.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={24} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Availability</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        user.isAvailable
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isAvailable ? "Available Now" : "Not Available"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/bookings")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-center transition"
          >
            {isProvider ? "View Incoming Bookings" : "My Bookings"}
          </button>
          {isProvider && (
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg text-center transition">
              Manage Services
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
