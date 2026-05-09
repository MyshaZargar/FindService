import { Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Provider } from '../data/providers';
import { motion } from 'motion/react';

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all h-full flex flex-col group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={provider.image} 
          alt={provider.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {provider.verified && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <CheckCircle size={14} className="text-green-600 border-none" fill="currentColor" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800">Verified</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex gap-2">
           {provider.tags.slice(0, 2).map(tag => (
             <span key={tag} className="bg-neutral-900/40 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
               {tag}
             </span>
           ))}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-neutral-900 leading-tight mb-1">{provider.name}</h3>
            <p className="text-sm font-medium text-blue-600">{provider.category}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-xs font-bold text-neutral-700">{provider.rating}</span>
            <span className="text-[10px] text-neutral-400 font-medium">({provider.reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-grow italic">
          "{provider.tagline}"
        </p>

        <div className="flex items-center gap-2 text-neutral-400 mb-6">
          <MapPin size={14} />
          <span className="text-xs font-medium">{provider.location}</span>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">Rates from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-neutral-900">₹{provider.price}</span>
              <span className="text-xs text-neutral-400 font-medium">/{provider.priceUnit}</span>
            </div>
          </div>
          <Link 
            to={`/provider/${provider.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
