import { useState, FormEvent } from 'react';
import { User, Briefcase, Building2, UserCircle, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

type AuthRole = 'customer' | 'provider' | null;
type ProviderType = 'individual' | 'company' | null;
type AuthStep = 'role' | 'type' | 'basic' | 'professional';

export default function AuthPage() {
  const [role, setRole] = useState<AuthRole>(null);
  const [providerType, setProviderType] = useState<ProviderType>(null);
  const [step, setStep] = useState<AuthStep>('role');
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [currentSpec, setCurrentSpec] = useState('');
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole: AuthRole) => {
    setRole(selectedRole);
    if (selectedRole === 'customer') {
      setStep('basic');
    } else {
      setStep('type');
    }
  };

  const handleTypeSelection = (type: ProviderType) => {
    setProviderType(type);
    setStep('basic');
  };

  const handleBasicSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (role === 'provider') {
      setStep('professional');
    } else {
      // Finalize customer signup
      navigate('/');
    }
  };

  const addSpecialization = () => {
    if (currentSpec && !specializations.includes(currentSpec)) {
      setSpecializations([...specializations, currentSpec]);
      setCurrentSpec('');
    }
  };

  const reset = () => {
    setRole(null);
    setProviderType(null);
    setStep('role');
    setSpecializations([]);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 pt-24 pb-32">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {step === 'role' && (
            /* Step 1: Choose Role */
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Welcome to ServiceFind</h1>
                <p className="text-neutral-500">How would you like to use the platform?</p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => handleRoleSelection('customer')}
                  className="group relative flex items-center gap-6 p-8 bg-white border-2 border-neutral-100 rounded-3xl hover:border-blue-600 hover:shadow-xl transition-all text-left"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <User size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">Join as a Customer</h3>
                    <p className="text-neutral-500 text-sm">I want to find and book verified professionals for services.</p>
                  </div>
                  <ArrowRight className="text-neutral-300 group-hover:text-blue-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleRoleSelection('provider')}
                  className="group relative flex items-center gap-6 p-8 bg-white border-2 border-neutral-100 rounded-3xl hover:border-blue-600 hover:shadow-xl transition-all text-left"
                >
                  <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Briefcase size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">Join as a Provider</h3>
                    <p className="text-neutral-500 text-sm">I want to offer my services and grow my business.</p>
                  </div>
                  <ArrowRight className="text-neutral-300 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
              
              <p className="text-center text-sm text-neutral-400">
                Already have an account? <Link to="#" className="text-blue-600 font-bold hover:underline">Log in</Link>
              </p>
            </motion.div>
          )}

          {step === 'type' && (
            /* Step 2: Choose Provider Type */
            <motion.div
              key="step2-provider"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setStep('role')}
                className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors mb-4"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">Service Provider Type</h2>
                <p className="text-neutral-500">Tell us about your business structure.</p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => handleTypeSelection('individual')}
                  className="group relative flex items-center gap-6 p-8 bg-white border-2 border-neutral-100 rounded-3xl hover:border-blue-600 hover:shadow-xl transition-all text-left"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <UserCircle size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">Individual / Freelancer</h3>
                    <p className="text-neutral-500 text-sm">I am a solo professional or independent contractor.</p>
                  </div>
                  <ArrowRight className="text-neutral-300 group-hover:text-blue-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleTypeSelection('company')}
                  className="group relative flex items-center gap-6 p-8 bg-white border-2 border-neutral-100 rounded-3xl hover:border-blue-600 hover:shadow-xl transition-all text-left"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Building2 size={32} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">Registered Company</h3>
                    <p className="text-neutral-500 text-sm">I represent a business with employees or multiple teams.</p>
                  </div>
                  <ArrowRight className="text-neutral-300 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'basic' && (
            /* Step 3: Basic Account Info */
            <motion.div
              key="basic-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-neutral-100"
            >
              <button 
                onClick={() => role === 'provider' ? setStep('type') : setStep('role')}
                className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors mb-8"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
                  <User size={40} />
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">Account Details</h2>
                <p className="text-neutral-500">
                  Step 1: Create your login credentials
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleBasicSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-2xl p-4 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-2xl p-4 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2 pb-4">
                  <label className="text-sm font-bold text-neutral-700 ml-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-2xl p-4 transition-all"
                    required
                  />
                </div>
                
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
                  {role === 'provider' ? 'Continue' : 'Complete Registration'}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'professional' && (
            /* Step 4: Professional Details (Provider Only) */
            <motion.div
              key="professional-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-neutral-100"
            >
              <button 
                onClick={() => setStep('basic')}
                className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors mb-8"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">Professional Info</h2>
                <p className="text-neutral-500">
                  Tell us about your expertise and credentials
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <div className="space-y-4">
                   <label className="text-sm font-bold text-neutral-700 ml-1">Specializations</label>
                   <div className="flex gap-2">
                     <input 
                        type="text" 
                        value={currentSpec}
                        onChange={(e) => setCurrentSpec(e.target.value)}
                        placeholder="e.g. Traditional Embroidery" 
                        className="flex-grow bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-2xl p-4 transition-all"
                      />
                      <button 
                        type="button"
                        onClick={addSpecialization}
                        className="bg-neutral-900 text-white px-6 rounded-2xl font-bold hover:bg-neutral-800 transition-colors"
                      >
                        Add
                      </button>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {specializations.map(spec => (
                        <span key={spec} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                          {spec}
                          <button onClick={() => setSpecializations(specializations.filter(s => s !== spec))} className="hover:text-blue-900">×</button>
                        </span>
                      ))}
                      {specializations.length === 0 && <p className="text-xs text-neutral-400 italic px-2">Add at least one specialization</p>}
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 ml-1">Certifications</label>
                  <textarea 
                    placeholder="List your professional certifications..." 
                    className="w-full bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-2xl p-4 transition-all h-24"
                  />
                </div>

                {providerType === 'company' && (
                  <div className="space-y-2 translate-y-0 opacity-100 transition-all">
                    <label className="text-sm font-bold text-neutral-700 ml-1">Business Registration / Licenses</label>
                    <input 
                      type="text" 
                      placeholder="GST / Registration Number" 
                      className="w-full bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 rounded-2xl p-4 transition-all"
                      required
                    />
                    <p className="text-[10px] text-neutral-400 ml-2">As a registered company, this is required for the Verified badge.</p>
                  </div>
                )}
                
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
                  Finish Setup
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
