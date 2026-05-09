import { Search, ShieldCheck, Star, Users, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/providers';
import { motion } from 'motion/react';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      const filtered = CATEGORIES.filter(c => 
        c.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (q: string) => {
    navigate(`/search?q=${q}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6">
              Find trusted professionals <br />
              <span className="text-blue-600">for any service, instantly.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with verified individuals and companies vetted by our rigorous quality check system.
            </p>
          </motion.div>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto relative group">
            <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-2xl md:rounded-full shadow-2xl border border-neutral-100 group-focus-within:border-blue-200 transition-all">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g. plumber, designer)"
                  className="w-full border-none focus:ring-0 py-4 pl-12 rounded-full text-neutral-900"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                />
                
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="w-full text-left px-6 py-3 hover:bg-neutral-50 transition-colors flex items-center gap-3"
                        onClick={() => handleSearch(suggestion)}
                      >
                        <Search size={14} className="text-neutral-400" />
                        <span className="text-neutral-700 font-medium">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => handleSearch(query)}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl md:rounded-full font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Find Professional
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mr-2 py-1">Popular:</span>
              {['Repair', 'Design', 'Consultant', 'Cleaning'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => handleSearch(tag)}
                  className="text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-blue-50 hover:text-blue-600 px-4 py-1.5 rounded-full transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl -z-10" />
      </section>

      {/* Trust Section */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900">Verified Quality</h3>
              <p className="text-neutral-600">Every provider undergoes a 5-step background and certification verification.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900">Top Rated</h3>
              <p className="text-neutral-600">Only professionals with a proven track record of customer excellence are featured.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900">Instant Booking</h3>
              <p className="text-neutral-600">Browse schedules, compare rates, and book your service in under 60 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Explanation */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-neutral-900 rounded-[2.5rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              OUR COMMITMENT
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">We vet so you don't have to.</h2>
            <div className="space-y-6">
              {[
                { title: "ID & Background Check", desc: "Identity verification and safety vetting for individuals." },
                { title: "License Review", desc: "Manual check of professional certifications and trade licenses." },
                { title: "Review Auditing", desc: "AI-powered detection to filter out fake or boosted reviews." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-blue-400 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-20">
             <div className="absolute inset-0 bg-gradient-to-l from-neutral-900 to-transparent z-10" />
             <img 
               src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=800&fit=crop" 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               alt="Professional support"
             />
          </div>
        </div>
      </section>
    </div>
  );
}
