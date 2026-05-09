import { Link } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <span className="font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">ServiceFind</span>
            </div>
            <p className="text-neutral-500 max-w-xs mb-8">
              Find trusted professionals for any service, instantly. Vetted, verified, and ready to help.
            </p>
            <div className="flex gap-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-neutral-900 mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Browse Services</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">How it works</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Verification Process</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Safety</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Community</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Guide to Vetting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-blue-600 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
          <p>© 2024 ServiceFind. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
