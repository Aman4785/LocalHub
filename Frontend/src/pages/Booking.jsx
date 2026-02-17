// src/pages/Bookings.jsx
import React, { useState } from 'react';
import { Calendar, Clock, User, Briefcase, MapPin, IndianRupee, CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';

const Bookings = () => {
  // Mock user role (replace with real auth/context later)
  const userRole = 'user'; // 'user' or 'provider'

  const isProvider = userRole === 'provider';

  // Mock bookings data
  const mockBookings = {
    upcoming: [
      {
        id: 1,
        counterpartName: isProvider ? 'Rahul Sharma' : 'Rajesh Kumar',
        counterpartRole: isProvider ? 'Customer' : 'Plumber',
        service: 'Pipe Repair & Installation',
        date: 'January 25, 2026',
        time: '10:00 AM - 12:00 PM',
        location: 'Salt Lake, Kolkata',
        price: '₹800',
        status: 'confirmed',
      },
      {
        id: 2,
        counterpartName: isProvider ? 'Priya Mehta' : 'Neha Singh',
        counterpartRole: isProvider ? 'Customer' : 'Beauty & Salon',
        service: 'Hair Cut & Styling',
        date: 'January 28, 2026',
        time: '03:00 PM - 05:00 PM',
        location: 'New Town, Kolkata',
        price: '₹1,200',
        status: 'confirmed',
      },
    ],
    completed: [
      {
        id: 3,
        counterpartName: isProvider ? 'Amit Roy' : 'Priya Sharma',
        counterpartRole: isProvider ? 'Customer' : 'Home Tutor',
        service: 'Math Tuition (Class 10)',
        date: 'January 10, 2026',
        time: '05:00 PM - 07:00 PM',
        location: 'Online / Behala, Kolkata',
        price: '₹600',
        status: 'completed',
      },
    ],
    cancelled: [
      {
        id: 4,
        counterpartName: isProvider ? 'Sonia Das' : 'Amit Das',
        counterpartRole: isProvider ? 'Customer' : 'Electrician',
        service: 'Wiring Repair',
        date: 'January 15, 2026',
        time: '02:00 PM - 04:00 PM',
        location: 'Dum Dum, Kolkata',
        price: '₹500',
        status: 'cancelled',
      },
    ],
  };

  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = mockBookings[activeTab] || [];

  const getStatusIconAndColor = (status) => {
    if (status === 'confirmed') return { icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100' };
    if (status === 'completed') return { icon: CheckCircle, color: 'text-blue-600 bg-blue-100' };
    if (status === 'cancelled') return { icon: XCircle, color: 'text-red-600 bg-red-100' };
    return { icon: AlertCircle, color: 'text-amber-600 bg-amber-100' };
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          {isProvider ? 'Incoming Bookings' : 'My Bookings'}
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-1 font-medium transition ${
              activeTab === 'upcoming'
                ? 'text-purple-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming ({mockBookings.upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-4 px-1 font-medium transition ${
              activeTab === 'completed'
                ? 'text-purple-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({mockBookings.completed.length})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`pb-4 px-1 font-medium transition ${
              activeTab === 'cancelled'
                ? 'text-purple-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cancelled ({mockBookings.cancelled.length})
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-slate-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Calendar size={48} className="text-slate-400" />
            </div>
            <p className="text-xl text-slate-600">No {activeTab} bookings yet</p>
            <p className="text-slate-500 mt-2">
              {isProvider
                ? 'Bookings from customers will appear here.'
                : 'Your booked services will appear here once you make a booking.'}
            </p>
            {!isProvider && activeTab === 'upcoming' && (
              <a
                href="/"
                className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Browse Services
              </a>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => {
              const { icon: StatusIcon, color: statusColor } = getStatusIconAndColor(booking.status);
              return (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{booking.service}</h3>
                      <p className="text-slate-600 flex items-center mt-1">
                        {isProvider ? <User size={18} className="mr-2" /> : <Briefcase size={18} className="mr-2" />}
                        {booking.counterpartName} • {booking.counterpartRole}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${statusColor}`}>
                      <StatusIcon size={24} />
                    </div>
                  </div>

                  <div className="space-y-3 text-slate-700">
                    <p className="flex items-center">
                      <Calendar size={18} className="mr-2 text-slate-500" />
                      {booking.date}
                    </p>
                    <p className="flex items-center">
                      <Clock size={18} className="mr-2 text-slate-500" />
                      {booking.time}
                    </p>
                    <p className="flex items-center">
                      <MapPin size={18} className="mr-2 text-slate-500" />
                      {booking.location}
                    </p>
                    <p className="flex items-center font-semibold text-lg">
                      <IndianRupee size={18} className="mr-1 text-slate-500" />
                      {booking.price}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
                      <MessageSquare size={18} />
                      View Details / Chat
                    </button>
                    {activeTab === 'upcoming' && (
                      <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 font-medium py-3 rounded-lg transition">
                        Cancel Booking
                      </button>
                    )}
                    {activeTab === 'completed' && !isProvider && (
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition">
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;