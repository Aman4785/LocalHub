import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, Phone, MapPin, Star } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user', 
    phone: '', address: '', category: 'Electrician', 
    experience: '', hourlyRate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData);
      
      if (res.status === 201) {
        // 1. Log them in immediately by saving token/user
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // 2. Direct to Home Page
        navigate('/'); 
        window.location.reload(); // Ensures Header updates with user name
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Electrician', 'Plumber', 'Cleaner', 'Mechanic', 'Helper', 'Home Tutor', 'Beauty & Salon', 'Carpenter', 'Painter', 'Appliance Repair', 'Cook'];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-[#0a0a0f]">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-bounce"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-8">
          Welcome to LocalHub
        </h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center font-bold">{error}</div>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex flex-col items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.role === 'user' ? 'border-purple-600 bg-purple-50 shadow-md' : 'border-slate-100 hover:border-purple-200'}`}>
              <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} className="sr-only" />
              <User size={24} className={formData.role === 'user' ? 'text-purple-600' : 'text-slate-400'} />
              <span className="font-bold text-sm mt-1">Customer</span>
            </label>
            <label className={`flex flex-col items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${formData.role === 'provider' ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-indigo-200'}`}>
              <input type="radio" name="role" value="provider" checked={formData.role === 'provider'} onChange={handleChange} className="sr-only" />
              <Briefcase size={24} className={formData.role === 'provider' ? 'text-indigo-600' : 'text-slate-400'} />
              <span className="font-bold text-sm mt-1">Provider</span>
            </label>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500" size={18} />
              <input required name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            </div>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500" size={18} />
              <input required name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500" size={18} />
              <input required name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500" size={18} />
              <input required name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            </div>
          </div>

          {formData.role === 'provider' && (
            <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-5">
               <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl">
                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
               </select>
               <input name="experience" type="number" placeholder="Exp (Yrs)" value={formData.experience} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
               <input name="hourlyRate" type="number" placeholder="Rate ($)" value={formData.hourlyRate} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
            </div>
          )}

          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input name="address" type="text" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
          >
            {loading ? "Joining..." : "Create Account"}
          </button>
        </form>
        <p className="mt-8 text-center text-slate-500">
          Already have an account? <a href="/login" className="text-purple-600 font-bold hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;