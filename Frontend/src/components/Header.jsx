import React, { useState, useEffect } from "react";
import { Menu, X, Search, User, Briefcase, LogOut, MapPin } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (user) {
        try {
          const userData = JSON.parse(user);
          setUserName(userData.name || "User");
        } catch {
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
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setIsSearchOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-purple-700">LocalHub</h1>
              <span className="text-slate-600 flex items-center text-sm font-medium">
                <MapPin size={18} className="mr-1" />
                Kolkata
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-purple-600 font-medium">
              Home
            </Link>

            <Link to="/services" className="text-slate-700 hover:text-purple-600 font-medium">
              Services
            </Link>

            <Link
              to="/signup?role=provider"
              className="text-slate-700 hover:text-purple-600 font-medium flex items-center"
            >
              <Briefcase size={18} className="mr-1" />
              Become a Provider
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-slate-100"
            >
              <Search size={22} />
            </button>

            {isLoggedIn ? (
              <div className="relative group">

                <button className="flex items-center gap-2 hover:bg-slate-100 rounded-lg px-3 py-2">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <span className="font-medium text-slate-800 hidden sm:block">
                    Hi, {userName}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">

                  <Link to="/profile" className="block px-4 py-3 hover:bg-slate-50">
                    My Profile
                  </Link>

                  <Link to="/bookings" className="block px-4 py-3 hover:bg-slate-50">
                    My Bookings
                  </Link>

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-red-600 w-full text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="hidden sm:block bg-emerald-600 text-white px-6 py-2 rounded-lg"
                >
                  Sign Up
                </Link>
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

            <Link to="/" className="block py-2">Home</Link>
            <Link to="/services" className="block py-2">Services</Link>
            <Link to="/signup?role=provider" className="flex items-center py-2">
              <Briefcase size={18} className="mr-2" />
              Become a Provider
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block py-2">My Profile</Link>
                <Link to="/bookings" className="block py-2">My Bookings</Link>
                <button
                  onClick={handleLogout}
                  className="flex text-red-600 py-2 items-center w-full text-left"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg">
                  Login
                </Link>

                <Link to="/signup" className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
