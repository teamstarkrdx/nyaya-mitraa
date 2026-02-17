import React from 'react';
import { Phone, ExternalLink, AlertOctagon, Scale } from 'lucide-react';

export const Footer: React.FC<{ isLightMode?: boolean }> = ({ isLightMode }) => {
  return (
    <footer className={`pt-24 pb-12 transition-colors duration-500 ${
      isLightMode ? 'bg-steelblue-50 border-t border-steelblue-200' : 'bg-steelblue-950 border-t border-steelblue-800'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
               <Scale className={`h-8 w-8 ${isLightMode ? 'text-steelblue-800' : 'text-champagne-500'}`} />
               <h3 className={`text-3xl font-display font-bold ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>Nyaya Mitra</h3>
            </div>
            <p className={`text-lg font-sans font-light leading-relaxed max-w-md ${isLightMode ? 'text-steelblue-700' : 'text-steelblue-300'}`}>
              Simplifying Indian law through Artificial Intelligence. Empowering citizens with knowledge and instant guidance.
            </p>
            <div className={`text-xs font-heading font-bold uppercase tracking-widest ${isLightMode ? 'text-steelblue-500' : 'text-steelblue-600'}`}>
              &copy; {new Date().getFullYear()} Nyaya Mitra. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
             <h4 className={`font-heading font-bold mb-8 uppercase tracking-widest text-sm ${isLightMode ? 'text-steelblue-900' : 'text-champagne-400'}`}>Platform</h4>
             <ul className={`space-y-4 text-base font-sans ${isLightMode ? 'text-steelblue-600' : 'text-steelblue-300'}`}>
               <li><a href="#" className="hover:text-champagne-500 transition-colors flex items-center gap-2"><span className="h-px w-4 bg-champagne-500"></span> Home</a></li>
               <li><a href="#features" className="hover:text-champagne-500 transition-colors flex items-center gap-2"><span className="h-px w-4 bg-champagne-500"></span> Legal Topics</a></li>
               <li><a href="#verify" className="hover:text-champagne-500 transition-colors flex items-center gap-2"><span className="h-px w-4 bg-champagne-500"></span> Document Check</a></li>
               <li><a href="#" className="hover:text-champagne-500 transition-colors flex items-center gap-2"><span className="h-px w-4 bg-champagne-500"></span> About Us</a></li>
             </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className={`font-heading font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2 ${isLightMode ? 'text-red-600' : 'text-red-400'}`}>
               <AlertOctagon className="h-4 w-4" /> Emergency Contacts (India)
            </h4>
            <div className="space-y-4">
              <a href="tel:112" className="block w-full bg-red-600 hover:bg-red-500 text-white rounded-xl p-4 shadow-lg shadow-red-600/20 transition-transform hover:-translate-y-1">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Panic Button</span>
                    <Phone className="h-5 w-5" />
                 </div>
                 <div className="text-3xl font-display font-bold mt-1">112</div>
              </a>
              
              <div className="grid grid-cols-2 gap-4">
                 <a href="tel:100" className={`p-4 rounded-xl text-center border transition-colors ${
                    isLightMode ? 'bg-white border-steelblue-200 hover:border-steelblue-400' : 'bg-steelblue-900 border-steelblue-700 hover:border-champagne-500'
                 }`}>
                    <div className="text-xs font-bold uppercase opacity-60 mb-1">Police</div>
                    <div className="text-xl font-display font-bold">100</div>
                 </a>
                 <a href="tel:1091" className={`p-4 rounded-xl text-center border transition-colors ${
                    isLightMode ? 'bg-white border-steelblue-200 hover:border-steelblue-400' : 'bg-steelblue-900 border-steelblue-700 hover:border-champagne-500'
                 }`}>
                    <div className="text-xs font-bold uppercase opacity-60 mb-1">Women</div>
                    <div className="text-xl font-display font-bold">1091</div>
                 </a>
              </div>
            </div>
            <p className="text-[10px] text-steelblue-500 mt-4 font-medium opacity-80">
               *Tap buttons to dial immediately.
            </p>
          </div>
        </div>
        
        <div className={`border-t pt-10 text-center ${isLightMode ? 'border-steelblue-200' : 'border-steelblue-800'}`}>
          <p className="text-sm opacity-60 max-w-4xl mx-auto leading-relaxed font-sans">
            Disclaimer: Nyaya Mitra is an automated information service. We are not a law firm and do not provide legal representation or advice. 
            The information provided is for educational purposes only. Please consult a qualified advocate for your specific legal needs.
          </p>
        </div>
      </div>
    </footer>
  );
};