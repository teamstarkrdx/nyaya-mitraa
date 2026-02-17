import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TypingText } from './components/TypingText';
import { FeaturesSection } from './components/FeaturesSection';
import { DocumentVerification } from './components/DocumentVerification';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';
import { HeroComparison } from './components/HeroComparison';
import { ShimmerButton } from './components/ShimmerButton';
import { LegalAidDirectory } from './components/LegalAidDirectory';
import { FutureRoadmap } from './components/FutureRoadmap';
import { ShieldCheck, MessageCircle, FileText, Sparkles, Scale, BookOpen } from 'lucide-react';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  const triggerChat = () => {
     window.dispatchEvent(new CustomEvent('open-chat-widget'));
  };

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${
      isLightMode ? 'bg-champagne-100 text-steelblue-900' : 'bg-steelblue-900 text-champagne-100'
    }`}>
      <Navbar isLightMode={isLightMode} toggleTheme={toggleTheme} />
      
      {/* Hero Section */}
      <main className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className={`absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 animate-float-slow ${
              isLightMode ? 'bg-steelblue-300' : 'bg-steelblue-600'
           }`}></div>
           <div className={`absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-20 animate-float-medium ${
              isLightMode ? 'bg-champagne-400' : 'bg-champagne-500'
           }`}></div>
           <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full blur-[100px] bg-lightblue-400/20 animate-pulse-glow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left space-y-8 animate-slide-up">
              <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border backdrop-blur-md shadow-2xl transition-all hover:scale-105 ${
                isLightMode 
                  ? 'bg-white/80 border-champagne-400 text-steelblue-800' 
                  : 'bg-steelblue-800/50 border-steelblue-500/30 text-champagne-300'
              }`}>
                <Scale className="w-4 h-4 text-champagne-500" />
                <span className="text-sm font-bold tracking-widest uppercase font-heading">India's First AI Legal Assistant</span>
              </div>
              
              <h1 className={`text-6xl lg:text-8xl font-display font-medium leading-[1.05] tracking-tight ${
                 isLightMode ? 'text-steelblue-900' : 'text-white'
              }`}>
                Understand your <br />
                <span className="text-transparent bg-clip-text bg-gold-gradient italic">legal rights</span>
              </h1>
              
              <div className={`text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 flex flex-col justify-center lg:justify-start ${
                 isLightMode ? 'text-steelblue-600' : 'text-steelblue-200'
              }`}>
                 <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                    <TypingText />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                <ShimmerButton 
                  label="Start Free Legal Chat" 
                  onClick={triggerChat} 
                />
                
                <a href="#how-it-works" className={`px-8 py-4 rounded-full font-bold tracking-wide transition-all border flex items-center gap-3 hover:gap-4 ${
                   isLightMode 
                    ? 'border-steelblue-200 text-steelblue-700 hover:bg-steelblue-50' 
                    : 'border-white/10 text-champagne-100 hover:bg-white/5'
                }`}>
                  <BookOpen className="w-5 h-5" />
                  How it works
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 w-full max-w-xl lg:max-w-none perspective-1000 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                 <HeroComparison isLightMode={isLightMode} />
            </div>
          </div>
        </div>
      </main>

      {/* Sections with Scroll Margin Top for Fixed Navbar */}
      <div className="scroll-mt-28" id="features">
         <FeaturesSection isLightMode={isLightMode} />
      </div>

      {/* How it works - Redesigned */}
      <section id="how-it-works" className={`py-40 relative scroll-mt-28 ${isLightMode ? 'bg-white' : 'bg-steelblue-950'}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-champagne-500/30 text-champagne-500 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="h-3 w-3" />
                <span>Simple Process</span>
             </div>
             <h2 className={`text-5xl md:text-6xl font-heading font-bold ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>
               How Nyaya Mitra works
             </h2>
             <p className={`max-w-2xl mx-auto text-xl font-light ${isLightMode ? 'text-steelblue-600' : 'text-steelblue-200'}`}>
                Complex legal problems, simplified into three easy steps. No sign-up required for basic queries.
             </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: MessageCircle, title: "1. Describe your issue", desc: "Tell us what happened in plain language. Hindi, English, or your local language." },
              { icon: ShieldCheck, title: "2. Get Instant Guidance", desc: "Our AI analyzes relevant Indian laws (IPC, CrPC) and explains your rights simply." },
              { icon: FileText, title: "3. Take Action", desc: "Draft a complaint, verify a document, or prepare questions for a lawyer." }
            ].map((step, i) => (
              <div key={i} className={`group relative p-12 rounded-[2rem] transition-all duration-500 hover:-translate-y-4 border ${
                 isLightMode 
                   ? 'bg-champagne-100 border-champagne-200 hover:shadow-2xl hover:shadow-steelblue-200/50' 
                   : 'bg-steelblue-900 border-steelblue-700 hover:bg-steelblue-800 hover:border-champagne-500/30 hover:shadow-2xl hover:shadow-champagne-500/10'
              }`}>
                <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:rotate-6 shadow-lg ${
                   isLightMode ? 'bg-white text-steelblue-600' : 'bg-steelblue-800 text-champagne-400'
                }`}>
                  <step.icon className="h-8 w-8" />
                </div>
                
                <h3 className={`text-2xl font-heading font-bold mb-6 ${
                   isLightMode ? 'text-steelblue-900' : 'text-champagne-100'
                }`}>{step.title}</h3>
                
                <p className={`text-lg font-sans leading-relaxed ${
                   isLightMode ? 'text-steelblue-600' : 'text-steelblue-200'
                }`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="scroll-mt-28" id="verify">
          <DocumentVerification isLightMode={isLightMode} />
      </div>
      <div className="scroll-mt-28" id="legal-aid">
          <LegalAidDirectory isLightMode={isLightMode} />
      </div>
      <div className="scroll-mt-28" id="roadmap">
          <FutureRoadmap isLightMode={isLightMode} />
      </div>
      
      <Footer isLightMode={isLightMode} />
      <ChatWidget isLightMode={isLightMode} />
    </div>
  );
}

export default App;