import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    { day: '15', month: 'OCT', title: 'Global Charity Gala 2026', location: 'Grand Hotel, New York', time: '19:00 - 23:00' },
    { day: '22', month: 'OCT', title: 'Community Blood Drive', location: 'City Central Park', time: '09:00 - 15:00' },
    { day: '05', month: 'NOV', title: 'Volunteer Training Workshop', location: 'MaxValid Headquarters', time: '10:00 - 14:00' },
    { day: '12', month: 'NOV', title: 'Winter Relief Fundraiser', location: 'Downtown Community Center', time: '18:30 - 21:00' }
  ];
  return (
    <PublicLayout>
      <div className='max-w-4xl mx-auto px-6 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Upcoming Events</h2>
          <p className='text-gray-600'>Join our upcoming events and be a part of our growing community of changemakers.</p>
        </div>
        <div className='space-y-6'>
          {events.map((ev, i) => (
            <div key={i} className='flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group'>
              <div className='bg-blue-50 sm:w-32 py-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-100'>
                <span className='text-3xl font-black text-[#00a8ff]'>{ev.day}</span>
                <span className='text-sm font-bold text-gray-500 uppercase tracking-wider'>{ev.month}</span>
              </div>
              <div className='p-6 flex-1 flex flex-col justify-center'>
                <h3 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-[#00a8ff] transition-colors'>{ev.title}</h3>
                <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                  <div className='flex items-center gap-1.5'><MapPin size={16} className='text-gray-400'/> {ev.location}</div>
                  <div className='flex items-center gap-1.5'><Clock size={16} className='text-gray-400'/> {ev.time}</div>
                </div>
              </div>
              <div className='p-6 flex items-center justify-center sm:justify-end border-t sm:border-t-0 border-gray-50'>
                <button 
                  onClick={() => setSelectedEvent(ev)}
                  className='px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-[#00a8ff] transition-colors'
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="bg-[#00a8ff] p-6 text-white relative">
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl">&times;</button>
              <h3 className="text-xl font-bold mb-1">Event Registration</h3>
              <p className="text-white/90 text-sm">{selectedEvent.title}</p>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Registration Successful!"); setSelectedEvent(null); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8ff]/50 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8ff]/50 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8ff]/50 outline-none" required />
              </div>
              <button type="submit" className="w-full py-3 bg-[#00a8ff] text-white rounded-xl font-bold mt-4 hover:bg-[#0097e6]">Confirm Registration</button>
            </form>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
