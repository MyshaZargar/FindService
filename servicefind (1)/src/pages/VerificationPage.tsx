import { CheckCircle, Shield, Award, Users, Search, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function VerificationPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-2 rounded-full font-bold text-sm mb-8"
          >
            <CheckCircle size={18} fill="currentColor" className="text-white border-green-600" />
            <span className="tracking-wider uppercase">VETTING PROCESS</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 mb-6 tracking-tight">How we verify our professionals.</h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Every professional on ServiceFind undergoes a multi-stage vetting process before they receive the "Verified" badge.
          </p>
        </div>

        <div className="space-y-12">
          {[
            {
              icon: <Shield className="text-blue-600" />,
              title: "Identity & Background Checks",
              desc: "We use biometrics and government ID verification to confirm the identity of every provider. For high-touch services like plumbing or childcare, we run comprehensive criminal background checks."
            },
            {
              icon: <Award className="text-orange-600" />,
              title: "License & Certification Audit",
              desc: "Our team manually reviews professional licenses, insurance certificates, and trade registrations. We contact issuing boards directly to ensure all credentials are current and valid."
            },
            {
              icon: <Search className="text-purple-600" />,
              title: "Social Proof & History",
              desc: "We analyze historical work, social presence, and external reviews. Our AI-driven algorithms flag suspicious patterns or fake reviews to ensure only genuine feedback remains."
            },
            {
              icon: <ClipboardCheck className="text-green-600" />,
              title: "Quality Standard Agreement",
              desc: "All providers must sign our Service Quality Agreement, committing to professional behavior, timely responses, and fair pricing models."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 p-10 rounded-[2rem] bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                 {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-neutral-900 rounded-[3rem] text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to find a pro?</h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto">Join thousands of happy customers who found their perfect service provider on ServiceFind.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/search" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center">Start Searching</Link>
               <Link to="/join" className="bg-white/10 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center">Join as Provider</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
