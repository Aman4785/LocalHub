
import React, { useState } from 'react';
import { Menu, X, Search, User, Briefcase, LogOut, MapPin } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Assuming the user is logged in (based on your session info)
  const isLoggedIn = true;
  const userName = 'Abhishek';

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // Force a refresh to clear all states
};

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-purple-700">LocalHub</h1>
              <span className="text-slate-600 flex items-center text-sm font-medium">
                <MapPin size={18} className="mr-1" />
                Kolkata
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-slate-700 hover:text-purple-600 font-medium transition">
              Home
            </a>
            <a href="/services" className="text-slate-700 hover:text-purple-600 font-medium transition">
              Services
            </a>
            <a href="/how-it-works" className="text-slate-700 hover:text-purple-600 font-medium transition">
              How It Works
            </a>
            <a href="/signup?role=provider" className="text-slate-700 hover:text-purple-600 font-medium flex items-center transition">
              <Briefcase size={18} className="mr-1" />
              Become a Provider
            </a>
          </nav>

          {/* Right Side - Search & Auth */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 transition">
              <Search size={22} className="text-slate-600" />
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center gap-2 hover:bg-slate-100 rounded-lg px-3 py-2 transition">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <span className="font-medium text-slate-800 hidden sm:block">
                    Hi, {userName}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <a href="/profile" className="block px-4 py-3 hover:bg-slate-50 transition">
                    My Profile
                  </a>
                  <a href="/bookings" className="block px-4 py-3 hover:bg-slate-50 transition">
                    My Bookings
                  </a>
                  <hr className="my-1" />
                  <a href="/logout" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-red-600 transition">
                    <LogOut size={18} />
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <>
                <a href="/login" className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                  Login
                </a>
                <a href="/signup" className="hidden sm:block bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
                  Sign Up
                </a>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-6 space-y-4">
            <a href="/" className="block text-slate-700 hover:text-purple-600 font-medium py-2">
              Home
            </a>
            <a href="/services" className="block text-slate-700 hover:text-purple-600 font-medium py-2">
              Services
            </a>
            <a href="/how-it-works" className="block text-slate-700 hover:text-purple-600 font-medium py-2">
              How It Works
            </a>
            <a href="/signup?role=provider" className="block text-slate-700 hover:text-purple-600 font-medium py-2 flex items-center">
              <Briefcase size={18} className="mr-2" />
              Become a Provider
            </a>

            {isLoggedIn ? (
              <>
                <a href="/profile" className="block text-slate-700 hover:text-purple-600 font-medium py-2">
                  My Profile
                </a>
                <a href="/bookings" className="block text-slate-700 hover:text-purple-600 font-medium py-2">
                  My Bookings
                </a>
                <a href="/logout" className="block text-red-600 font-medium py-2 flex items-center">
                  <LogOut size={18} className="mr-2" />
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-medium">
                  Login
                </a>
                <a href="/signup" className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg font-medium">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;