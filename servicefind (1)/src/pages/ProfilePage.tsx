import { useParams, useNavigate } from 'react-router-dom';
import { PROVIDERS } from '../data/providers';
import { Star, MapPin, CheckCircle, Shield, Award, Calendar, ChevronLeft, Mail, Phone, MessageSquare, ExternalLink, Paperclip, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = PROVIDERS.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
        <div className="text-center">
           <h2 className="text-2xl font-bold mb-4">Provider not found</h2>
           <button onClick={() => navigate('/')} className="text-blue-600 font-semibold hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-neutral-500 font-semibold mb-10 hover:text-neutral-900 transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to results
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header / Info Section */}
            <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-neutral-200">
               <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="relative flex-shrink-0">
                     <img 
                       src={provider.image} 
                       alt={provider.name}
                       className="w-40 h-40 rounded-[2rem] object-cover shadow-2xl"
                       referrerPolicy="no-referrer"
                     />
                     {provider.verified && (
                       <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-600">
                         <CheckCircle size={28} fill="currentColor" className="text-white border-green-600" />
                          <CheckCircle size={28} className="absolute inset-0 m-auto" />
                       </div>
                     )}
                  </div>
                  
                  <div className="flex-grow">
                     <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">{provider.name}</h1>
                        <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                           {provider.category}
                        </span>
                     </div>
                     <p className="text-xl font-medium text-neutral-600 italic mb-6">"{provider.tagline}"</p>
                     
                     <div className="flex flex-wrap gap-6 mb-8 text-sm font-semibold">
                        <div className="flex items-center gap-2 text-neutral-700">
                           <Star size={18} className="text-yellow-500 fill-current" />
                           <span>{provider.rating} Rating</span>
                           <span className="text-neutral-400">({provider.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-700">
                           <MapPin size={18} className="text-neutral-400" />
                           <span>{provider.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-700 capitalize">
                           <Shield size={18} className="text-neutral-400" />
                           <span>{provider.type} Provider</span>
                        </div>
                     </div>
                     
                     <div className="flex gap-2">
                        {provider.tags.map(tag => (
                           <span key={tag} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-lg text-xs font-bold">
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* About */}
            <section className="bg-white rounded-[2rem] p-12 shadow-sm border border-neutral-200">
               <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Award className="text-blue-600" />
                  About the Professional
               </h2>
               <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-12">
                  {provider.description}
               </p>
               
               {provider.certifications && (
                  <div>
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Verified Certifications</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                       {provider.certifications.map(cert => (
                          <div key={cert} className="flex items-center gap-4 bg-green-50/50 border border-green-100 p-4 rounded-2xl">
                             <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                <Award size={20} />
                             </div>
                             <span className="font-bold text-green-800">{cert}</span>
                          </div>
                       ))}
                    </div>
                  </div>
               )}
            </section>

            {/* Portfolio */}
            {provider.portfolio.length > 0 && (
               <section className="bg-white rounded-[2rem] p-12 shadow-sm border border-neutral-200">
                  <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
                    <Paperclip className="text-blue-600" />
                    Portfolio & Past Work
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {provider.portfolio.map((img, i) => (
                       <div key={i} className="aspect-video rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                          <img src={img} className="w-full h-full object-cover" alt={`Portfolio ${i}`} referrerPolicy="no-referrer" />
                       </div>
                    ))}
                  </div>
               </section>
            )}
          </div>

          {/* Sidebar / Sidebar Form */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-neutral-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden sticky top-28">
                <div className="relative z-10">
                   <div className="flex justify-between items-end mb-10">
                      <div>
                         <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Service Rates</p>
                         <h3 className="text-4xl font-extrabold">₹{provider.price}<span className="text-xl font-medium text-white/40 ml-1">/{provider.priceUnit}</span></h3>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                         <Calendar size={16} className="text-blue-400" />
                         <span className="text-sm font-bold">Fast Booking</span>
                      </div>
                   </div>

                   <div className="space-y-4 mb-10">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-extrabold text-lg shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-3">
                         <MessageSquare size={20} />
                         Book Service
                      </button>
                      <button className="w-full bg-white/10 hover:bg-white/20 py-5 rounded-2xl font-bold transition-all border border-white/10 flex items-center justify-center gap-3">
                         Request Custom Quote
                      </button>
                   </div>

                   <div className="pt-8 border-t border-white/10 space-y-6">
                      <div className="flex items-center gap-4 text-white/70">
                         <Mail size={18} />
                         <span className="text-sm font-medium">Verify Email Shield Active</span>
                      </div>
                      <div className="flex items-center gap-4 text-white/70">
                         <Phone size={18} />
                         <span className="text-sm font-medium">{provider.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-4 text-white/70">
                         <ArrowRight size={18} />
                         <span className="text-sm font-medium underline">View Cancellation Policy</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[2rem] p-8 border border-neutral-200">
               <h4 className="font-bold mb-6 flex items-center gap-2">
                  <Shield size={18} className="text-green-600" />
                  Why Book with Us?
               </h4>
               <ul className="space-y-4 text-sm text-neutral-500 font-medium">
                  <li className="flex gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                     Payments are held in escrow until work is completed.
                  </li>
                  <li className="flex gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                     24/7 dedicated support team.
                  </li>
                  <li className="flex gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                     Providers are insured for up to ₹1M in damage.
                  </li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
