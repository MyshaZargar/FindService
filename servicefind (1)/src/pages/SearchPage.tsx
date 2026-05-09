import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROVIDERS, CATEGORIES, Provider } from '../data/providers';
import ProviderCard from '../components/ProviderCard';
import { SlidersHorizontal, Search, X, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  
  const [activeCategory, setActiveCategory] = useState<string>(q || 'All');
  const [typeFilter, setTypeFilter] = useState<'all' | 'individual' | 'company'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price-low' | 'price-high'>('relevance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (q) setActiveCategory(q);
  }, [q]);

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter(p => {
      const matchesCategory = activeCategory === 'All' || 
        p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()));
      
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      const matchesVerified = !verifiedOnly || p.verified;
      
      return matchesCategory && matchesType && matchesVerified;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // relevance is default order for now
    });
  }, [activeCategory, typeFilter, verifiedOnly, sortBy]);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Find your professional</h1>
            <p className="text-neutral-500 font-medium">
              {filteredProviders.length} providers available in {activeCategory === 'All' ? 'all categories' : activeCategory}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              className="bg-white border border-neutral-200 text-sm font-semibold text-neutral-700 py-2 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="relevance">By Relevance</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2 rounded-xl text-sm font-semibold text-neutral-700"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar / Filters (Desktop) */}
          <aside className="hidden md:block w-64 space-y-10 flex-shrink-0">
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Categories</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveCategory('All')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeCategory === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-neutral-600 hover:bg-white hover:text-neutral-900'}`}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-neutral-600 hover:bg-white hover:text-neutral-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-200">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Provider Type</h4>
              <div className="grid grid-cols-1 gap-2">
                {['all', 'individual', 'company'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setTypeFilter(type as any)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${typeFilter === type ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-white hover:text-neutral-900'}`}
                  >
                    {type}s
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-200">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Verification</h4>
              <label className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-neutral-200 cursor-pointer hover:border-blue-300 transition-colors">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-neutral-300"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                />
                <span className="text-sm font-semibold text-neutral-700">Verified Only</span>
              </label>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-grow">
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProviders.map(provider => (
                    <div key={provider.id}>
                      <ProviderCard provider={provider} />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-neutral-200">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-8 text-neutral-400">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">No results found</h3>
                <p className="text-neutral-500 mb-8 max-w-sm mx-auto">We couldn't find any providers matching your current filters. Try adjusting your search term or category.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('All');
                    setTypeFilter('all');
                    setVerifiedOnly(false);
                  }}
                  className="bg-neutral-900 text-white px-8 py-3 rounded-full font-bold hover:bg-neutral-800 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] bg-neutral-900/60 backdrop-blur-sm md:hidden">
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-white p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-neutral-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            {/* Same content as desktop aside, just adapted for mobile overlay */}
            <div className="space-y-12">
               <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...CATEGORIES].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => {setActiveCategory(cat); setIsSidebarOpen(false);}}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
               </div>
               
               <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Provider Type</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['all', 'individual', 'company'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setTypeFilter(type as any)}
                        className={`text-center py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${typeFilter === type ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                 <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Verification</h4>
                 <button 
                   onClick={() => setVerifiedOnly(!verifiedOnly)}
                   className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border-2 transition-all ${verifiedOnly ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-neutral-100 text-neutral-400'}`}
                 >
                   <CheckCircle size={20} fill={verifiedOnly ? "currentColor" : "none"} />
                   Verified Only
                 </button>
               </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-full mt-12 bg-blue-600 text-white py-4 rounded-2xl font-bold"
            >
              Show Results
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
