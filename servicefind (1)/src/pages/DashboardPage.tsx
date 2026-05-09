import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CreditCard, 
  Banknote, 
  Clock, 
  CheckCircle2, 
  MoreVertical, 
  Plus,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

type PaymentMethod = 'online' | 'cod';

export default function DashboardPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [activeTab, setActiveTab] = useState<'bookings' | 'requests'>('bookings');

  const bookings = [
    { id: 'b1', client: 'Aamina Jan', service: 'Pheran Tailoring', date: 'Oct 12, 2024', time: '10:00 AM', status: 'Upcoming', price: '₹1200' },
    { id: 'b2', client: 'Zaid Bhat', service: 'House Wiring', date: 'Oct 14, 2024', time: '02:30 PM', status: 'Finalized', price: '₹4500' },
  ];

  const requests = [
    { id: 'r1', client: 'Irfan Dar', service: 'Shikara Sunset Tour', date: 'Pending', msg: 'Need a ride for 4 people this Sunday.', status: 'New' },
    { id: 'r2', client: 'Sana Qayoom', service: 'Outdoor Photography', date: 'Pending', msg: 'Looking for a half-day shoot in Pahalgam.', status: 'Awaiting Response' },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <h1 className="text-3xl font-extrabold text-neutral-900">Welcome back, Pro</h1>
               <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={12} />
                  Verified Status Active
               </div>
            </div>
            <p className="text-neutral-500 font-medium italic">"Providing top-notch services in Srinagar & surrounding areas"</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-white border border-neutral-200 p-3 rounded-2xl text-neutral-600 hover:bg-neutral-100 transition-all shadow-sm">
                <Settings size={20} />
             </button>
             <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                <Plus size={20} />
                Create Listing
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Earnings', val: '₹42,500', icon: <TrendingUp className="text-blue-600" /> },
                { label: 'Active Jobs', val: '8', icon: <Clock className="text-orange-600" /> },
                { label: 'Completion Rate', val: '98%', icon: <CheckCircle2 className="text-green-600" /> },
                { label: 'Client Messages', val: '14', icon: <MessageSquare className="text-purple-600" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                  <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl font-extrabold text-neutral-900">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Bookings & Requests Tabs */}
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
               <div className="flex border-b border-neutral-100">
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`flex-1 py-6 font-bold text-sm transition-all ${activeTab === 'bookings' ? 'text-blue-600 bg-blue-50/30 border-b-2 border-blue-600' : 'text-neutral-400 hover:text-neutral-900'}`}
                  >
                    UPCOMING BOOKINGS ({bookings.length})
                  </button>
                  <button 
                    onClick={() => setActiveTab('requests')}
                    className={`flex-1 py-6 font-bold text-sm transition-all ${activeTab === 'requests' ? 'text-blue-600 bg-blue-50/30 border-b-2 border-blue-600' : 'text-neutral-400 hover:text-neutral-900'}`}
                  >
                    PENDING REQUESTS ({requests.length})
                  </button>
               </div>

               <div className="p-8">
                  <div className="space-y-4">
                     {activeTab === 'bookings' ? (
                       bookings.map(booking => (
                         <div key={booking.id} className="flex items-center justify-between p-6 bg-neutral-50 border border-neutral-100 rounded-2xl hover:border-blue-200 transition-all group">
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                  <Calendar size={24} />
                               </div>
                               <div>
                                  <h4 className="font-bold text-neutral-900">{booking.service}</h4>
                                  <p className="text-xs font-medium text-neutral-500">Client: {booking.client} • {booking.date} at {booking.time}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-6">
                               <span className="text-sm font-extrabold text-neutral-900">{booking.price}</span>
                               <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">{booking.status}</span>
                               <button className="text-neutral-300 hover:text-neutral-900">
                                  <MoreVertical size={20} />
                               </button>
                            </div>
                         </div>
                       ))
                     ) : (
                       requests.map(req => (
                         <div key={req.id} className="flex items-center justify-between p-6 bg-neutral-50 border border-neutral-100 rounded-2xl hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
                                  <MessageSquare size={24} />
                               </div>
                               <div>
                                  <h4 className="font-bold text-neutral-900">{req.client}</h4>
                                  <p className="text-xs font-medium text-neutral-500">{req.msg}</p>
                               </div>
                            </div>
                            <div className="flex gap-2">
                               <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">Accept</button>
                               <button className="bg-white border border-neutral-200 text-neutral-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-neutral-100">Decline</button>
                            </div>
                         </div>
                       ))
                     )}
                  </div>
               </div>
            </div>
          </div>

          {/* Right Sidebar - Payment & Location */}
          <div className="space-y-8">
             
             {/* Payment Preferences */}
             <div className="bg-neutral-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-xl font-bold mb-8">Payment Preferences</h3>
                   <div className="space-y-3">
                      <button 
                        onClick={() => setPaymentMethod('online')}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${paymentMethod === 'online' ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                         <div className="flex items-center gap-4 text-left">
                            <CreditCard size={24} className={paymentMethod === 'online' ? 'text-white' : 'text-blue-400'} />
                            <div>
                               <p className="font-bold">Online Payment</p>
                               <p className="text-[10px] text-white/50">Credit, Debit, UPI enabled</p>
                            </div>
                         </div>
                         {paymentMethod === 'online' && <CheckCircle2 size={20} />}
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('cod')}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${paymentMethod === 'cod' ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                         <div className="flex items-center gap-4 text-left">
                            <Banknote size={24} className={paymentMethod === 'cod' ? 'text-white' : 'text-green-400'} />
                            <div>
                               <p className="font-bold">Cash on Delivery</p>
                               <p className="text-[10px] text-white/50">Collect payment after completion</p>
                            </div>
                         </div>
                         {paymentMethod === 'cod' && <CheckCircle2 size={20} />}
                      </button>
                   </div>
                   <p className="mt-6 text-[10px] text-white/40 leading-relaxed text-center">
                     ServiceFind takes an 8% commission on Online payments. COD payments are subject to a weekly membership fee.
                   </p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
             </div>

             {/* Provider Location */}
             <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-bold text-neutral-900">Your Base Location</h3>
                   <button className="text-sm font-bold text-blue-600 hover:underline">Edit</button>
                </div>
                
                <div className="aspect-square bg-neutral-100 rounded-3xl relative mb-6 overflow-hidden">
                   {/* Mock Map View */}
                   <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                         <div className="w-12 h-12 bg-blue-600/20 rounded-full animate-ping" />
                         <div className="absolute inset-0 m-auto w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                      </div>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-neutral-900">Srinagar, Jammu & Kashmir</h4>
                      <p className="text-xs text-neutral-500">Rajbagh, Area Code 190008</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
