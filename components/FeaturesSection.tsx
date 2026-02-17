import React, { useRef, useState } from 'react';
import { Home, Users, Briefcase, Lock, Gavel, FileText, Shield, Globe, ArrowRight } from 'lucide-react';
import { LegalTopic } from '../types';

const topics: LegalTopic[] = [
  { id: '1', title: 'Rent & Tenancy', icon: 'home', description: 'Disputes with landlords, agreements, and eviction rules.' },
  { id: '2', title: 'Family & Divorce', icon: 'users', description: 'Marriage registration, divorce, custody, and domestic violence.' },
  { id: '3', title: 'Employment', icon: 'briefcase', description: 'Unpaid salary, harassment, and wrongful termination.' },
  { id: '4', title: 'Cyber Crime', icon: 'lock', description: 'Online fraud, data theft, and social media harassment.' },
  { id: '5', title: 'Consumer Rights', icon: 'gavel', description: 'Defective products, service issues, and compensation.' },
  { id: '6', title: 'Property Disputes', icon: 'filetext', description: 'Land ownership, inheritance, and illegal possession.' },
  { id: '7', title: 'Police & FIR', icon: 'shield', description: 'How to file an FIR, police harassment, and bail.' },
  { id: '8', title: 'Immigration', icon: 'globe', description: 'Visa issues, passport delays, and OCI questions.' },
];

const iconMap: Record<string, any> = {
  home: Home,
  users: Users,
  briefcase: Briefcase,
  lock: Lock,
  gavel: Gavel,
  filetext: FileText,
  shield: Shield,
  globe: Globe,
};

const SpotlightCard: React.FC<{ topic: LegalTopic; isLightMode?: boolean }> = ({ topic, isLightMode }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCardClick = () => {
    const event = new CustomEvent('open-chat-widget', { detail: { topic: topic.title } });
    window.dispatchEvent(event);
  };

  const Icon = iconMap[topic.icon];

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      className={`relative group h-full rounded-[2rem] border overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
        isLightMode 
          ? 'bg-white border-champagne-200 hover:border-champagne-400 hover:shadow-2xl hover:shadow-champagne-200/50' 
          : 'bg-steelblue-900/40 backdrop-blur-md border-steelblue-700 hover:border-champagne-500/50 hover:shadow-2xl hover:shadow-champagne-500/10'
      }`}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isLightMode ? 'rgba(212, 175, 55, 0.15)' : 'rgba(70, 130, 180, 0.15)'}, transparent 40%)`,
        }}
      />
      
      <div className="relative p-10 h-full flex flex-col z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-12 ${
           isLightMode 
             ? 'bg-champagne-100 text-steelblue-600 group-hover:bg-champagne-500 group-hover:text-white' 
             : 'bg-steelblue-800 text-champagne-300 group-hover:bg-champagne-500 group-hover:text-steelblue-900'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        
        {/* Changed to Plus Jakarta Sans (font-heading) */}
        <h3 className={`text-2xl font-heading font-bold mb-4 tracking-tight ${
           isLightMode ? 'text-steelblue-900' : 'text-champagne-100'
        }`}>
            {topic.title}
        </h3>
        
        {/* Changed to Inter (font-sans) */}
        <p className={`text-base font-sans leading-relaxed flex-1 ${
          isLightMode ? 'text-steelblue-600' : 'text-steelblue-300'
        }`}>
          {topic.description}
        </p>

        <div className={`mt-8 flex items-center text-sm font-heading font-bold uppercase tracking-widest transition-all duration-300 ${
           isLightMode ? 'text-champagne-600 group-hover:text-champagne-800' : 'text-champagne-400 group-hover:text-champagne-200'
        }`}>
           Consult AI <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection: React.FC<{ isLightMode?: boolean }> = ({ isLightMode }) => {
  return (
    <section id="features" className={`py-32 relative overflow-hidden ${isLightMode ? 'bg-champagne-50' : 'bg-steelblue-950'}`}>
      
      {/* Background Shapes */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none ${
         isLightMode ? 'bg-lightblue-300' : 'bg-steelblue-600'
      }`}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-champagne-500/30 text-champagne-500 text-xs font-bold uppercase tracking-wider mb-6">
              <Shield className="h-3 w-3" />
              <span>Expert Legal Areas</span>
            </div>
            <h2 className={`text-5xl md:text-6xl font-heading font-bold mb-6 ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>
              Common Legal Problems
              <span className="block text-champagne-500 mt-2">
                Simplified for You
              </span>
            </h2>
            <p className={`text-xl font-sans font-light ${isLightMode ? 'text-steelblue-600' : 'text-steelblue-200'}`}>
              Select a topic below to see how our AI can guide you through the complexities of the Indian legal system.
            </p>
          </div>
          
          <div className={`hidden md:block h-[1px] flex-1 ml-16 mb-10 bg-gradient-to-r ${isLightMode ? 'from-steelblue-200 to-transparent' : 'from-steelblue-700 to-transparent'}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic) => (
            <SpotlightCard key={topic.id} topic={topic} isLightMode={isLightMode} />
          ))}
        </div>
      </div>
    </section>
  );
};