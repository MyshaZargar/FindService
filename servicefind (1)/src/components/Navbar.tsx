import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, CheckCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:bg-blue-700 transition-colors">
                <Search size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">ServiceFind</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Find a service..."
                className="w-full bg-neutral-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-full py-1.5 pl-10 pr-4 text-sm transition-all"
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${(e.target as HTMLInputElement).value}`)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors">Browse</Link>
            <Link to="/verify" className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors">How we verify</Link>
            <Link to="/join" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Join as Provider
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-500 hover:text-neutral-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 py-4 px-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Find a service..."
              className="w-full bg-neutral-100 border-transparent rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?q=${(e.target as HTMLInputElement).value}`);
                  setIsOpen(false);
                }
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          </div>
          <Link to="/search" className="block text-base font-medium text-neutral-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Browse Services</Link>
          <Link to="/verify" className="block text-base font-medium text-neutral-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Verification Process</Link>
          <Link to="/join" className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-blue-700 text-center" onClick={() => setIsOpen(false)}>
            Join as Provider
          </Link>
        </div>
      )}
    </nav>
  );
}
