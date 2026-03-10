import React, { useState, useEffect } from "react";
import { Menu, X, Search, User, Briefcase, LogOut, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (user) {
        try {
          const userData = JSON.parse(user);
          setUserName(userData.name || "User");
        } catch (e) {
          setUserName("User");
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/providers?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
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
            <a
              href="/"
              className="text-slate-700 hover:text-purple-600 font-medium transition"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-slate-700 hover:text-purple-600 font-medium transition"
            >
              Services
            </a>

            <a
              href="/signup?role=provider"
              className="text-slate-700 hover:text-purple-600 font-medium flex items-center transition"
            >
              <Briefcase size={18} className="mr-1" />
              Become a Provider
            </a>
          </nav>

          {/* Right Side - Search & Auth */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-slate-100 transition"
            >
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
                  <a
                    href="/profile"
                    className="block px-4 py-3 hover:bg-slate-50 transition"
                  >
                    My Profile
                  </a>
                  <a
                    href="/bookings"
                    className="block px-4 py-3 hover:bg-slate-50 transition"
                  >
                    My Bookings
                  </a>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-red-600 transition w-full text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="hidden sm:block bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
                >
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
            <a
              href="/"
              className="block text-slate-700 hover:text-purple-600 font-medium py-2"
            >
              Home
            </a>
            <a
              href="/services"
              className="block text-slate-700 hover:text-purple-600 font-medium py-2"
            >
              Services
            </a>
            <a
              href="/how-it-works"
              className="block text-slate-700 hover:text-purple-600 font-medium py-2"
            >
              How It Works
            </a>
            <a
              href="/signup?role=provider"
              className="flex text-slate-700 hover:text-purple-600 font-medium py-2 items-center"
            >
              <Briefcase size={18} className="mr-2" />
              Become a Provider
            </a>

            {isLoggedIn ? (
              <>
                <a
                  href="/profile"
                  className="block text-slate-700 hover:text-purple-600 font-medium py-2"
                >
                  My Profile
                </a>
                <a
                  href="/bookings"
                  className="block text-slate-700 hover:text-purple-600 font-medium py-2"
                >
                  My Bookings
                </a>
                <button
                  onClick={handleLogout}
                  className="flex text-red-600 font-medium py-2 items-center w-full text-left"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-medium"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg font-medium"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-slide-down">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Search Services
                </h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search for plumber, electrician, tutor..."
                  className="w-full px-6 py-4 pr-14 border-2 border-slate-200 rounded-xl text-lg focus:outline-none focus:border-purple-500 transition"
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition"
                >
                  <Search size={20} />
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-slate-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Plumber",
                    "Electrician",
                    "Home Tutor",
                    "Cleaner",
                    "Carpenter",
                    "Cook",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(
                          `/providers?search=${encodeURIComponent(term)}`,
                        );
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 rounded-full text-sm font-medium transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    navigate("/services");
                    setIsSearchOpen(false);
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  Browse all services →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
