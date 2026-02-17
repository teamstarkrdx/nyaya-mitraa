import React from 'react';
import { Mic, FileSearch, Clock } from 'lucide-react';

export const FutureRoadmap: React.FC<{ isLightMode?: boolean }> = ({ isLightMode }) => {
  return (
    <section id="roadmap" className={`py-32 relative border-t ${isLightMode ? 'bg-white border-steelblue-200' : 'bg-steelblue-950 border-steelblue-800'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-6 ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>
            The Future of <span className="text-transparent bg-clip-text bg-gold-gradient">Legal Tech</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-xl font-sans font-light ${isLightMode ? 'text-steelblue-600' : 'text-steelblue-200'}`}>
            We are building groundbreaking features to make justice accessible to every Indian, regardless of literacy or language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className={`relative group border rounded-[2rem] p-12 overflow-hidden transition-all duration-500 ${
             isLightMode 
               ? 'bg-steelblue-50 border-steelblue-200 hover:border-champagne-400 hover:shadow-2xl' 
               : 'bg-steelblue-900 border-steelblue-800 hover:border-champagne-500/50 hover:shadow-2xl hover:shadow-champagne-500/10'
          }`}>
            <div className="absolute top-8 right-8 px-4 py-2 rounded-full border border-champagne-500/30 text-champagne-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-3 w-3" /> Coming Soon
            </div>
            
            <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-10 shadow-xl ${
               isLightMode ? 'bg-white text-steelblue-700' : 'bg-steelblue-800 text-champagne-400'
            }`}>
              <Mic className="h-8 w-8" />
            </div>

            <h3 className={`text-3xl font-heading font-bold mb-4 ${
               isLightMode ? 'text-steelblue-900' : 'text-white'
            }`}>
              "Aaji Mode" (Voice-First)
            </h3>
            <p className={`leading-relaxed mb-8 text-lg font-sans ${isLightMode ? 'text-steelblue-600' : 'text-steelblue-300'}`}>
              A voice-only interface designed for rural India. Speak in dialects like Bhojpuri or rural Tamil, and receive advice from a calm, grandmotherly AI persona ("Aaji") who explains laws using stories instead of jargon.
            </p>
          </div>

          <div className={`relative group border rounded-[2rem] p-12 overflow-hidden transition-all duration-500 ${
             isLightMode 
               ? 'bg-steelblue-50 border-steelblue-200 hover:border-red-400 hover:shadow-2xl' 
               : 'bg-steelblue-900 border-steelblue-800 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10'
          }`}>
             <div className="absolute top-8 right-8 px-4 py-2 rounded-full border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-3 w-3" /> Coming Soon
            </div>

            <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-10 shadow-xl ${
               isLightMode ? 'bg-white text-red-600' : 'bg-steelblue-800 text-red-500'
            }`}>
              <FileSearch className="h-8 w-8" />
            </div>

            <h3 className={`text-3xl font-heading font-bold mb-4 ${
               isLightMode ? 'text-steelblue-900' : 'text-white'
            }`}>
              The "Fine Print Predator"
            </h3>
            <p className={`leading-relaxed mb-8 text-lg font-sans ${isLightMode ? 'text-steelblue-600' : 'text-steelblue-300'}`}>
              Upload a 50-page loan agreement or rental deed. Our AI "Predator" scans for hidden scams, unfair clauses, and red flags instantly, highlighting exactly where they are trying to trick you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};